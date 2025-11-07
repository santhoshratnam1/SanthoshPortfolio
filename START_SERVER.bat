@echo off
echo ========================================
echo   Portfolio Website - Local Server
echo ========================================
echo.
echo This will start a local web server so your
echo website can load content.json properly.
echo.
echo Press Ctrl+C to stop the server when done.
echo.
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python found! Starting server...
    echo.
    echo Open your browser and go to: http://localhost:8000
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js found! Checking http-server...
    echo.
    
    REM Check if http-server is installed
    http-server --version >nul 2>&1
    if %errorlevel% == 0 (
        echo [OK] http-server found! Starting server...
        echo.
        echo Open your browser and go to: http://localhost:8080
        echo.
        http-server
        goto :end
    ) else (
        echo [INFO] Installing http-server...
        npm install -g http-server
        if %errorlevel% == 0 (
            echo [OK] http-server installed! Starting server...
            echo.
            echo Open your browser and go to: http://localhost:8080
            echo.
            http-server
            goto :end
        )
    )
)

REM No server found
echo [ERROR] No web server found!
echo.
echo Please install one of the following:
echo.
echo OPTION 1: VS Code Live Server (RECOMMENDED - Easiest!)
echo   1. Open VS Code
echo   2. Install "Live Server" extension
echo   3. Right-click index.html
echo   4. Select "Open with Live Server"
echo.
echo OPTION 2: Install Python
echo   1. Download from: https://www.python.org/downloads/
echo   2. Run this file again
echo.
echo OPTION 3: Install Node.js
echo   1. Download from: https://nodejs.org/
echo   2. Run this file again
echo.
pause

:end

