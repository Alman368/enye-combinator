"""
Initialize Oracle database with tables and sample users
This script creates the users table and populates it with sample data
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

import oracledb
import os
from app.core.config import settings
from app.core.security import auth_service

def connect_oracle():
    """Connect to Oracle database"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    wallet_location = os.path.join(current_dir, "wallet")
    wallet_location = os.path.abspath(wallet_location)
    
    print(f"🔌 Connecting to Oracle...")
    print(f"   Wallet: {wallet_location}")
    print(f"   User: {settings.ORACLE_DB_USER}")
    print(f"   TNS Alias: {settings.ORACLE_DB_SERVICE_NAME}")
    
    connection = oracledb.connect(
        user=settings.ORACLE_DB_USER,
        password=settings.ORACLE_DB_PASSWORD,
        dsn=settings.ORACLE_DB_SERVICE_NAME,
        config_dir=wallet_location
    )
    
    print("✅ Connected to Oracle successfully!")
    return connection


def drop_existing_objects(conn):
    """Drop existing users table and sequence"""
    cursor = conn.cursor()
    
    print("\n🗑️  Dropping existing objects (if any)...")
    
    # Drop table
    try:
        cursor.execute("DROP TABLE users CASCADE CONSTRAINTS")
        print("   ✓ Dropped existing users table")
    except:
        print("   - No existing users table to drop")
    
    # Drop sequence
    try:
        cursor.execute("DROP SEQUENCE users_seq")
        print("   ✓ Dropped existing users sequence")
    except:
        print("   - No existing users sequence to drop")


def create_users_table(conn):
    """Create users table and related objects"""
    cursor = conn.cursor()
    
    print("\n📋 Creating users table...")
    
    # Create sequence
    cursor.execute("""
        CREATE SEQUENCE users_seq
        START WITH 1
        INCREMENT BY 1
        NOCACHE
        NOCYCLE
    """)
    print("   ✓ Created sequence")
    
    # Create table
    cursor.execute("""
        CREATE TABLE users (
            id NUMBER(10) PRIMARY KEY,
            email VARCHAR2(255) UNIQUE NOT NULL,
            hashed_password VARCHAR2(255) NOT NULL,
            full_name VARCHAR2(255),
            role VARCHAR2(20) DEFAULT 'VIEWER' NOT NULL,
            is_active NUMBER(1) DEFAULT 1 NOT NULL,
            is_superuser NUMBER(1) DEFAULT 0 NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        )
    """)
    print("   ✓ Created table")
    
    # Create indexes
    cursor.execute("CREATE INDEX idx_users_email ON users(email)")
    cursor.execute("CREATE INDEX idx_users_role ON users(role)")
    cursor.execute("CREATE INDEX idx_users_is_active ON users(is_active)")
    print("   ✓ Created indexes")
    
    # Add constraints
    cursor.execute("""
        ALTER TABLE users ADD CONSTRAINT chk_role 
        CHECK (role IN ('ADMIN', 'RESEARCHER', 'VIEWER'))
    """)
    cursor.execute("""
        ALTER TABLE users ADD CONSTRAINT chk_is_active 
        CHECK (is_active IN (0, 1))
    """)
    cursor.execute("""
        ALTER TABLE users ADD CONSTRAINT chk_is_superuser 
        CHECK (is_superuser IN (0, 1))
    """)
    print("   ✓ Created constraints")
    
    # Create trigger for auto-increment
    cursor.execute("""
        CREATE OR REPLACE TRIGGER users_bir
        BEFORE INSERT ON users
        FOR EACH ROW
        BEGIN
            IF :new.id IS NULL THEN
                SELECT users_seq.NEXTVAL INTO :new.id FROM dual;
            END IF;
        END;
    """)
    print("   ✓ Created auto-increment trigger")
    
    # Create trigger for updated_at
    cursor.execute("""
        CREATE OR REPLACE TRIGGER users_bur
        BEFORE UPDATE ON users
        FOR EACH ROW
        BEGIN
            :new.updated_at := CURRENT_TIMESTAMP;
        END;
    """)
    print("   ✓ Created update timestamp trigger")
    
    conn.commit()
    print("✅ Users table created successfully!")


def create_sample_users(conn):
    """Create sample users"""
    cursor = conn.cursor()
    
    print("\n👥 Creating sample users...")
    
    # Check if users already exist
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    
    if count > 0:
        print(f"   ⚠️  Database already contains {count} users. Skipping user creation.")
        return
    
    users = [
        {
            'email': 'admin@mindhealth.com',
            'password': 'admin123',
            'full_name': 'Admin User',
            'role': 'ADMIN',
            'is_active': 1,
            'is_superuser': 1
        },
        {
            'email': 'researcher@hospital.com',
            'password': 'researcher123',
            'full_name': 'Research Analyst',
            'role': 'RESEARCHER',
            'is_active': 1,
            'is_superuser': 0
        },
        {
            'email': 'viewer@hospital.com',
            'password': 'viewer123',
            'full_name': 'Data Viewer',
            'role': 'VIEWER',
            'is_active': 1,
            'is_superuser': 0
        },
        {
            'email': 'test@hospital.com',
            'password': 'test123',
            'full_name': 'Test User',
            'role': 'VIEWER',
            'is_active': 0,
            'is_superuser': 0
        }
    ]
    
    for user in users:
        hashed_password = auth_service.get_password_hash(user['password'])
        
        cursor.execute("""
            INSERT INTO users 
            (email, hashed_password, full_name, role, is_active, is_superuser)
            VALUES 
            (:email, :hashed_password, :full_name, :role, :is_active, :is_superuser)
        """, {
            'email': user['email'],
            'hashed_password': hashed_password,
            'full_name': user['full_name'],
            'role': user['role'],
            'is_active': user['is_active'],
            'is_superuser': user['is_superuser']
        })
        
        status = "Active" if user['is_active'] else "Inactive"
        print(f"   ✓ Created: {user['email']} ({user['role']}) - {status}")
    
    conn.commit()
    print("✅ Sample users created successfully!")


def verify_installation(conn):
    """Verify the installation"""
    cursor = conn.cursor()
    
    print("\n🔍 Verifying installation...")
    
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    print(f"   Total users: {count}")
    
    cursor.execute("""
        SELECT email, role, is_active, is_superuser 
        FROM users 
        ORDER BY id
    """)
    
    print("\n   Users in database:")
    for row in cursor.fetchall():
        email, role, is_active, is_superuser = row
        status = "Active" if is_active else "Inactive"
        super_flag = " (Superuser)" if is_superuser else ""
        print(f"   - {email:30} | {role:12} | {status:8}{super_flag}")
    
    print("\n✅ Verification complete!")


def main():
    """Main initialization process"""
    print("=" * 70)
    print("🚀 INITIALIZING ORACLE DATABASE FOR AUTHENTICATION")
    print("=" * 70)
    
    try:
        # Connect to Oracle
        conn = connect_oracle()
        
        # Drop existing objects (optional - be careful in production!)
        drop_existing_objects(conn)
        
        # Create users table
        create_users_table(conn)
        
        # Create sample users
        create_sample_users(conn)
        
        # Verify installation
        verify_installation(conn)
        
        print("\n" + "=" * 70)
        print("✅ DATABASE INITIALIZATION COMPLETED!")
        print("=" * 70)
        print("\n🔑 Test credentials:")
        print("   - admin@mindhealth.com / admin123 (Admin)")
        print("   - researcher@hospital.com / researcher123 (Researcher)")
        print("   - viewer@hospital.com / viewer123 (Viewer)")
        print("   - test@hospital.com / test123 (Inactive)")
        
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Initialization failed: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()


