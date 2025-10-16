"""
User Pydantic schemas
"""
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.VIEWER
    is_active: bool = True


class UserCreate(UserBase):
    """Schema for creating a user"""
    password: str


class UserUpdate(UserBase):
    """Schema for updating a user"""
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserInDBBase(UserBase):
    """Base schema for user in database"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class User(UserInDBBase):
    """Schema for user response"""
    pass


class UserInDB(UserInDBBase):
    """Schema for user in database with password"""
    hashed_password: str


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str
