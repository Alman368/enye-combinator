"""
Authentication endpoints
"""
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core.config import settings
from app.core.security import auth_service
from app.models.user import User
from app.schemas.token import Token, RefreshToken
from app.schemas.user import User as UserSchema
from app.schemas.auth import LogoutResponse

router = APIRouter()


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # Authenticate user
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not auth_service.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Create tokens
    access_token = auth_service.create_access_token(subject=user.id)
    refresh_token = auth_service.create_refresh_token(subject=user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=Token)
def refresh_token(
    token_data: RefreshToken,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Refresh access token using refresh token
    """
    # Decode refresh token
    payload = auth_service.decode_token(token_data.refresh_token)
    
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Get user
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new tokens
    access_token = auth_service.create_access_token(subject=user.id)
    refresh_token = auth_service.create_refresh_token(subject=user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserSchema)
def get_current_user(
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get current user
    """
    return current_user


@router.post("/logout", response_model=LogoutResponse)
def logout(
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Logout endpoint
    
    - Requires authentication
    - Logs the logout event
    - Client should remove tokens from storage
    
    Note: In JWT-based auth, actual token invalidation happens client-side.
    For production, consider implementing a token blacklist using Redis.
    """
    # Log the logout event
    print(f"User {current_user.email} (ID: {current_user.id}) logged out")
    
    # TODO: For production, add token to blacklist in Redis/Database
    # blacklist_token(token)
    
    return {
        "message": "Successfully logged out",
        "user": current_user.email
    }
