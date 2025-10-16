#!/usr/bin/env python3
"""
Script para probar la API del backend
"""
import requests
import json

BASE_URL = "http://localhost:8000"
API_URL = f"{BASE_URL}/api/v1"

def test_root():
    """Probar endpoint raíz"""
    print("1. Probando endpoint raíz...")
    response = requests.get(BASE_URL)
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print()

def test_login():
    """Probar login"""
    print("2. Probando login...")
    
    # Datos de login
    login_data = {
        "username": "admin@mindhealth.com",  # Nota: FastAPI espera 'username'
        "password": "admin123"
    }
    
    # Hacer petición
    response = requests.post(
        f"{API_URL}/auth/login",
        data=login_data,  # Form data, no JSON
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        tokens = response.json()
        print(f"   Access Token: {tokens['access_token'][:50]}...")
        print(f"   Token Type: {tokens['token_type']}")
        return tokens['access_token']
    else:
        print(f"   Error: {response.text}")
        return None

def test_get_current_user(token):
    """Probar obtener usuario actual"""
    print("\n3. Probando obtener usuario actual...")
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(
        f"{API_URL}/auth/me",
        headers=headers
    )
    
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        user = response.json()
        print(f"   Usuario: {user['email']}")
        print(f"   Nombre: {user['full_name']}")
        print(f"   Rol: {user['role']}")
        print(f"   Activo: {user['is_active']}")
    else:
        print(f"   Error: {response.text}")

def test_list_users(token):
    """Probar listar usuarios (solo admin)"""
    print("\n4. Probando listar usuarios...")
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(
        f"{API_URL}/users/",
        headers=headers
    )
    
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"   Total usuarios: {len(users)}")
        for user in users:
            print(f"   - {user['email']} ({user['role']})")
    else:
        print(f"   Error: {response.text}")

def main():
    print("=== Probando Backend de MindHealth Analytics ===\n")
    
    # Probar endpoint raíz
    test_root()
    
    # Probar login
    token = test_login()
    
    if token:
        # Probar endpoints autenticados
        test_get_current_user(token)
        test_list_users(token)
    
    print("\n=== Pruebas completadas ===")

if __name__ == "__main__":
    main()
