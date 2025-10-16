@echo off
cls
echo ================================================================
echo ENYE COMBINATOR - INICIO RAPIDO PARA WINDOWS
echo ================================================================
echo.
echo Este script iniciara el backend y frontend automaticamente.
echo.
echo Presiona cualquier tecla para continuar...
pause > nul
cls

echo ================================================================
echo PASO 1: Verificando Python
echo ================================================================
echo.
python --version
if errorlevel 1 (
    echo.
    echo ERROR: Python no esta instalado o no esta en PATH
    echo.
    echo Descarga Python de: https://www.python.org/downloads/
    echo Durante la instalacion, marca: "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================================
echo PASO 2: Instalando dependencias (solo primera vez)
echo ================================================================
echo.
cd backend
if not exist ".env" (
    echo.
    echo ERROR: No se encuentra el archivo .env
    echo.
    echo Ejecuta primero: backend\crear_env.bat
    echo Luego edita backend\.env con tus credenciales de Oracle
    echo.
    cd ..
    pause
    exit /b 1
)

echo Instalando paquetes Python...
pip install -r requirements.txt --quiet
cd ..

echo.
echo ================================================================
echo PASO 3: Iniciando aplicacion
echo ================================================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener
echo.

npm start

