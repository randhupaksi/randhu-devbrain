[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$DevBrainRoot,
    [ValidateSet('Codex', 'Claude', 'Both')][string]$Tool = 'Both',
    [string]$UserHome = $HOME,
    [string]$CodexHome,
    [string]$CodexSkillsPath,
    [switch]$SkipSkills
)
$installer = Join-Path $PSScriptRoot 'install-bootstrap.ps1'
if (-not (Test-Path -LiteralPath $installer)) { throw "Installer not found: $installer" }
& $installer @PSBoundParameters
