[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$DevBrainRoot = (Split-Path -Parent $PSScriptRoot),
    [ValidateSet('Codex', 'Claude', 'Both')]
    [string]$Tool = 'Both'
)

$installer = Join-Path $PSScriptRoot 'install-bootstrap.ps1'
if (-not (Test-Path -LiteralPath $installer)) { throw "Installer not found: $installer" }
& $installer -DevBrainRoot $DevBrainRoot -Tool $Tool -WhatIf:$WhatIfPreference
