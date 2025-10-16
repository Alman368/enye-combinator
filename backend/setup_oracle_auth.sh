#!/bin/bash

# ================================================
# SETUP ORACLE AUTHENTICATION
# ================================================
# This script automates the Oracle auth setup
# ================================================

echo "========================================================================"
echo "🚀 ORACLE AUTHENTICATION SETUP"
echo "========================================================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "   Please create a .env file with Oracle credentials"
    exit 1
fi

echo -e "${GREEN}✓${NC} .env file found"

# Check if wallet directory exists
if [ ! -d "wallet" ]; then
    echo -e "${RED}❌ Error: wallet directory not found${NC}"
    echo "   Please add Oracle wallet to backend/wallet/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Wallet directory found"

# Check if virtual environment is activated
if [ -z "$VIRTUAL_ENV" ]; then
    echo -e "${YELLOW}⚠${NC}  Virtual environment not activated"
    echo "   Activating venv..."
    
    if [ -f "../venv/bin/activate" ]; then
        source ../venv/bin/activate
    elif [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    else
        echo -e "${RED}❌ Error: Virtual environment not found${NC}"
        echo "   Please create it first: python -m venv venv"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} Virtual environment activated"

# Ask user which option to use
echo ""
echo "Choose an option:"
echo "  1) Migrate users from SQLite to Oracle"
echo "  2) Initialize Oracle with sample users (fresh start)"
echo "  3) Skip - I already have users in Oracle"
echo ""
read -p "Enter option (1-3): " option

case $option in
    1)
        echo ""
        echo "========================================================================"
        echo "🔄 MIGRATING USERS FROM SQLite TO ORACLE"
        echo "========================================================================"
        python migrate_users_to_oracle.py
        ;;
    2)
        echo ""
        echo "========================================================================"
        echo "🆕 INITIALIZING ORACLE WITH SAMPLE USERS"
        echo "========================================================================"
        python init_db_oracle.py
        ;;
    3)
        echo ""
        echo "⏭️  Skipping database initialization"
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

# Test authentication
echo ""
echo "========================================================================"
echo "🧪 TESTING AUTHENTICATION"
echo "========================================================================"
echo ""
echo "Starting backend server..."

# Start backend in background
python run_dev.py &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start (10 seconds)..."
sleep 10

# Run tests
python test_oracle_auth.py

# Stop backend
echo ""
echo "Stopping backend server..."
kill $BACKEND_PID

echo ""
echo "========================================================================"
echo "✅ SETUP COMPLETE!"
echo "========================================================================"
echo ""
echo "Next steps:"
echo "  1. Start backend: python run_dev.py"
echo "  2. Test login with:"
echo "     - admin@mindhealth.com / admin123"
echo "     - researcher@hospital.com / researcher123"
echo "     - viewer@hospital.com / viewer123"
echo ""


