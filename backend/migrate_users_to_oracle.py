"""
Migrate users from SQLite to Oracle
This script reads users from SQLite and creates them in Oracle
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

import oracledb
import sqlite3
from datetime import datetime
from app.core.config import settings
import os

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


def connect_sqlite():
    """Connect to SQLite database"""
    db_path = os.path.join(os.path.dirname(__file__), "mindhealth.db")
    if not os.path.exists(db_path):
        print(f"❌ SQLite database not found at: {db_path}")
        return None
    
    print(f"📂 Connecting to SQLite: {db_path}")
    return sqlite3.connect(db_path)


def create_users_table_oracle(oracle_conn):
    """Create users table in Oracle"""
    cursor = oracle_conn.cursor()
    
    print("\n📋 Creating users table in Oracle...")
    
    # Drop existing table if exists (optional - be careful in production!)
    try:
        cursor.execute("DROP SEQUENCE users_seq")
        print("   Dropped existing sequence")
    except:
        pass
    
    try:
        cursor.execute("DROP TABLE users CASCADE CONSTRAINTS")
        print("   Dropped existing table")
    except:
        pass
    
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
    
    oracle_conn.commit()
    print("✅ Users table created successfully in Oracle!")


def migrate_users(sqlite_conn, oracle_conn):
    """Migrate users from SQLite to Oracle"""
    print("\n👥 Migrating users...")
    
    # Read users from SQLite
    sqlite_cursor = sqlite_conn.cursor()
    sqlite_cursor.execute("""
        SELECT id, email, hashed_password, full_name, role, 
               is_active, is_superuser, created_at, updated_at
        FROM users
    """)
    
    users = sqlite_cursor.fetchall()
    print(f"   Found {len(users)} users in SQLite")
    
    # Insert users into Oracle
    oracle_cursor = oracle_conn.cursor()
    
    for user in users:
        id, email, hashed_password, full_name, role, is_active, is_superuser, created_at, updated_at = user
        
        # Convert role to uppercase (Oracle enum format)
        role = role.upper() if role else 'VIEWER'
        
        try:
            oracle_cursor.execute("""
                INSERT INTO users 
                (id, email, hashed_password, full_name, role, is_active, is_superuser, created_at, updated_at)
                VALUES 
                (:1, :2, :3, :4, :5, :6, :7, TO_TIMESTAMP(:8, 'YYYY-MM-DD HH24:MI:SS'), 
                 CASE WHEN :9 IS NOT NULL THEN TO_TIMESTAMP(:9, 'YYYY-MM-DD HH24:MI:SS') ELSE NULL END)
            """, (id, email, hashed_password, full_name, role, is_active, is_superuser, created_at, updated_at))
            
            print(f"   ✓ Migrated: {email} ({role})")
            
        except Exception as e:
            print(f"   ✗ Error migrating {email}: {e}")
    
    oracle_conn.commit()
    print(f"✅ Migration completed!")


def verify_migration(oracle_conn):
    """Verify users were migrated correctly"""
    print("\n🔍 Verifying migration...")
    
    cursor = oracle_conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    print(f"   Total users in Oracle: {count}")
    
    cursor.execute("""
        SELECT email, role, is_active, is_superuser 
        FROM users 
        ORDER BY id
    """)
    
    print("\n   Users in Oracle:")
    for row in cursor.fetchall():
        email, role, is_active, is_superuser = row
        status = "Active" if is_active else "Inactive"
        super_flag = " (Superuser)" if is_superuser else ""
        print(f"   - {email:30} | {role:12} | {status:8}{super_flag}")
    
    print("\n✅ Verification complete!")


def main():
    """Main migration process"""
    print("=" * 70)
    print("🔄 MIGRATING USERS FROM SQLite TO ORACLE")
    print("=" * 70)
    
    # Connect to databases
    sqlite_conn = connect_sqlite()
    if not sqlite_conn:
        print("❌ Cannot proceed without SQLite database")
        return
    
    try:
        oracle_conn = connect_oracle()
    except Exception as e:
        print(f"❌ Error connecting to Oracle: {e}")
        return
    
    try:
        # Step 1: Create users table in Oracle
        create_users_table_oracle(oracle_conn)
        
        # Step 2: Migrate users
        migrate_users(sqlite_conn, oracle_conn)
        
        # Step 3: Verify migration
        verify_migration(oracle_conn)
        
        print("\n" + "=" * 70)
        print("✅ MIGRATION COMPLETED SUCCESSFULLY!")
        print("=" * 70)
        print("\n📝 Next steps:")
        print("   1. Update .env file to use Oracle as DATABASE_URL")
        print("   2. Test login with migrated users")
        print("   3. Backup SQLite database (mindhealth.db)")
        print("\n🔑 Test credentials:")
        print("   - admin@mindhealth.com / admin123")
        print("   - researcher@hospital.com / researcher123")
        print("   - viewer@hospital.com / viewer123")
        
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        sqlite_conn.close()
        oracle_conn.close()


if __name__ == "__main__":
    main()


