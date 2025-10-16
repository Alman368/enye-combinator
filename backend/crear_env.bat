@echo off
cd /d "%~dp0"

echo ================================================================
echo CREAR ARCHIVO .env
echo ================================================================
echo.

if exist ".env" (
    echo El archivo .env ya existe.
    echo.
    choice /C SN /M "Deseas sobrescribirlo (S/N)"
    if errorlevel 2 exit /b 0
)

echo.
echo Copiando .env.ejemplo a .env...
copy .env.ejemplo .env

echo.
echo ================================================================
echo ARCHIVO .env CREADO
echo ================================================================
echo.
echo IMPORTANTE: Edita backend\.env y configura:
echo   1. ORACLE_DB_PASSWORD con tu password real de Oracle
echo   2. ORACLE_DB_SERVICE_NAME si es diferente
echo.
echo Luego ejecuta: start.bat
echo.
pause

