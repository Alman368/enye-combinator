#!/bin/bash

echo "═══════════════════════════════════════════════════════"
echo "🚀 Iniciando MindHealth Analytics - Modo Desarrollo"
echo "═══════════════════════════════════════════════════════"
echo ""

# Cleanup any existing processes
echo "🧹 Limpiando procesos anteriores..."
pkill -f "vite" 2>/dev/null
pkill -f "uvicorn" 2>/dev/null
pkill -f "run_dev.py" 2>/dev/null
sleep 2

# Check if ports are free
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Puerto 5173 ocupado. Liberando..."
    kill -9 $(lsof -ti:5173) 2>/dev/null
fi

if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Puerto 8000 ocupado. Liberando..."
    kill -9 $(lsof -ti:8000) 2>/dev/null
fi

sleep 1

echo "✅ Puertos liberados"
echo ""

# Check if database exists
if [ ! -f "backend/mindhealth.db" ]; then
    echo "🗄️  Base de datos no encontrada. Inicializando..."
    cd backend && python3 init_db.py && cd ..
    echo ""
fi

echo "📦 Iniciando servicios..."
echo ""
echo "   🔧 Backend (FastAPI): http://localhost:8000"
echo "   📱 Frontend (React):  http://localhost:5173"
echo ""
echo "🔑 Credenciales de acceso:"
echo "   📧 Email:    admin@mindhealth.com"
echo "   🔐 Password: admin123"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

# Start the application
npm start
