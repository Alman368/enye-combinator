"""
Initialize database with tables and sample data
Works with both SQLite and Oracle
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

from sqlalchemy import create_engine
from app.core.config import settings
from app.core.security import auth_service
from app.db.base_class import Base
from app.db.session import SessionLocal, get_database_url
from app.models.user import User, UserRole

# Import all models to ensure they're registered
from app.models import *


def init_db():
    """Initialize database with tables and sample users"""
    
    # Get database URL (will use Oracle if configured)
    database_url = get_database_url()
    is_oracle = "oracle" in database_url
    
    print("=" * 70)
    print("🚀 INITIALIZING DATABASE")
    print("=" * 70)
    print(f"Database: {'Oracle' if is_oracle else 'SQLite/PostgreSQL'}")
    
    # Create engine
    engine = create_engine(database_url)
    
    # Create all tables
    print("\n📋 Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
    except Exception as e:
        print(f"⚠️  Note: {e}")
        print("   (This is normal if tables already exist)")
    
    # Create sample users
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_users = db.query(User).count()
        
        if existing_users == 0:
            print("\n👥 Creating sample users...")
            
            # Admin user
            admin = User(
                email="admin@mindhealth.com",
                hashed_password=auth_service.get_password_hash("admin123"),
                full_name="Admin User",
                role="ADMIN",  # String for Oracle compatibility
                is_active=1,   # Number for Oracle compatibility
                is_superuser=1
            )
            db.add(admin)
            
            # Researcher user
            researcher = User(
                email="researcher@hospital.com",
                hashed_password=auth_service.get_password_hash("researcher123"),
                full_name="Research Analyst",
                role="RESEARCHER",
                is_active=1,
                is_superuser=0
            )
            db.add(researcher)
            
            # Viewer user
            viewer = User(
                email="viewer@hospital.com",
                hashed_password=auth_service.get_password_hash("viewer123"),
                full_name="Data Viewer",
                role="VIEWER",
                is_active=1,
                is_superuser=0
            )
            db.add(viewer)
            
            # Test user (inactive)
            test_user = User(
                email="test@hospital.com",
                hashed_password=auth_service.get_password_hash("test123"),
                full_name="Test User",
                role="VIEWER",
                is_active=0,
                is_superuser=0
            )
            db.add(test_user)
            
            db.commit()
            
            print("\n✅ Sample users created:")
            print("   - admin@mindhealth.com / admin123 (Admin)")
            print("   - researcher@hospital.com / researcher123 (Researcher)")
            print("   - viewer@hospital.com / viewer123 (Viewer)")
            print("   - test@hospital.com / test123 (Inactive)")
            
        else:
            print(f"\n⚠️  Database already contains {existing_users} users. Skipping user creation.")
            
            # Show existing users
            users = db.query(User).all()
            print("\n📋 Existing users:")
            for user in users:
                status = "Active" if user.is_active else "Inactive"
                print(f"   - {user.email:30} | {user.role:12} | {status}")
            
    except Exception as e:
        print(f"\n❌ Error creating users: {e}")
        db.rollback()
        import traceback
        traceback.print_exc()
    finally:
        db.close()
    
    print("\n" + "=" * 70)
    print("✅ DATABASE INITIALIZATION COMPLETED!")
    print("=" * 70)


if __name__ == "__main__":
    init_db()
