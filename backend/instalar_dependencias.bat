@echo off
cd /d "%~dp0"

echo ================================================================
echo INSTALANDO DEPENDENCIAS DE PYTHON
echo ================================================================
echo.

REM Verificar Python
python --version
if errorlevel 1 (
    echo ERROR: Python no esta instalado
    echo Descargalo de: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo.
echo Instalando dependencias desde requirements.txt...
echo.

pip install -r requirements.txt

if errorlevel 1 (
    echo.
    echo ERROR: Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo ================================================================
echo INSTALACION COMPLETADA
echo ================================================================
echo.
echo Ahora puedes ejecutar:
echo   - start.bat (para iniciar el servidor)
echo   - diagnostico.bat (para verificar configuracion)
echo.
pause

