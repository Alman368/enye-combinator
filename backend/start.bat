@echo off
cd /d "%~dp0"

echo Activando entorno virtual...
if exist "..\venv\Scripts\activate.bat" (
    call ..\venv\Scripts\activate.bat
    echo Entorno virtual activado
) else (
    echo ERROR: No se encuentra el entorno virtual
    echo Ejecuta: python -m venv venv
    pause
    exit /b 1
)

echo Iniciando servidor...
python run_dev.py

