[CmdletBinding()]
param([string]$DevBrainRoot, [string]$YamlModule)
$ErrorActionPreference = 'Stop'
if (-not $DevBrainRoot) { $DevBrainRoot = Split-Path -Parent $PSScriptRoot }
$root = (Resolve-Path -LiteralPath $DevBrainRoot).Path
$paths = @(& git -C $root ls-files --cached --others --exclude-standard)
if ($LASTEXITCODE -ne 0) { throw 'Unable to enumerate repository files' }
$parseCount = 0
foreach ($relative in $paths | Where-Object { $_ -like '*.ps1' }) {
    $tokens = $null
    $parseErrors = $null
    [Management.Automation.Language.Parser]::ParseFile((Join-Path $root $relative),[ref]$tokens,[ref]$parseErrors) | Out-Null
    if ($parseErrors.Count) { throw "PowerShell parse error in $($relative): $($parseErrors.Message -join ', ')" }
    $parseCount++
}
Write-Output "PASS: $parseCount PowerShell scripts parsed."
Add-Type -AssemblyName System.IO.Compression.FileSystem
foreach ($relative in $paths | Where-Object { $_ -like '*.docx' }) {
    $zip = [IO.Compression.ZipFile]::OpenRead((Join-Path $root $relative))
    try {
        foreach ($entry in $zip.Entries | Where-Object { $_.FullName -like '*.xml' -or $_.FullName -like '*.rels' }) {
            $reader = [IO.StreamReader]::new($entry.Open())
            try { $text = $reader.ReadToEnd() } finally { $reader.Dispose() }
            if ($text -match '(?<![A-Za-z0-9])[A-Za-z]:[\\/]|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----') { throw "Sensitive path/key candidate in DOCX part: $relative / $($entry.FullName)" }
        }
    } finally { $zip.Dispose() }
}
Write-Output 'PASS: DOCX package path/key scan.'
if ($YamlModule) { & node (Join-Path $root 'evaluation/validate-content.cjs') $YamlModule }
else { & node (Join-Path $root 'evaluation/validate-content.cjs') }
if ($LASTEXITCODE -ne 0) { throw 'Content validation failed; see findings above.' }
& git -c core.safecrlf=false -C $root diff --check
if ($LASTEXITCODE -ne 0) { throw 'git diff --check failed' }
Write-Output 'PASS: git diff --check.'
