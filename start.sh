#!/bin/bash

echo "========================================"
echo "AI Interview Platform - Startup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "WARNING: Docker is not running!"
    echo "Please start Docker Desktop first."
    echo ""
    exit 1
fi

echo "[1/5] Checking Node.js version..."
node --version
npm --version
echo ""

echo "[2/5] Installing dependencies (if needed)..."
if [ ! -d "node_modules" ]; then
    echo "Running npm install..."
    npm install
else
    echo "Dependencies already installed."
fi
echo ""

echo "[3/5] Starting PostgreSQL database..."
docker-compose up -d
echo "Waiting for database to be ready..."
sleep 5
echo ""

echo "[4/5] Setting up database schema..."
if [ ! -d "prisma/migrations" ]; then
    echo "Initializing database..."
    npm run db:push
    echo ""
    echo "Seeding database with problems..."
    npm run db:seed
else
    echo "Database already initialized."
fi
echo ""

echo "[5/5] Starting development server..."
echo ""
echo "========================================"
echo "Opening http://localhost:3000 in browser..."
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Open browser (works on macOS and Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000 2>/dev/null
fi

# Start the dev server
npm run dev
