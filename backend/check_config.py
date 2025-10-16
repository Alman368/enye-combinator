#!/usr/bin/env python3
"""
Verificar la configuración del backend
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

from app.core.config import settings

print("=== Configuración del Backend ===\n")
print(f"DATABASE_URL: {settings.DATABASE_URL}")
print(f"SECRET_KEY: {settings.SECRET_KEY[:20]}...")
print(f"API_V1_STR: {settings.API_V1_STR}")
print(f"PROJECT_NAME: {settings.PROJECT_NAME}")
print(f"\nCORS Origins:")
for origin in settings.BACKEND_CORS_ORIGINS:
    print(f"  - {origin}")
print(f"\nEnvironment: {settings.ENVIRONMENT}")

