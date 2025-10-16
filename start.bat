@echo off
REM MindHealth Analytics - Development Start Script for Windows

echo Starting MindHealth Analytics Development Environment...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python 3 is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "backend\venv" (
    echo Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

REM Activate virtual environment and install backend dependencies
echo Installing backend dependencies...
cd backend
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
cd ..

REM Check if database is initialized
if not exist "backend\.db_initialized" (
    echo Initializing database...
    cd backend
    python init_db.py
    echo. > .db_initialized
    cd ..
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

REM Install concurrently if not present
if not exist "node_modules" (
    echo Installing development tools...
    npm install
)

echo.
echo All dependencies installed!
echo.
echo Starting servers...
echo    - Backend:  http://localhost:8000
echo    - Frontend: http://localhost:3000
echo    - API Docs: http://localhost:8000/api/v1/docs
echo.

REM Start both servers
npm start
