
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from '../types/global';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized();
        }
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    // Implement token retrieval logic
    return null;
  }

  private handleUnauthorized() {
    // Implement logout logic
    console.log('Unauthorized access - redirecting to login');
  }

  private formatError(error: AxiosError): ApiResponse<null> {
    return {
      success: false,
      data: null,
      error: error.response?.data?.message || error.message || 'Unknown error occurred',
    };
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }
}

export const apiClient = new ApiClient();
