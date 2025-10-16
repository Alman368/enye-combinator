"""
Oracle Database Connection Service
"""
import oracledb
from typing import Optional, List, Dict, Any
from app.core.config import settings


class OracleService:
    """Service for Oracle database operations"""
    
    def __init__(self):
        self.connection: Optional[oracledb.Connection] = None
    
    def connect(self):
        """Establish connection to Oracle Autonomous Database with Wallet"""
        try:
            import os
            
            # Get wallet directory path (relative to this file)
            current_dir = os.path.dirname(os.path.abspath(__file__))
            wallet_location = os.path.join(current_dir, "..", "..", "wallet")
            wallet_location = os.path.abspath(wallet_location)
            
            print(f"🔌 Connecting to Oracle...")
            print(f"   Wallet: {wallet_location}")
            print(f"   User: {settings.ORACLE_DB_USER}")
            print(f"   TNS Alias: {settings.ORACLE_DB_SERVICE_NAME}")
            
            # Use the TNS alias from tnsnames.ora
            # python-oracledb will read tnsnames.ora from config_dir
            self.connection = oracledb.connect(
                user=settings.ORACLE_DB_USER,
                password=settings.ORACLE_DB_PASSWORD,
                dsn=settings.ORACLE_DB_SERVICE_NAME,  # TNS alias like "tke06ubevj4zkl7h_high"
                config_dir=wallet_location  # Wallet directory with tnsnames.ora and cwallet.sso
            )
            
            print("✅ Connected to Oracle successfully!")
            return self.connection
            
        except Exception as e:
            print(f"❌ Error: {e}")
            # Try alternative connection methods
            print(f"\n⚠️  If connection fails, possible causes:")
            print(f"   1. Database may be stopped/paused in Oracle Cloud")
            print(f"   2. IP address may not be whitelisted")
            print(f"   3. User credentials may be incorrect")
            print(f"   4. Try different service level: _low, _medium, or _tp instead of _high")
            raise
    
    def disconnect(self):
        """Close Oracle database connection"""
        if self.connection:
            self.connection.close()
            self.connection = None
    
    def execute_query(
        self, 
        query: str, 
        params: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Execute a SELECT query and return results as list of dicts
        """
        if not self.connection:
            self.connect()
        
        try:
            cursor = self.connection.cursor()
            
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            # Get column names
            columns = [col[0] for col in cursor.description]
            
            # Fetch all rows and convert to list of dicts
            rows = cursor.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            
            cursor.close()
            return result
            
        except Exception as e:
            print(f"Error executing query: {e}")
            raise
    
    def get_table_info(self, table_name: str) -> List[Dict[str, Any]]:
        """Get information about table columns"""
        query = """
            SELECT column_name, data_type, data_length, nullable
            FROM user_tab_columns
            WHERE table_name = :table_name
            ORDER BY column_id
        """
        return self.execute_query(query, {"table_name": table_name.upper()})
    
    def get_all_tables(self) -> List[str]:
        """Get list of all tables in the schema"""
        query = "SELECT table_name FROM user_tables ORDER BY table_name"
        result = self.execute_query(query)
        return [row['TABLE_NAME'] for row in result]


# Global Oracle service instance
oracle_service = OracleService()
