@echo off
cd /d "%~dp0"

echo ================================================================
echo DIAGNOSTICO DE CONFIGURACION - WINDOWS
echo ================================================================
echo.

REM Intentar activar venv si existe
if exist "..\venv\Scripts\activate.bat" (
    call ..\venv\Scripts\activate.bat
    echo [OK] Usando entorno virtual
) else (
    echo [INFO] No hay venv, usando Python del sistema
)

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no esta instalado o no esta en PATH
    pause
    exit /b 1
)

echo.
echo Ejecutando diagnostico de Python...
echo.

python diagnostico.py

echo.
echo ================================================================
echo Presiona cualquier tecla para cerrar...
pause > nul

