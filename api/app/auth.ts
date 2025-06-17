import { AuthContextType, getAuthContext } from '@/providers/AuthProvider';
import instance from '../api';
import { AxiosResponse } from 'axios';

// Defina a base do URL e o caminho do serviço
const baseURL = 'https://clubepaineiras.com.br/AliveTeste';
const servicePath = 'Alive.App/Acesso.asmx';

// Defina a interface para os parâmetros da API
interface AutenticarParams {
  TITULO: string;
  SENHA: string;
}

interface AutenticarResponseItem {
  ALTERAR_SENHA: boolean;
  CHAVE: string;
  USERKEY: string;
  LINK: string;
  IDTOKEN: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo AutenticarResponseItem
type AutenticarResponse = AutenticarResponseItem[];

// Função para autenticar
export const autenticar = async (params: AutenticarParams): Promise<AxiosResponse<AutenticarResponse>> => {
  const context = getAuthContext();
  const url = `${baseURL}/${servicePath}/Autenticar`;
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      SENHA: params.SENHA,
      IP: context.ip,
      BROWSER: " ",
      TOKEN: process.env.EXPO_PUBLIC_TOKEN || 'Desconhecido',
      DISPOSITIVO: context.device,
      VERSAO_APP: context.appVersion,
      VERSAO_OS: context.osVersion,
    },
  });
  context.setTitulo(params.TITULO);
  context.setChave(response.data[0].CHAVE);

  return response;
};

// Defina a interface para a resposta da API de Logoff
interface LogoffResponseItem {
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo LogoffResponseItem
type LogoffResponse = LogoffResponseItem[];

// Função para fazer o Logoff
export const logoff = async (chave: string): Promise<AxiosResponse<LogoffResponse>> => {
  const url = `${baseURL}/${servicePath}/Logoff`;

  // Faz a requisição GET para o endpoint de Logoff
  const response = await instance.get(url, {
    params: {
      CHAVE: chave, // CHAVE obtida do contexto
    },
  });

  return response;
};

// Defina a interface para a resposta da API de Validar
interface ValidarResponseItem {
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

interface ValidarParams {
  SENHA: string;
}

// A resposta é um array de objetos do tipo ValidarResponseItem
type ValidarResponse = ValidarResponseItem[];

// Função para validar
export const validar = async (params: ValidarParams): Promise<AxiosResponse<ValidarResponse>> => {
  const context = getAuthContext();
  const url = `${baseURL}/${servicePath}/Validar`;
  const response = await instance.get(url, {
    params: {
      TITULO: context.user,
      SENHA: params.SENHA,
      CHAVE: context.chave,
    },
  });

  if (response.data[0].ERRO) {
    throw new Error(response.data[0].MSG); // Lança um erro

  }

  return response;
};

// Defina a interface para os itens de aviso
interface AvisoItem {
  IDAVISO: number;
  DATA: string;
  ASSUNTO: string;
  DESCRICAO: string;
  IDSERVICO: number;
  LEITURA: boolean;
  ORDEM: number;
  EXIBIR_LINK: boolean;
  LINK_ARQUIVO: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo AvisoItem
type ListarAvisosResponse = AvisoItem[];

// Função para listar avisos
export const listarAvisos = async (): Promise<ListarAvisosResponse> => {
  const url = `${baseURL}/${servicePath}/ListarAvisos`;
  const context = getAuthContext();
  // Faz a requisição GET para o endpoint de ListarAvisos
  const response = await instance.get(url, {
    params: {
      TITULO: context.user,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

// Defina a interface para a resposta da API de ExibirPerfil
interface ExibirPerfilResponseItem {
  NOME: string;
  ID_PAGINA_INICIAL: number;
  AGENDAR_CONSULTA: boolean;
  EMITIR_INGRESSO: boolean;
  EXIBIR_ANUNCIO: boolean;
  EXIBIR_FOTO: boolean;
  EXIBIR_CAPA: boolean;
  TOTAL_DOCUMENTOS: number;
  ATUALIZAR_SERVICO: boolean;
  VALIDAR_SENHA: boolean;
  AVISAR_PUSH: boolean;
  MSG_AVISO_PUSH: string;
  TOTAL_ACESSOS: number;
  ULTIMO_ACESSO: string;
  EXIBIR_AVISOS: boolean;
  TOTAL_AVISOS: number;
  TITULARIDADE: boolean;
  FATURA_DIGITAL: boolean;
  HABILITAR_BIOMETRIA: boolean;
  ATUALIZAR_CAPA: string;
  ATUALIZAR_FOTO: string;
  TOTAL_PUSH: number;
  REMOVER_CAPA: boolean;
  EXIBIR_AGENDA: boolean;
  TERMO_CONECTA: boolean;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo ExibirPerfilResponseItem
type ExibirPerfilResponse = ExibirPerfilResponseItem[];

// Função para exibir perfil
export const exibirPerfil = async (): Promise<ExibirPerfilResponse> => {
  const context = getAuthContext();
  const url = `${baseURL}/${servicePath}/ExibirPerfil`;
  const response = await instance.get(url, {
    params: {
      TITULO: context.user,
      CHAVE: context.chave,
    },
  });

  context.setNome(response.data[0].NOME);

  return response.data;
};

// Defina a interface para os parâmetros da API de Resetar
interface ResetarParams {
  EMAIL: string;
}

// Defina a interface para a resposta da API de Resetar
interface ResetarResponseItem {
  TITULO: string;
  SENHA: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo ResetarResponseItem
type ResetarResponse = ResetarResponseItem[];

// Função para resetar senha
export const resetar = async (params: ResetarParams): Promise<ResetarResponse> => {
  const url = `${baseURL}/${servicePath}/Resetar`;
  const response = await instance.get(url, {
    params: {
      EMAIL: params.EMAIL,
    },
  });

  return response.data;
};