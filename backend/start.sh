#!/bin/bash
cd "$(dirname "$0")"

# Intentar activar venv si existe
if [ -f "../venv/bin/activate" ]; then
    source ../venv/bin/activate
fi

# Detectar python o python3
if command -v python &> /dev/null; then
    python run_dev.py
elif command -v python3 &> /dev/null; then
    python3 run_dev.py
else
    echo "ERROR: Python no está instalado"
    exit 1
fi


