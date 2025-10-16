"""
Database session configuration
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os

def get_database_url():
    """
    Get database URL based on configuration
    If Oracle credentials are configured, use Oracle
    Otherwise, fallback to DATABASE_URL (SQLite/PostgreSQL)
    """
    if settings.ORACLE_DB_USER and settings.ORACLE_DB_SERVICE_NAME:
        # Use Oracle
        current_dir = os.path.dirname(os.path.abspath(__file__))
        wallet_location = os.path.join(current_dir, "..", "..", "wallet")
        wallet_location = os.path.abspath(wallet_location)
        
        connection_string = (
            f"oracle+oracledb://{settings.ORACLE_DB_USER}:{settings.ORACLE_DB_PASSWORD}"
            f"@{settings.ORACLE_DB_SERVICE_NAME}"
            f"?config_dir={wallet_location}"
        )
        
        print(f"🔌 Using Oracle database: {settings.ORACLE_DB_SERVICE_NAME}")
        return connection_string
    else:
        # Use configured DATABASE_URL (SQLite, PostgreSQL, etc.)
        print(f"🔌 Using database: {settings.DATABASE_URL}")
        return settings.DATABASE_URL


# Create database engine
database_url = get_database_url()
engine = create_engine(
    database_url,
    pool_pre_ping=True,
    pool_size=5 if "oracle" in database_url else 10,
    max_overflow=10,
    echo=True if settings.ENVIRONMENT == "development" else False
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
