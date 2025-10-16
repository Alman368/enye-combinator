"""
Script de diagnóstico para verificar la configuración
Ejecutar: python diagnostico.py
"""
import os
import sys

print("=" * 60)
print("🔍 DIAGNÓSTICO DE CONFIGURACIÓN")
print("=" * 60)

# 1. Verificar que estamos en el directorio correcto
print("\n1. Directorio actual:")
print(f"   {os.getcwd()}")

# 2. Verificar que existe .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"\n2. Archivo .env:")
if os.path.exists(env_path):
    print(f"   ✅ Existe: {env_path}")
else:
    print(f"   ❌ NO EXISTE: {env_path}")
    print("   CREAR ARCHIVO .env EN backend/")
    sys.exit(1)

# 3. Verificar configuración
print("\n3. Cargando configuración...")
try:
    from app.core.config import settings
    print("   ✅ Configuración cargada")
except Exception as e:
    print(f"   ❌ Error cargando config: {e}")
    sys.exit(1)

# 4. Verificar credenciales Oracle
print("\n4. Credenciales Oracle:")
print(f"   ORACLE_DB_USER: {settings.ORACLE_DB_USER or '❌ VACÍO'}")
print(f"   ORACLE_DB_PASSWORD: {'✅ Configurado' if settings.ORACLE_DB_PASSWORD else '❌ VACÍO'}")
print(f"   ORACLE_DB_SERVICE_NAME: {settings.ORACLE_DB_SERVICE_NAME or '❌ VACÍO'}")

# 5. Verificar wallet
print("\n5. Wallet Oracle:")
wallet_dir = os.path.join(os.path.dirname(__file__), 'wallet')
if os.path.exists(wallet_dir):
    print(f"   ✅ Directorio existe: {wallet_dir}")
    files = os.listdir(wallet_dir)
    print(f"   Archivos: {', '.join(files)}")
    
    required = ['cwallet.sso', 'tnsnames.ora', 'sqlnet.ora']
    for req in required:
        if req in files:
            print(f"   ✅ {req}")
        else:
            print(f"   ❌ FALTA: {req}")
else:
    print(f"   ❌ NO EXISTE: {wallet_dir}")

# 6. Verificar qué base de datos se usará
print("\n6. Base de datos que se usará:")
from app.db.session import get_database_url
db_url = get_database_url()
if 'oracle' in db_url:
    print(f"   ✅ ORACLE: {settings.ORACLE_DB_SERVICE_NAME}")
else:
    print(f"   ⚠️  SQLite: {settings.DATABASE_URL}")
    print("   Para usar Oracle, descomenta las credenciales en .env")

# 7. Verificar dependencias
print("\n7. Dependencias Python:")
try:
    import fastapi
    print(f"   ✅ fastapi: {fastapi.__version__}")
except:
    print("   ❌ fastapi NO INSTALADO")

try:
    import oracledb
    print(f"   ✅ oracledb: {oracledb.__version__}")
except:
    print("   ❌ oracledb NO INSTALADO")

try:
    import sqlalchemy
    print(f"   ✅ sqlalchemy: {sqlalchemy.__version__}")
except:
    print("   ❌ sqlalchemy NO INSTALADO")

# 8. Verificar SECRET_KEY
print("\n8. Seguridad:")
if settings.SECRET_KEY:
    print(f"   ✅ SECRET_KEY configurado")
else:
    print(f"   ❌ SECRET_KEY vacío")

print("\n" + "=" * 60)

# Resumen
if settings.ORACLE_DB_USER and settings.ORACLE_DB_SERVICE_NAME:
    print("✅ CONFIGURACIÓN ORACLE CORRECTA")
    print(f"   Conectará a: {settings.ORACLE_DB_SERVICE_NAME}")
else:
    print("⚠️  USANDO SQLite (Oracle no configurado)")
    print("   Para usar Oracle:")
    print("   1. Edita backend/.env")
    print("   2. Descomenta y configura ORACLE_DB_USER, ORACLE_DB_PASSWORD, ORACLE_DB_SERVICE_NAME")
    print("   3. Asegúrate de que el wallet esté en backend/wallet/")

print("=" * 60)

