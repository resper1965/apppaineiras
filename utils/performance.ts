
import { InteractionManager, Platform } from 'react-native';

// Debounce function para otimizar chamadas de API
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function para limitar execuções
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Função para executar tarefas após as interações
export function runAfterInteractions(callback: () => void): void {
  InteractionManager.runAfterInteractions(callback);
}

// Configurações específicas por plataforma
export const platformConfig = {
  isWeb: Platform.OS === 'web',
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  
  // Configurações de performance
  maxConcurrentRequests: Platform.OS === 'web' ? 6 : 4,
  debounceDelay: 300,
  throttleLimit: 100,
  
  // Cache settings
  cacheTimeout: 5 * 60 * 1000, // 5 minutos
};

// Image optimization
export const getOptimizedImageProps = (uri: string) => ({
  source: { uri },
  resizeMode: 'cover' as const,
  ...(Platform.OS === 'web' && {
    style: { objectFit: 'cover' as const }
  })
});
