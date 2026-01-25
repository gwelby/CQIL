# QUANTUM DOCUMENTATION SYSTEM STARTER
# Launches the Quantum Documentation System and Dashboard
# 
# @version 1.0.0
# @frequency 768
# @coherence 1.000

# Print header
Write-Host "`n🌀 QUANTUM DOCUMENTATION SYSTEM 🌀`n==========================================" -ForegroundColor Cyan

# Check for Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js to run the Quantum Documentation System." -ForegroundColor Red
    exit 1
}

# Check for required modules
Write-Host "`nChecking required Node modules..." -ForegroundColor Cyan
$requiredModules = @("express")
$missingModules = @()

foreach ($module in $requiredModules) {
    try {
        $moduleCheck = npm list $module --depth=0 2>$null
        if ($moduleCheck -match "empty") {
            $missingModules += $module
        } else {
            Write-Host "✓ Module found: $module" -ForegroundColor Green
        }
    } catch {
        $missingModules += $module
    }
}

# Install missing modules if any
if ($missingModules.Count -gt 0) {
    Write-Host "`nInstalling missing modules..." -ForegroundColor Yellow
    foreach ($module in $missingModules) {
        Write-Host "Installing $module..." -ForegroundColor Yellow
        npm install $module
    }
} else {
    Write-Host "`nAll required modules are installed." -ForegroundColor Green
}

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start the server
Write-Host "`nLaunching Quantum Documentation Server at Unity frequency (768 Hz)..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor Yellow

# Change to script directory and start server
Set-Location $scriptDir
node quantum-doc-server.js

# Launch browser if server started
if ($LASTEXITCODE -eq 0) {
    Start-Process "http://localhost:7680"
}
