import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse } from '../../types/global';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
  try {
    // Simular API call - substituir pela implementação real
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email && credentials.password) {
      const user: AuthUser = {
        id: '1',
        email: credentials.email,
        name: 'Usuário',
        token: 'mock_token_' + Date.now(),
      };

      await AsyncStorage.setItem('@auth_token', user.token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(user));

      return {
        success: true,
        data: user,
      };
    }

    return {
      success: false,
      error: 'Credenciais inválidas',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro de conexão',
    };
  }
}

export async function logoutUser(): Promise<ApiResponse<void>> {
  try {
    await AsyncStorage.multiRemove(['@auth_token', '@user_data']);
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao fazer logout',
    };
  }
}

export async function getCurrentUser(): Promise<ApiResponse<AuthUser | null>> {
  try {
    const [token, userData] = await AsyncStorage.multiGet(['@auth_token', '@user_data']);

    if (token[1] && userData[1]) {
      return {
        success: true,
        data: JSON.parse(userData[1]),
      };
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao recuperar usuário',
    };
  }
}