$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location (Join-Path $projectRoot 'backend')
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) { throw 'Maven não encontrado no PATH. Instale Maven 3.9+ e tente novamente.' }
mvn spring-boot:run
