"""
Initialize database with tables and sample data
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

from sqlalchemy import create_engine
from app.core.config import settings
from app.core.security import auth_service
from app.db.base_class import Base
from app.db.session import SessionLocal
from app.models.user import User, UserRole

# Import all models to ensure they're registered
from app.models import *


def init_db():
    """Initialize database with tables and sample users"""
    
    # Create engine
    engine = create_engine(settings.DATABASE_URL)
    
    # Create all tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")
    
    # Create sample users
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_users = db.query(User).count()
        
        if existing_users == 0:
            print("\nCreating sample users...")
            
            # Admin user
            admin = User(
                email="admin@mindhealth.com",
                hashed_password=auth_service.get_password_hash("admin123"),
                full_name="Admin User",
                role=UserRole.ADMIN,
                is_active=True,
                is_superuser=True
            )
            db.add(admin)
            
            # Researcher user
            researcher = User(
                email="researcher@hospital.com",
                hashed_password=auth_service.get_password_hash("researcher123"),
                full_name="Research Analyst",
                role=UserRole.RESEARCHER,
                is_active=True,
                is_superuser=False
            )
            db.add(researcher)
            
            # Viewer user
            viewer = User(
                email="viewer@hospital.com",
                hashed_password=auth_service.get_password_hash("viewer123"),
                full_name="Data Viewer",
                role=UserRole.VIEWER,
                is_active=True,
                is_superuser=False
            )
            db.add(viewer)
            
            # Test user (inactive)
            test_user = User(
                email="test@hospital.com",
                hashed_password=auth_service.get_password_hash("test123"),
                full_name="Test User",
                role=UserRole.VIEWER,
                is_active=False,
                is_superuser=False
            )
            db.add(test_user)
            
            db.commit()
            
            print("\nSample users created:")
            print("  - admin@mindhealth.com / admin123 (Admin)")
            print("  - researcher@hospital.com / researcher123 (Researcher)")
            print("  - viewer@hospital.com / viewer123 (Viewer)")
            print("  - test@hospital.com / test123 (Inactive)")
            
        else:
            print(f"\nDatabase already contains {existing_users} users. Skipping user creation.")
            
    except Exception as e:
        print(f"\nError creating users: {e}")
        db.rollback()
    finally:
        db.close()
    
    print("\nDatabase initialization completed!")


if __name__ == "__main__":
    init_db()
