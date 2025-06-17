import { getLogout } from '@/providers/AuthProvider';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Códigos de cores ANSI
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    // Cores de texto
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    // Cores de fundo
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
};

// Função para criar logs coloridos
const logColor = (color: string, message: string, data?: any) => {
    console.log(`${color}%s${colors.reset}`, message);
    if (data) {
        console.log(JSON.stringify(data, null, 2));
    }
};

// Cria uma instância do Axios
const instance: AxiosInstance = axios.create();

// Interceptor de requisição
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    logColor(colors.blue, `[Request] ${config.method?.toUpperCase()} ${config.url}`);
    if (config.headers) {
        logColor(colors.blue, 'Headers:', config.headers);
    }
    if (config.params) {
        logColor(colors.blue, 'Body:', config.params);
    }
    return config;
}, (error: AxiosError) => {
    logColor(colors.red, `[Request Error] ${error.message}`);
    return Promise.reject(error);
});

// Interceptor de resposta
instance.interceptors.response.use((response: AxiosResponse) => {
    logColor(colors.green, `[Response] ${response.status} ${response.statusText}`);
    logColor(colors.green, 'Data:', response.data);
    if (response.data[0]?.IDERRO === 114) {
        const logout = getLogout();
        logout();
    }
    return response;
}, (error: AxiosError) => {
    if (error.response) {
        logColor(colors.red, `[Response Error] ${error.response.status} ${error.response.statusText}`);
        logColor(colors.red, 'Data:', error.response.data);
    } else {
        logColor(colors.red, `[Response Error] ${error.message}`);
    }
    return Promise.reject(error);
});

// Exporta a instância do Axios
export default instance;