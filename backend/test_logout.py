#!/usr/bin/env python3
"""
Script para probar el endpoint de logout
"""
import requests
import json

BASE_URL = "http://localhost:8000"
API_URL = f"{BASE_URL}/api/v1"

def main():
    print("=== Probando Logout Endpoint ===\n")
    
    # 1. Login primero
    print("1. Haciendo login...")
    login_data = {
        "username": "admin@mindhealth.com",
        "password": "admin123"
    }
    
    response = requests.post(
        f"{API_URL}/auth/login",
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    if response.status_code == 200:
        tokens = response.json()
        access_token = tokens['access_token']
        print(f"   ✅ Login exitoso")
        print(f"   Token: {access_token[:30]}...\n")
    else:
        print(f"   ❌ Error en login: {response.text}")
        return
    
    # 2. Verificar usuario actual
    print("2. Verificando usuario actual...")
    headers = {"Authorization": f"Bearer {access_token}"}
    
    response = requests.get(f"{API_URL}/auth/me", headers=headers)
    if response.status_code == 200:
        user = response.json()
        print(f"   ✅ Usuario: {user['email']}")
        print(f"   Rol: {user['role']}\n")
    
    # 3. Hacer logout
    print("3. Haciendo logout...")
    response = requests.post(f"{API_URL}/auth/logout", headers=headers)
    
    if response.status_code == 200:
        logout_data = response.json()
        print(f"   ✅ {logout_data['message']}")
        print(f"   Usuario: {logout_data['user']}\n")
    else:
        print(f"   ❌ Error en logout: {response.text}\n")
    
    # 4. Intentar usar el token después del logout (debería seguir funcionando)
    print("4. Intentando usar el token después del logout...")
    print("   (Nota: JWT no se invalida server-side por defecto)")
    response = requests.get(f"{API_URL}/auth/me", headers=headers)
    
    if response.status_code == 200:
        user = response.json()
        print(f"   ⚠️  Token aún válido: {user['email']}")
        print(f"   (En producción, usar blacklist con Redis)\n")
    else:
        print(f"   Token invalidado\n")
    
    # 5. Intentar logout sin token
    print("5. Intentando logout sin autenticación...")
    response = requests.post(f"{API_URL}/auth/logout")
    
    if response.status_code == 401:
        print(f"   ✅ Correctamente rechazado (401 Unauthorized)\n")
    else:
        print(f"   ❌ No requiere autenticación (error de seguridad)\n")
    
    print("=== Pruebas completadas ===")

if __name__ == "__main__":
    main()
