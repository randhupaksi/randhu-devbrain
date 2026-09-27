[CmdletBinding()]
param([string]$DevBrainRoot)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
if (-not $DevBrainRoot) { $DevBrainRoot = Split-Path -Parent $PSScriptRoot }
$root = (Resolve-Path -LiteralPath $DevBrainRoot).Path
$testRoot = Join-Path $root ('local/installer-tests-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $testRoot -Force | Out-Null
$installer = Join-Path $root 'install/install-bootstrap.ps1'
$updater = Join-Path $root 'install/update-bootstrap.ps1'
$script:checks = 0
function Assert([bool]$Condition, [string]$Message) {
    if (-not $Condition) { throw "FAIL: $Message" }
    $script:checks++
}
function Snapshot([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return '<absent>' }
    return (@(Get-ChildItem -LiteralPath $Path -Recurse -Force | Sort-Object FullName | ForEach-Object {
        $relative = $_.FullName.Substring($Path.Length)
        if ($_.PSIsContainer) { "D:$relative" }
        else { "F:$relative=" + (Get-FileHash -LiteralPath $_.FullName).Hash }
    }) -join "`n")
}
function Skill-Signature([string]$Path) {
    return (@(Get-ChildItem -LiteralPath $Path -File -Recurse -Force | Sort-Object FullName | ForEach-Object {
        $_.FullName.Substring($Path.Length).Replace('\','/') + ':' + (Get-FileHash -LiteralPath $_.FullName).Hash
    }) -join "`n")
}
function Assert-Fails([scriptblock]$Action, [string]$Message) {
    $failed = $false
    try { & $Action } catch { $failed = $true }
    Assert $failed $Message
}
$names = @('enterprise-ui-ux','marketing-portfolio-ui-ux','design-system-architect','architecture-refactor','frontend-performance','accessibility-audit','testing-strategy')
$fakeHome = Join-Path $testRoot 'Different User'
& $installer -UserHome $fakeHome -WhatIf 6>$null
Assert (-not (Test-Path -LiteralPath $fakeHome)) 'WhatIf must not create even the home directory'
& $updater -UserHome $fakeHome -WhatIf -SkipSkills 6>$null
Assert (-not (Test-Path -LiteralPath $fakeHome)) 'Updater forwards WhatIf and SkipSkills'

# Preserve arbitrary user text outside the managed block, including whitespace.
New-Item -ItemType Directory -Path (Join-Path $fakeHome '.codex'),(Join-Path $fakeHome '.claude') -Force | Out-Null
$personal = "# Personal instructions`r`nKeep this exact text.  `r`n"
$oldBlock = "<!-- DEVBRAIN-BOOTSTRAP:START -->`nold managed text`n<!-- DEVBRAIN-BOOTSTRAP:END -->"
$suffix = "`r`n# Personal footer`r`n"
$codexLoader = Join-Path $fakeHome '.codex/AGENTS.md'
[IO.File]::WriteAllText($codexLoader, $personal + $oldBlock + $suffix)
[IO.File]::WriteAllText((Join-Path $fakeHome '.claude/CLAUDE.md'),$personal)
$beforeLoader = (Get-FileHash -LiteralPath $codexLoader).Hash
& $installer -UserHome $fakeHome 6>$null
$actual = [IO.File]::ReadAllText($codexLoader)
Assert ($actual.StartsWith($personal) -and $actual.EndsWith($suffix)) 'Outside managed block remains exact'
$backup = @(Get-ChildItem -LiteralPath (Join-Path $fakeHome '.codex') -Filter 'AGENTS.md.bak.*')
Assert ($backup.Count -eq 1 -and (Get-FileHash $backup[0].FullName).Hash -eq $beforeLoader) 'Loader backup preserves original bytes'
$template = [IO.File]::ReadAllText((Join-Path $root 'adapters/codex/AGENTS.global.template.md')).Replace('<DEVBRAIN_ROOT>',$root.Replace('\','/')).TrimEnd("`r","`n")
Assert ($actual.Contains($template)) 'Installed loader matches canonical template and injected root'
foreach ($name in $names) {
    $source = Skill-Signature (Join-Path $root "skills/$name")
    $codex = Skill-Signature (Join-Path $fakeHome ".agents/skills/$name")
    $claude = Skill-Signature (Join-Path $fakeHome ".claude/skills/$name")
    Assert ($source -ceq $codex -and $codex -ceq $claude) "Source/Codex/Claude full-file parity: $name"
}
$before = Snapshot $fakeHome
& $updater -UserHome $fakeHome 6>$null
Assert ((Snapshot $fakeHome) -ceq $before) 'Repeated update is idempotent and makes no backup churn'
& $installer -UserHome $fakeHome -WhatIf 6>$null
Assert ((Snapshot $fakeHome) -ceq $before) 'WhatIf on existing installation changes nothing'

# Legacy nested skill reproduction; stale/local files must survive in backup.
$legacyHome = Join-Path $testRoot 'Legacy User'
$legacySkill = Join-Path $legacyHome '.codex/skills/enterprise-ui-ux'
New-Item -ItemType Directory -Path (Join-Path $legacySkill 'enterprise-ui-ux') -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $legacySkill 'SKILL.md'),'old root')
[IO.File]::WriteAllText((Join-Path $legacySkill 'enterprise-ui-ux/SKILL.md'),'old nested')
[IO.File]::WriteAllText((Join-Path $legacySkill 'personal-note.md'),'preserve local customization')
$oldSignature = Skill-Signature $legacySkill
& $installer -UserHome $legacyHome -Tool Codex 6>$null
Assert (-not (Test-Path -LiteralPath (Join-Path $legacySkill 'enterprise-ui-ux'))) 'Update removes nested discovery copy from active skill'
Assert (-not (Test-Path -LiteralPath (Join-Path $legacyHome '.agents'))) 'Legacy update does not install a second active location'
$legacyBackup = @(Get-ChildItem -LiteralPath (Join-Path $legacyHome '.codex/devbrain-backups') -Directory -Recurse | Where-Object {$_.Name -eq 'enterprise-ui-ux' -and (Test-Path -LiteralPath (Join-Path $_.FullName 'personal-note.md'))})
Assert ($legacyBackup.Count -eq 1 -and (Skill-Signature $legacyBackup[0].FullName) -ceq $oldSignature) 'Original nested and custom content preserved in backup'
$skipBefore = Snapshot (Join-Path $legacyHome '.codex/skills')
& $updater -UserHome $legacyHome -Tool Codex -SkipSkills 6>$null
Assert ((Snapshot (Join-Path $legacyHome '.codex/skills')) -ceq $skipBefore) 'SkipSkills leaves installed skill tree unchanged'
Assert (-not (Test-Path -LiteralPath (Join-Path $legacyHome '.claude'))) 'Tool Codex does not touch Claude'

$skipHome = Join-Path $testRoot 'Skip Fresh'
& $installer -UserHome $skipHome -Tool Claude -SkipSkills 6>$null
Assert ((Test-Path (Join-Path $skipHome '.claude/CLAUDE.md')) -and -not (Test-Path (Join-Path $skipHome '.claude/skills'))) 'Fresh SkipSkills installs only selected loader'
Assert (-not (Test-Path (Join-Path $skipHome '.codex'))) 'Tool Claude does not touch Codex'

# Preflight prevents partial installation if a later target has invalid markers.
$badHome = Join-Path $testRoot 'Bad Markers'
New-Item -ItemType Directory -Path (Join-Path $badHome '.claude') -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $badHome '.claude/CLAUDE.md'),'<!-- DEVBRAIN-BOOTSTRAP:START -->')
$badBefore = Snapshot $badHome
Assert-Fails { & $installer -UserHome $badHome 6>$null } 'Unbalanced managed markers rejected'
Assert ((Snapshot $badHome) -ceq $badBefore) 'All preflight precedes first write'
foreach ($badText in @($oldBlock + $oldBlock,'<!-- DEVBRAIN-BOOTSTRAP:END --><!-- DEVBRAIN-BOOTSTRAP:START -->')) {
    [IO.File]::WriteAllText((Join-Path $badHome '.claude/CLAUDE.md'),$badText)
    Assert-Fails { & $installer -UserHome $badHome -WhatIf 6>$null } 'Duplicate/reversed markers rejected even during preview'
}

