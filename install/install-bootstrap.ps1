[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$DevBrainRoot,
    [ValidateSet('Codex', 'Claude', 'Both')][string]$Tool = 'Both',
    [string]$UserHome = $HOME,
    [string]$CodexHome,
    [string]$CodexSkillsPath,
    [switch]$SkipSkills
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
if (-not $DevBrainRoot) { $DevBrainRoot = Split-Path -Parent $PSScriptRoot }
$resolvedRoot = (Resolve-Path -LiteralPath $DevBrainRoot).Path
$resolvedHome = [IO.Path]::GetFullPath($UserHome)
if (-not $CodexHome) {
    $CodexHome = if (-not $PSBoundParameters.ContainsKey('UserHome') -and $env:CODEX_HOME) {
        $env:CODEX_HOME
    } else { Join-Path $resolvedHome '.codex' }
}
$CodexHome = [IO.Path]::GetFullPath($CodexHome)
$claudeHome = Join-Path $resolvedHome '.claude'
$names = @('enterprise-ui-ux', 'marketing-portfolio-ui-ux', 'design-system-architect', 'architecture-refactor')
$markerStart = '<!-- DEVBRAIN-BOOTSTRAP:START -->'
$markerEnd = '<!-- DEVBRAIN-BOOTSTRAP:END -->'
$runId = (Get-Date -Format 'yyyyMMdd-HHmmss-fff') + '-' + [guid]::NewGuid().ToString('N').Substring(0,8)
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Assert-NoReparse([string]$Path, [switch]$Tree) {
    $cursor = [IO.Path]::GetFullPath($Path)
    while ($cursor) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Refusing linked path: $cursor" }
        }
        $parent = Split-Path -Parent $cursor
        if ($parent -eq $cursor) { break }
        $cursor = $parent
    }
    if ($Tree -and (Test-Path -LiteralPath $Path)) {
        foreach ($item in Get-ChildItem -LiteralPath $Path -Force -Recurse) {
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Refusing linked content: $($item.FullName)" }
        }
    }
}
function Assert-Within([string]$Path, [string]$Boundary) {
    $absolute = [IO.Path]::GetFullPath($Path)
    $prefix = [IO.Path]::GetFullPath($Boundary).TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar
    if (-not $absolute.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw "Path is outside intended boundary: $absolute" }
}
function Get-TreeSignature([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) { return '' }
    $prefix = [IO.Path]::GetFullPath($Path).TrimEnd('\','/').Length + 1
    $rows = @(Get-ChildItem -LiteralPath $Path -File -Recurse -Force | Sort-Object FullName | ForEach-Object {
        $_.FullName.Substring($prefix).Replace('\','/') + ':' + (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
    })
    return $rows -join "`n"
}
function Get-LoaderPlan([string]$Kind, [string]$Path, [string]$Template) {
    Assert-NoReparse $Path
    if ((Test-Path -LiteralPath $Path) -and -not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "Loader is not a file: $Path" }
    $existing = if (Test-Path -LiteralPath $Path) { [IO.File]::ReadAllText($Path) } else { '' }
    $starts = [regex]::Matches($existing, [regex]::Escape($markerStart))
    $ends = [regex]::Matches($existing, [regex]::Escape($markerEnd))
    if ($starts.Count -ne $ends.Count -or $starts.Count -gt 1) { throw "Malformed or duplicate DevBrain markers: $Path" }
    $block = [IO.File]::ReadAllText((Join-Path $resolvedRoot $Template)).Replace('<DEVBRAIN_ROOT>', $resolvedRoot.Replace('\','/')).TrimEnd("`r","`n")
    if ([regex]::Matches($block,[regex]::Escape($markerStart)).Count -ne 1 -or [regex]::Matches($block,[regex]::Escape($markerEnd)).Count -ne 1) { throw "Invalid bootstrap template: $Template" }
    if ($starts.Count -eq 1) {
        if ($ends[0].Index -lt $starts[0].Index) { throw "Reversed DevBrain markers: $Path" }
        $next = $existing.Substring(0,$starts[0].Index) + $block + $existing.Substring($ends[0].Index + $markerEnd.Length)
    } else {
        $separator = if ($existing.Length -eq 0) { '' } elseif ($existing.EndsWith("`n")) { "`n" } else { "`n`n" }
        $next = $existing + $separator + $block + "`n"
    }
    return [pscustomobject]@{ Kind=$Kind; Path=$Path; Existing=$existing; Next=$next }
}

# Complete preflight before any writes, including WhatIf.
Assert-NoReparse $resolvedRoot
foreach ($required in @('runtime/session-baseline.md','runtime/task-map.md',
    'adapters/codex/AGENTS.global.template.md','adapters/claude-code/CLAUDE.global.template.md')) {
    if (-not (Test-Path -LiteralPath (Join-Path $resolvedRoot $required) -PathType Leaf)) { throw "Missing source: $required" }
}
$loaderPlans = @()
$skillPlans = @()
if ($Tool -in @('Codex','Both')) { $loaderPlans += Get-LoaderPlan 'Codex' (Join-Path $CodexHome 'AGENTS.md') 'adapters/codex/AGENTS.global.template.md' }
if ($Tool -in @('Claude','Both')) { $loaderPlans += Get-LoaderPlan 'Claude' (Join-Path $claudeHome 'CLAUDE.md') 'adapters/claude-code/CLAUDE.global.template.md' }
if (-not $SkipSkills) {
    if (-not $CodexSkillsPath) {
        $legacy = Join-Path $CodexHome 'skills'
        $hasLegacy = @($names | Where-Object { Test-Path -LiteralPath (Join-Path $legacy $_) }).Count -gt 0
        # Preserve existing legacy discovery location; new installations use the documented user location.
        $CodexSkillsPath = if ($hasLegacy) { $legacy } else { Join-Path $resolvedHome '.agents/skills' }
    }
    $CodexSkillsPath = [IO.Path]::GetFullPath($CodexSkillsPath)
    foreach ($kind in @('Codex','Claude')) {
        if ($Tool -notin @($kind,'Both')) { continue }
        $targetRoot = if ($kind -eq 'Codex') { $CodexSkillsPath } else { Join-Path $claudeHome 'skills' }
        $configRoot = if ($kind -eq 'Codex') { $CodexHome } else { $claudeHome }
        $backupRoot = Join-Path $configRoot 'devbrain-backups'
        Assert-NoReparse $targetRoot
        Assert-NoReparse $backupRoot
        foreach ($name in $names) {
            $source = Join-Path $resolvedRoot "skills/$name"
            $destination = Join-Path $targetRoot $name
            Assert-Within $destination $targetRoot
            Assert-NoReparse $source -Tree
            Assert-NoReparse $destination -Tree
            if (-not (Test-Path -LiteralPath (Join-Path $source 'SKILL.md') -PathType Leaf)) { throw "Missing skill: $name" }
            if ((Test-Path -LiteralPath $destination) -and -not (Test-Path -LiteralPath $destination -PathType Container)) { throw "Skill target is not a directory: $destination" }
            $sourceBoundary = (Join-Path $resolvedRoot 'skills').TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar
            if ($destination.StartsWith($sourceBoundary,[StringComparison]::OrdinalIgnoreCase)) { throw 'Cannot install over canonical source skills.' }
            $skillPlans += [pscustomobject]@{Kind=$kind;Name=$name;Source=$source;Path=$destination;Boundary=$targetRoot;BackupRoot=$backupRoot;Signature=(Get-TreeSignature $source)}
        }
    }
}
Write-Host "DevBrain v2 source: $resolvedRoot"
foreach ($plan in $loaderPlans) {
    if ($plan.Existing -ceq $plan.Next) { Write-Host "$($plan.Kind) loader unchanged."; continue }
    if ($PSCmdlet.ShouldProcess($plan.Path, 'Back up loader and replace only the DevBrain managed block')) {
        New-Item -ItemType Directory -Path (Split-Path -Parent $plan.Path) -Force | Out-Null
        if (Test-Path -LiteralPath $plan.Path) { Copy-Item -LiteralPath $plan.Path -Destination "$($plan.Path).bak.$runId" }
        [IO.File]::WriteAllText($plan.Path, $plan.Next, $utf8)
        Write-Host "$($plan.Kind) loader updated: $($plan.Path)"
    }
}
foreach ($plan in $skillPlans) {
    if ((Get-TreeSignature $plan.Path) -ceq $plan.Signature) { Write-Host "$($plan.Kind) skill unchanged: $($plan.Name)"; continue }
    if ($PSCmdlet.ShouldProcess($plan.Path, 'Install exact source skill; preserve previous directory in devbrain-backups')) {
        $runRoot = Join-Path $plan.BackupRoot $runId
        $stage = Join-Path $runRoot ("staged-" + $plan.Name)
        $backup = Join-Path $runRoot $plan.Name
        Assert-Within $stage $plan.BackupRoot
        Assert-Within $backup $plan.BackupRoot
        Assert-Within $plan.Path $plan.Boundary
        Assert-NoReparse $plan.Path -Tree
        New-Item -ItemType Directory -Path $runRoot -Force | Out-Null
        Copy-Item -LiteralPath $plan.Source -Destination $stage -Recurse
        if ((Get-TreeSignature $stage) -cne $plan.Signature) { throw "Staged skill verification failed: $($plan.Name)" }
        New-Item -ItemType Directory -Path $plan.Boundary -Force | Out-Null
        $backedUp = $false
        if (Test-Path -LiteralPath $plan.Path) {
            Move-Item -LiteralPath $plan.Path -Destination $backup
            $backedUp = $true
            Write-Host "Previous skill preserved: $backup"
        }
        try { Move-Item -LiteralPath $stage -Destination $plan.Path }
        catch {
            if ($backedUp -and -not (Test-Path -LiteralPath $plan.Path)) {
                Assert-Within $backup $plan.BackupRoot
                Assert-Within $plan.Path $plan.Boundary
                Move-Item -LiteralPath $backup -Destination $plan.Path
            }
            throw
        }
        Write-Host "$($plan.Kind) skill installed: $($plan.Path)"
    }
}
if ($WhatIfPreference) { Write-Host 'Preview complete; no files or directories written.' }
else { Write-Host 'Requested installation operations processed. No Git, registry, admin, or unrelated configuration operations were run.' }
