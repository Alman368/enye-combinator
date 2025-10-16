"""
Disease/Health Data Schemas
"""
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field


class DiseaseRecord(BaseModel):
    """Schema for a single disease/health record"""
    # This will be flexible to accommodate any fields from Oracle
    # We'll use a generic approach since we don't know the exact schema yet
    pass


class DiseaseQueryParams(BaseModel):
    """Query parameters for disease data"""
    limit: int = Field(default=10, ge=1, le=1000, description="Number of records to return")
    offset: int = Field(default=0, ge=0, description="Number of records to skip")
    table_name: Optional[str] = Field(default=None, description="Specific table to query")


class DiseaseDataResponse(BaseModel):
    """Response model for disease data"""
    total: int = Field(description="Total number of records available")
    limit: int = Field(description="Number of records returned")
    offset: int = Field(description="Number of records skipped")
    data: List[Dict[str, Any]] = Field(description="The actual data records")
    

class TableInfo(BaseModel):
    """Information about a database table"""
    table_name: str
    columns: List[Dict[str, Any]]


class TablesListResponse(BaseModel):
    """List of available tables"""
    tables: List[str]
