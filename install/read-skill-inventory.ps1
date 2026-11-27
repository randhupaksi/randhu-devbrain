param([Parameter(Mandatory)][string]$Manifest)

# The installer supports the manifest's plain block list without a YAML dependency.
$found = $false
$inside = $false
$seen = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
$names = foreach ($line in [IO.File]::ReadAllLines($Manifest)) {
    if ($line -cmatch '^skills:[ \t]*(?:#.*)?$') {
        if ($found) { throw 'Repeated skills section in DevBrain manifest.' }
        $found = $true
        $inside = $true
        continue
    }
    if (-not $inside) { continue }
    if ($line -match '^\s*(?:#.*)?$') { continue }
    if ($line -cmatch '^[a-z_][a-z_0-9]*:') { $inside = $false; continue }
    if ($line -cnotmatch '^  - ([a-z0-9]+(?:-[a-z0-9]+)*)(?:[ \t]+#.*)?[ \t]*$') {
        throw 'Expected a plain skill ID in the DevBrain manifest skills block.'
    }
    $name = $Matches[1]
    if (-not $seen.Add($name)) { throw "Duplicate skill ID: $name" }
    $name
}
if ($seen.Count -eq 0) { throw 'Missing or empty DevBrain manifest skills block.' }
$names
