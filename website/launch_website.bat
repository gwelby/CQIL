@echo off
REM CQIL Website Launcher for Windows
REM This batch file launches the CQIL website locally

echo === CQIL Website Launcher ===
echo This script will deploy and launch the website locally
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in your PATH
    echo Please install Python 3 and try again.
    pause
    exit /b 1
)

REM Deploy and launch the website
echo Launching CQIL Website...
echo This may take a few seconds...
echo.

REM Get the directory of this batch file
cd /d %~dp0

REM Launch website manager
python deploy\website_manager.py --launch

REM Script will remain running until the user presses Ctrl+C
REM as the website_manager.py script will keep running in foreground