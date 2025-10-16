"""
Authentication response schemas
"""
from pydantic import BaseModel


class LogoutResponse(BaseModel):
    """Logout response schema"""
    message: str
    user: str


class MessageResponse(BaseModel):
    """Generic message response"""
    message: str
