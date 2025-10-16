@echo off
cd /d "%~dp0"

echo ================================================================
echo INICIANDO BACKEND
echo ================================================================
echo.

echo [1/4] Verificando Python...
python --version 2>nul
if errorlevel 1 (
    python3 --version 2>nul
    if errorlevel 1 (
        echo ERROR: Python no esta instalado o no esta en PATH
        pause
        exit /b 1
    )
    set PYTHON_CMD=python3
) else (
    set PYTHON_CMD=python
)

echo.
echo [2/4] Verificando .env...
if exist ".env" (
    echo OK: Archivo .env encontrado
) else (
    echo ERROR: No se encuentra el archivo .env
    echo Debe estar en: backend\.env
    pause
    exit /b 1
)

echo.
echo [3/4] Verificando configuracion Oracle...
%PYTHON_CMD% -c "from app.core.config import settings; print('ORACLE_DB_USER:', settings.ORACLE_DB_USER or 'NO CONFIGURADO'); print('ORACLE_DB_SERVICE_NAME:', settings.ORACLE_DB_SERVICE_NAME or 'NO CONFIGURADO')"

echo.
echo [4/4] Iniciando servidor...
echo.
%PYTHON_CMD% run_dev.py

