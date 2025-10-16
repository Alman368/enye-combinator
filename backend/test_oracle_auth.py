"""
Test Oracle authentication
Verifies that login and authentication work with Oracle database
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

import requests
import json
from app.core.config import settings

BASE_URL = "http://localhost:8000"
API_V1 = f"{BASE_URL}/api/v1"

def test_login(email, password):
    """Test login with credentials"""
    print(f"\n🔐 Testing login: {email}")
    
    response = requests.post(
        f"{API_V1}/auth/login",
        data={
            "username": email,
            "password": password
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✅ Login successful!")
        print(f"   Access token: {data['access_token'][:50]}...")
        print(f"   Refresh token: {data['refresh_token'][:50]}...")
        return data['access_token']
    else:
        print(f"   ❌ Login failed: {response.status_code}")
        print(f"   {response.text}")
        return None


def test_get_current_user(token):
    """Test getting current user info"""
    print(f"\n👤 Testing /auth/me endpoint...")
    
    response = requests.get(
        f"{API_V1}/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code == 200:
        user = response.json()
        print(f"   ✅ User info retrieved:")
        print(f"   Email: {user['email']}")
        print(f"   Full name: {user['full_name']}")
        print(f"   Role: {user['role']}")
        print(f"   Active: {user['is_active']}")
        print(f"   Superuser: {user['is_superuser']}")
        return user
    else:
        print(f"   ❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return None


def test_protected_endpoint(token):
    """Test a protected endpoint (diseases tables)"""
    print(f"\n🔒 Testing protected endpoint (/diseases/tables)...")
    
    response = requests.get(
        f"{API_V1}/diseases/tables",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code == 200:
        data = response.json()
        tables = data.get('tables', [])
        print(f"   ✅ Protected endpoint accessible!")
        print(f"   Found {len(tables)} tables")
        if tables:
            print(f"   First 3 tables: {tables[:3]}")
        return True
    else:
        print(f"   ❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_invalid_credentials():
    """Test login with invalid credentials"""
    print(f"\n🚫 Testing invalid credentials...")
    
    response = requests.post(
        f"{API_V1}/auth/login",
        data={
            "username": "invalid@email.com",
            "password": "wrongpassword"
        }
    )
    
    if response.status_code == 401:
        print(f"   ✅ Invalid credentials correctly rejected (401)")
        return True
    else:
        print(f"   ❌ Unexpected response: {response.status_code}")
        return False


def test_refresh_token(refresh_token):
    """Test token refresh"""
    print(f"\n🔄 Testing token refresh...")
    
    response = requests.post(
        f"{API_V1}/auth/refresh",
        json={"refresh_token": refresh_token}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✅ Token refreshed successfully!")
        print(f"   New access token: {data['access_token'][:50]}...")
        return data['access_token']
    else:
        print(f"   ❌ Refresh failed: {response.status_code}")
        print(f"   {response.text}")
        return None


def test_logout(token):
    """Test logout endpoint"""
    print(f"\n🚪 Testing logout...")
    
    response = requests.post(
        f"{API_V1}/auth/logout",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✅ Logout successful!")
        print(f"   Message: {data['message']}")
        return True
    else:
        print(f"   ❌ Logout failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def main():
    """Run all authentication tests"""
    print("=" * 70)
    print("🧪 TESTING ORACLE AUTHENTICATION")
    print("=" * 70)
    print(f"API URL: {API_V1}")
    print(f"Oracle Service: {settings.ORACLE_DB_SERVICE_NAME}")
    
    # Test users
    test_users = [
        ("admin@mindhealth.com", "admin123", "Admin"),
        ("researcher@hospital.com", "researcher123", "Researcher"),
        ("viewer@hospital.com", "viewer123", "Viewer")
    ]
    
    results = []
    
    for email, password, name in test_users:
        print(f"\n{'=' * 70}")
        print(f"Testing {name} user: {email}")
        print(f"{'=' * 70}")
        
        # Test login
        token = test_login(email, password)
        if not token:
            print(f"   ⚠️  Skipping further tests for {name}")
            results.append((name, False))
            continue
        
        # Test getting user info
        user = test_get_current_user(token)
        if not user:
            results.append((name, False))
            continue
        
        # Test protected endpoint
        test_protected_endpoint(token)
        
        # Test logout
        test_logout(token)
        
        results.append((name, True))
    
    # Test invalid credentials
    print(f"\n{'=' * 70}")
    print("Testing Security")
    print(f"{'=' * 70}")
    test_invalid_credentials()
    
    # Test refresh token (using admin)
    print(f"\n{'=' * 70}")
    print("Testing Token Refresh")
    print(f"{'=' * 70}")
    response = requests.post(
        f"{API_V1}/auth/login",
        data={"username": "admin@mindhealth.com", "password": "admin123"}
    )
    if response.status_code == 200:
        tokens = response.json()
        test_refresh_token(tokens['refresh_token'])
    
    # Print summary
    print(f"\n{'=' * 70}")
    print("📊 TEST SUMMARY")
    print(f"{'=' * 70}")
    
    for name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"   {name:15} {status}")
    
    all_passed = all(success for _, success in results)
    
    if all_passed:
        print(f"\n{'=' * 70}")
        print("✅ ALL TESTS PASSED!")
        print(f"{'=' * 70}")
        print("\n🎉 Oracle authentication is working correctly!")
    else:
        print(f"\n{'=' * 70}")
        print("❌ SOME TESTS FAILED")
        print(f"{'=' * 70}")
        print("\n⚠️  Please check the errors above")


if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to API")
        print("   Make sure the backend is running:")
        print("   cd backend && python run_dev.py")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()


