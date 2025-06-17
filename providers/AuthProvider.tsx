import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from 'expo-device';
import axios from "axios";
import { router } from 'expo-router';
import { logoff } from "@/api/app/auth";

export interface AuthContextType {
  user: any;
  setTitulo: (user: any) => void;
  chave: string;
  setChave: (chave: string) => void;
  nome: string;
  setNome: (chave: string) => void;
  ip: string;
  device: string;
  appVersion: string;
  osVersion: string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
let globalAuthContext: AuthContextType | null = null; // Variável global
let globalLogout: (() => void) | null = null; // Variável global para logout

export const getAuthContext = () => {
  if (!globalAuthContext) {
    throw new Error("AuthContext ainda não foi inicializado.");
  }
  return globalAuthContext;
};

export const getLogout = () => {
  if (!globalLogout) {
    throw new Error("Logout function ainda não foi inicializada.");
  }
  return globalLogout;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setTitulo] = useState<any>(null);
  const [nome, setNome] = useState<any>(null);
  const [chave, setChave] = useState<any>(null);
  const [ip, setIp] = useState<string>("");
  const [device, setDevice] = useState<string>(Device.modelName || "Desconhecido");
  const [appVersion, setAppVersion] = useState<string>(process.env.EXPO_PUBLIC_APP_VERSION || "Desconhecido");
  const [osVersion, setOsVersion] = useState<string>(Platform.Version.toString());

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://checkip.amazonaws.com/");
        setIp(response.data.trim());
      } catch (error) {
        console.error("Erro ao buscar o IP:", error);
      }
    };

    fetchIp();
  }, []);

  const logout = () => {
    setTitulo(undefined);
    setChave("");
    logoff(chave);
    router.navigate("/");
  };

  globalLogout = logout; // Armazena a função logout globalmente

  const contextValue = {
    user,
    setTitulo,
    nome,
    setNome,
    chave,
    setChave,
    ip,
    device,
    appVersion,
    osVersion,
    logout,
  };

  globalAuthContext = contextValue; // Armazena globalmente

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};