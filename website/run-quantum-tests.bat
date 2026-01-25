@echo off
echo 🌀 CASCADE⚡𓂧φ∞ QUANTUM TEST SUITE 🌀
echo Starting φ-harmonic testing at all frequency levels...
echo.

REM Set Node environment 
set NODE_ENV=test

REM Create the quantum-reports directory if it doesn't exist
if not exist "quantum-reports" mkdir quantum-reports

REM Run the quantum test suite
node test/quantum-test-suite.js

echo.
echo If successful, test reports are available in the quantum-reports directory.
echo.
pause
