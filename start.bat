@echo off
echo ========================================
echo AI Interview Platform - Startup Script
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if Docker is running
docker info >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Docker is not running!
    echo Please start Docker Desktop first.
    echo.
    pause
    exit /b 1
)

echo [1/5] Checking Node.js version...
node --version
npm --version
echo.

echo [2/5] Installing dependencies (if needed)...
if not exist "node_modules" (
    echo Running npm install...
    npm install
) else (
    echo Dependencies already installed.
)
echo.

echo [3/5] Starting PostgreSQL database...
docker-compose up -d
echo Waiting for database to be ready...
timeout /t 5 /nobreak >nul
echo.

echo [4/5] Setting up database schema...
if not exist "prisma\migrations" (
    echo Initializing database...
    npm run db:push
    echo.
    echo Seeding database with problems...
    npm run db:seed
) else (
    echo Database already initialized.
)
echo.

echo [5/5] Starting development server...
echo.
echo ========================================
echo Opening http://localhost:3000 in browser...
echo Press Ctrl+C to stop the server
echo ========================================
echo.

:: Open browser after a short delay
start "" http://localhost:3000

:: Start the dev server
npm run dev
