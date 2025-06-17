
import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiResponse } from '../types/global';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  options?: {
    immediate?: boolean;
    retryCount?: number;
    retryDelay?: number;
  }
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  
  const { immediate = true, retryCount = 3, retryDelay = 1000 } = options || {};

  const fetchData = useCallback(async (isRetry = false) => {
    // Cancelar requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    if (!isRetry) {
      setLoading(true);
      setError(null);
      retryCountRef.current = 0;
    }
    
    try {
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
        setError(null);
        retryCountRef.current = 0;
      } else {
        const errorMessage = response.error || 'Erro desconhecido';
        
        if (retryCountRef.current < retryCount) {
          retryCountRef.current++;
          setTimeout(() => {
            fetchData(true);
          }, retryDelay * retryCountRef.current);
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Requisição foi cancelada
      }
      
      const errorMessage = 'Erro de conexão';
      
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData(true);
        }, retryDelay * retryCountRef.current);
      } else {
        setError(errorMessage);
      }
    } finally {
      if (!isRetry) {
        setLoading(false);
      }
    }
  }, dependencies);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refresh: () => fetchData(),
  };
}
