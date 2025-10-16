"""
API v1 router configuration
"""
from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, users, diseases

api_router = APIRouter()

# Include routers
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["authentication"]
)
api_router.include_router(
    users.router,
    prefix="/users",
    tags=["users"]
)
api_router.include_router(
    diseases.router,
    prefix="/diseases",
    tags=["diseases"]
)
