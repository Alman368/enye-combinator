"""
Disease Data Endpoints
"""
from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from app.api import deps
from app.models.user import User
from app.db.oracle_connection import oracle_service
from app.schemas.disease import (
    DiseaseDataResponse,
    TablesListResponse,
    TableInfo
)

router = APIRouter()


@router.get("/tables", response_model=TablesListResponse)
def get_available_tables(
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get list of all available tables in the Oracle database
    
    - **Requires authentication**
    - Returns list of table names
    """
    try:
        tables = oracle_service.get_all_tables()
        return {"tables": tables}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching tables: {str(e)}"
        )


@router.get("/tables/{table_name}/info", response_model=TableInfo)
def get_table_info(
    table_name: str,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get information about a specific table (columns, data types, etc.)
    
    - **table_name**: Name of the table
    - **Requires authentication**
    """
    try:
        columns = oracle_service.get_table_info(table_name)
        if not columns:
            raise HTTPException(
                status_code=404,
                detail=f"Table '{table_name}' not found"
            )
        return {
            "table_name": table_name,
            "columns": columns
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching table info: {str(e)}"
        )


@router.get("/data", response_model=DiseaseDataResponse)
def get_disease_data(
    table_name: str = Query(..., description="Name of the table to query"),
    limit: int = Query(10, ge=1, le=1000, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get disease/health data from Oracle database with pagination
    
    - **table_name**: Name of the table to query
    - **limit**: Number of records to return (max 1000)
    - **offset**: Number of records to skip (for pagination)
    - **Requires authentication**
    
    Example:
    ```
    GET /api/v1/diseases/data?table_name=PATIENTS&limit=20&offset=0
    ```
    """
    try:
        # Sanitize table name to prevent SQL injection
        safe_table_name = table_name.upper().replace(";", "").replace("--", "")
        
        # Build query with pagination
        query = f"""
            SELECT *
            FROM {safe_table_name}
            OFFSET :offset ROWS
            FETCH NEXT :limit ROWS ONLY
        """
        
        # Execute query
        data = oracle_service.execute_query(
            query,
            {"offset": offset, "limit": limit}
        )
        
        # Get total count
        count_query = f"SELECT COUNT(*) as total FROM {safe_table_name}"
        count_result = oracle_service.execute_query(count_query)
        total = count_result[0]['TOTAL'] if count_result else 0
        
        return {
            "total": total,
            "limit": limit,
            "offset": offset,
            "data": data
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching data: {str(e)}"
        )


@router.get("/data/{table_name}", response_model=DiseaseDataResponse)
def get_disease_data_by_table(
    table_name: str,
    limit: int = Query(10, ge=1, le=1000, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get disease/health data from a specific table (alternative endpoint)
    
    - **table_name**: Name of the table (in path)
    - **limit**: Number of records to return (max 1000)
    - **offset**: Number of records to skip
    - **Requires authentication**
    
    Example:
    ```
    GET /api/v1/diseases/data/PATIENTS?limit=20&offset=0
    ```
    """
    return get_disease_data(
        table_name=table_name,
        limit=limit,
        offset=offset,
        current_user=current_user
    )
