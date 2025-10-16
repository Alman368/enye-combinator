"""
Oracle Database session configuration using SQLAlchemy
This replaces the SQLite session with Oracle
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os

def get_oracle_connection_string():
    """
    Create Oracle connection string for SQLAlchemy
    Uses Oracle Wallet for connection
    """
    # Get wallet directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    wallet_location = os.path.join(current_dir, "..", "..", "wallet")
    wallet_location = os.path.abspath(wallet_location)
    
    # Oracle connection string format for python-oracledb with SQLAlchemy
    # Format: oracle+oracledb://user:password@hostname:port/?service_name=service&wallet_location=path
    
    # For Oracle Autonomous Database with wallet, use TNS alias
    connection_string = (
        f"oracle+oracledb://{settings.ORACLE_DB_USER}:{settings.ORACLE_DB_PASSWORD}"
        f"@{settings.ORACLE_DB_SERVICE_NAME}"
        f"?config_dir={wallet_location}"
    )
    
    return connection_string


# Create Oracle engine
oracle_connection_string = get_oracle_connection_string()

print(f"🔌 Configuring Oracle SQLAlchemy engine...")
print(f"   Connection: {settings.ORACLE_DB_SERVICE_NAME}")

engine = create_engine(
    oracle_connection_string,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    echo=True if settings.ENVIRONMENT == "development" else False
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

print(f"✅ Oracle engine configured successfully!")


