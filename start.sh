#!/bin/bash

# MindHealth Analytics - Development Start Script

echo "🚀 Starting MindHealth Analytics Development Environment..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    cd ..
fi

# Activate virtual environment and install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
source venv/bin/activate 2>/dev/null || ./venv/Scripts/activate
pip install -q -r requirements.txt
cd ..

# Check if database is initialized
if [ ! -f "backend/.db_initialized" ]; then
    echo "🗄️  Initializing database..."
    cd backend
    python init_db.py
    touch .db_initialized
    cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Install concurrently if not present
if [ ! -d "node_modules" ]; then
    echo "📦 Installing development tools..."
    npm install
fi

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🎯 Starting servers..."
echo "   - Backend:  http://localhost:8000"
echo "   - Frontend: http://localhost:3000"
echo "   - API Docs: http://localhost:8000/api/v1/docs"
echo ""

# Start both servers
npm start
