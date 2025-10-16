"""
User model for authentication
"""
from sqlalchemy import Boolean, Column, Integer, String, DateTime, Enum as SQLEnum, SmallInteger
from sqlalchemy.sql import func
import enum
from app.db.base_class import Base


class UserRole(str, enum.Enum):
    """User roles in the system"""
    ADMIN = "ADMIN"
    RESEARCHER = "RESEARCHER"
    VIEWER = "VIEWER"


class User(Base):
    """User model for authentication and authorization"""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(String(20), default='VIEWER', nullable=False)  # Store as string for Oracle compatibility
    is_active = Column(SmallInteger, default=1)  # Oracle uses NUMBER instead of BOOLEAN
    is_superuser = Column(SmallInteger, default=0)  # Oracle uses NUMBER instead of BOOLEAN
    created_at = Column(DateTime, server_default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())
    
    def __repr__(self):
        return f"<User(email='{self.email}', role='{self.role}')>"
    
    @property
    def role_enum(self) -> UserRole:
        """Get role as enum"""
        try:
            return UserRole(self.role)
        except ValueError:
            return UserRole.VIEWER
