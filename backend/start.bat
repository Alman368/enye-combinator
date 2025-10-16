@echo off
cd /d "%~dp0"

echo Verificando Python...

REM Intentar usar venv si existe
if exist "..\venv\Scripts\activate.bat" (
    echo Usando entorno virtual...
    call ..\venv\Scripts\activate.bat
) else (
    echo No se encontro venv, usando Python del sistema...
)

REM Verificar que Python funciona
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no esta instalado o no esta en PATH
    pause
    exit /b 1
)

echo Iniciando servidor...
python run_dev.py

