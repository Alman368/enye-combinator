/**
 * Diseases Service
 *
 * Service to fetch health data from Oracle database via backend API
 */

import api from './api';

// Types
export interface TableInfo {
  table_name: string;
  columns: ColumnInfo[];
}

export interface ColumnInfo {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  DATA_LENGTH: number;
  NULLABLE: string;
}

export interface DiseaseDataResponse {
  total: number;
  limit: number;
  offset: number;
  data: Record<string, any>[];
}

export interface TablesListResponse {
  tables: string[];
}

const diseasesService = {
  /**
   * Get list of all available tables in the Oracle database
   */
  getTables: async (): Promise<string[]> => {
    try {
      const response = await api.get<TablesListResponse>('/diseases/tables');
      return response.data.tables;
    } catch (error) {
      console.error('Error fetching tables:', error);
      throw error;
    }
  },

  /**
   * Get information about a specific table (columns, data types, etc.)
   */
  getTableInfo: async (tableName: string): Promise<TableInfo> => {
    try {
      const response = await api.get<TableInfo>(`/diseases/tables/${tableName}/info`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching table info for ${tableName}:`, error);
      throw error;
    }
  },

  /**
   * Get paginated data from a specific table
   */
  getData: async (
    tableName: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<DiseaseDataResponse> => {
    try {
      const response = await api.get<DiseaseDataResponse>('/diseases/data', {
        params: {
          table_name: tableName,
          limit,
          offset,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
    }
  },

  /**
   * Get data from a specific table (alternative endpoint)
   */
  getDataByTable: async (
    tableName: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<DiseaseDataResponse> => {
    try {
      const response = await api.get<DiseaseDataResponse>(`/diseases/data/${tableName}`, {
        params: {
          limit,
          offset,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
    }
  },
};

export default diseasesService;

