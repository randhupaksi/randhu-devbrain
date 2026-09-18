[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$DevBrainRoot = (Split-Path -Parent $PSScriptRoot),
    [ValidateSet('Codex', 'Claude', 'Both')]
    [string]$Tool = 'Both',
    [switch]$SkipSkills
)

$ErrorActionPreference = 'Stop'
$resolvedRoot = (Resolve-Path -LiteralPath $DevBrainRoot).Path
$claudeRoot = $resolvedRoot -replace '\\', '/'
$markerStart = '<!-- DEVBRAIN-BOOTSTRAP:START -->'
$markerEnd = '<!-- DEVBRAIN-BOOTSTRAP:END -->'
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function New-LoaderContent([string]$kind) {
    if ($kind -eq 'Codex') {
        return @"
$markerStart
# Randhu DevBrain bootstrap (managed block)
# Source: $resolvedRoot
# Keep this block small. The runtime is loaded once per coding session.

At the start of each new coding session, read the complete DevBrain runtime once:
$resolvedRoot\runtime\full-context.md

Also read the active repository's AGENTS.md files. Do not reread the runtime on every turn unless DevBrain is updated, context is materially compacted, the repository changes, or the user explicitly requests a reload.

DevBrain skills are optional, task-specific modules. Do not scan or load the complete DevBrain skills directory at session start. Load only a relevant skill when the task matches its description or the user explicitly invokes it, then read only the references needed for that task.

The active user prompt overrides DevBrain preferences; platform and system safety rules remain highest.
$markerEnd
"@
    }

    return @"
$markerStart
# Randhu DevBrain bootstrap (managed block)
# Source: $resolvedRoot
# Keep this block small. The runtime is loaded once per coding session.

@${claudeRoot}/runtime/full-context.md

At the start of each new coding session, also read the active repository's CLAUDE.md/AGENTS.md instructions. Do not reread the runtime on every turn unless DevBrain is updated, context is materially compacted, the repository changes, or the user explicitly requests a reload.

DevBrain skills are optional, task-specific modules. Do not scan or load the complete DevBrain skills directory at session start. Load only a relevant skill when the task matches its description or the user explicitly invokes it, then read only the references needed for that task.

The active user prompt overrides DevBrain preferences; platform and system safety rules remain highest.
$markerEnd
"@
}

function Install-Loader {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [string]$kind,
        [string]$path
    )
    $parent = Split-Path -Parent $path
    if (-not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    $existing = if (Test-Path -LiteralPath $path) { Get-Content -Raw -LiteralPath $path } else { '' }
    $block = New-LoaderContent $kind
    $pattern = '(?s)<!-- DEVBRAIN-BOOTSTRAP:START -->.*?<!-- DEVBRAIN-BOOTSTRAP:END -->'
    $next = if ($existing -match $pattern) { [regex]::Replace($existing, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $block.Trim() }) } else {
        (($existing.TrimEnd() + "`r`n`r`n" + $block.Trim() + "`r`n").TrimStart())
    }

    if ($existing -eq $next) {
        Write-Host "$kind loader already up to date: $path"
        return
    }
    if (Test-Path -LiteralPath $path) {
        $backup = "$path.bak.$timestamp"
        if ($PSCmdlet.ShouldProcess($path, "Create backup at $backup")) { Copy-Item -LiteralPath $path -Destination $backup }
    }
    if ($PSCmdlet.ShouldProcess($path, 'Install or update managed DevBrain bootstrap block')) {
        Set-Content -LiteralPath $path -Value $next -Encoding UTF8
        Write-Host "$kind loader installed: $path"
    }
}

function Install-CustomSkills {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [ValidateSet('Codex', 'Claude', 'Both')]
        [string]$kind = 'Both'
    )

    $sourceRoot = Join-Path $resolvedRoot 'skills'
    if (-not (Test-Path -LiteralPath $sourceRoot)) {
        Write-Host "DevBrain skills source not found; skipping skill installation: $sourceRoot"
        return
    }

    $skillNames = Get-ChildItem -LiteralPath $sourceRoot -Directory | Select-Object -ExpandProperty Name
    foreach ($targetKind in @('Codex', 'Claude')) {
        if ($kind -notin @($targetKind, 'Both')) { continue }

        $skillsRelative = if ($targetKind -eq 'Codex') { '.codex\skills' } else { '.claude\skills' }
        $backupRelative = if ($targetKind -eq 'Codex') { '.codex\devbrain-backups\skills' } else { '.claude\devbrain-backups\skills' }
        $targetRoot = Join-Path $HOME $skillsRelative
        $backupRoot = Join-Path $HOME $backupRelative
        if (-not (Test-Path -LiteralPath $targetRoot) -and $PSCmdlet.ShouldProcess($targetRoot, 'Create skills directory')) {
            New-Item -ItemType Directory -Path $targetRoot -Force | Out-Null
        }

        foreach ($skillName in $skillNames) {
            $source = Join-Path $sourceRoot $skillName
            $destination = Join-Path $targetRoot $skillName
            if (Test-Path -LiteralPath $destination) {
                $backup = Join-Path $backupRoot (Join-Path $timestamp $skillName)
                if ($PSCmdlet.ShouldProcess($destination, "Back up existing skill to $backup")) {
                    New-Item -ItemType Directory -Path (Split-Path -Parent $backup) -Force | Out-Null
                    Copy-Item -LiteralPath $destination -Destination $backup -Recurse -Force
                }
            }
            if ($PSCmdlet.ShouldProcess($destination, "Install $skillName for $targetKind")) {
                Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
                Write-Host "$targetKind skill installed: $skillName"
            }
        }
    }
}

if (-not (Test-Path -LiteralPath (Join-Path $resolvedRoot 'runtime\full-context.md'))) {
    throw "DevBrain runtime not found under $resolvedRoot"
}

if ($Tool -in @('Codex', 'Both')) { Install-Loader 'Codex' (Join-Path $HOME '.codex\AGENTS.md') }
if ($Tool -in @('Claude', 'Both')) { Install-Loader 'Claude' (Join-Path $HOME '.claude\CLAUDE.md') }
if (-not $SkipSkills) { Install-CustomSkills -kind $Tool }

Write-Host "DevBrain bootstrap complete. Existing user instructions were preserved; managed bootstrap and custom skills were installed or updated."