# Actual local clone, then overlay current uncommitted source for testing v2.
$clone = Join-Path $testRoot 'Clone at different location'
& git -c "safe.directory=$root" -c "safe.directory=$(Join-Path $root '.git')" clone --quiet --no-hardlinks -- $root $clone
if ($LASTEXITCODE -ne 0) { throw 'Local clone failed' }
$paths = @(& git -C $root ls-files --cached --others --exclude-standard)
foreach ($relative in $paths) {
    $source = Join-Path $root $relative
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { continue }
    $target = Join-Path $clone $relative
    New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force
}
$cloneHome = Join-Path $testRoot 'Another Account'
$cloneInstaller = Join-Path $clone 'install/install-bootstrap.ps1'
& $cloneInstaller -UserHome $cloneHome -WhatIf 6>$null
Assert (-not (Test-Path $cloneHome)) 'Relocated clone WhatIf is non-mutating'
& $cloneInstaller -UserHome $cloneHome 6>$null
$cloneLoader = [IO.File]::ReadAllText((Join-Path $cloneHome '.codex/AGENTS.md'))
Assert ($cloneLoader.Contains($clone.Replace('\','/') + '/runtime/session-baseline.md')) 'Relocated installer resolves its own repository root'
foreach ($name in $names) {
    Assert ((Skill-Signature (Join-Path $clone "skills/$name")) -ceq (Skill-Signature (Join-Path $cloneHome ".agents/skills/$name"))) "Clone skill parity: $name"
}
$customHome = Join-Path $testRoot 'Custom Config Home'
$customSkills = Join-Path $testRoot 'Custom Skills'
& $installer -Tool Codex -UserHome (Join-Path $testRoot 'Custom Account') -CodexHome $customHome -CodexSkillsPath $customSkills 6>$null
Assert ((Test-Path (Join-Path $customHome 'AGENTS.md')) -and (Test-Path (Join-Path $customSkills 'architecture-refactor/SKILL.md'))) 'Explicit custom paths supported'
Assert-Fails { & $installer -Tool Codex -UserHome (Join-Path $testRoot 'Forbidden Source') -CodexSkillsPath (Join-Path $root 'skills') 6>$null } 'Installing over canonical skill source rejected'

Write-Output "PASS: $script:checks installer assertions. All writes were inside local/installer-tests-*."
Write-Output 'Actual host configuration and external projects were not modified. Fixture directories retained for inspection.'
