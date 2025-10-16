@echo off
cd /d "%~dp0"

echo ================================================================
echo DIAGNOSTICO DE CONFIGURACION - WINDOWS
echo ================================================================
echo.

REM Activar venv
if exist "..\venv\Scripts\activate.bat" (
    call ..\venv\Scripts\activate.bat
    echo [OK] Entorno virtual activado
) else (
    echo [ERROR] No se encuentra el entorno virtual en ..\venv
    echo.
    echo Solucion: Ejecuta en la raiz del proyecto:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r backend\requirements.txt
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

