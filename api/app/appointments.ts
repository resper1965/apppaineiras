import { getAuthContext } from '@/providers/AuthProvider';
import instance from '../api';

// Defina a base do URL e o caminho do serviço
const baseURL = 'https://clubepaineiras.com.br/AliveTeste';
const servicePath = 'Alive.App.Atendimentos/Medico.asmx';

// Defina a interface para os itens de consulta
export interface ConsultaItem {
    IDCONSULTA: number;
    DATA: string;
    HORARIO: string;
    TITULO: string;
    NOME: string;
    ESPECIALISTA: string;
    ESPECIALIDADE: string;
    ICONE: string;
    AVATAR: string;
    CANCELAR: boolean;
    TURMA: string;
    STATUS: string;
    DEPARTAMENTO: string;
    POSICAO: number;
    MATRICULAR: boolean;
    ORDEM: number;
    ERRO: boolean;
    IDERRO: number;
    MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo ConsultaItem
type ListarConsultasResponse = ConsultaItem[];

// Função para listar consultas
export const listarConsultas = async (): Promise<ListarConsultasResponse> => {
    const context = getAuthContext();
    const url = `${baseURL}/${servicePath}/ListarConsultas`;
    const response = await instance.get(url, {
        params: {
            TITULO: context.user,
            CHAVE: context.chave,
        },
    });

    return response.data;
};

// Defina a interface para a resposta de exibir consulta
export interface ExibirConsultaResponse {
    DATA: string;
    HORARIO: string;
    TITULO: string;
    NOME: string;
    ESPECIALISTA: string;
    ESPECIALIDADE: string;
    VALOR: number;
    CANCELAR: boolean;
    ERRO: boolean;
    IDERRO: number;
    MSG_ERRO: string;
}
type ExibirConsultaResponseArr = ExibirConsultaResponse[];

// Função para exibir consulta
export const exibirConsulta = async (IDCONSULTA: number): Promise<ExibirConsultaResponseArr> => {
    const context = getAuthContext();
    const url = `${baseURL}/${servicePath}/ExibirConsulta`;
    const response = await instance.get(url, {
        params: {
            IDCONSULTA,
            CHAVE: context.chave,
        },
    });

    return response.data;
};

// Defina a interface para a resposta de cancelar consulta
export interface CancelarConsultaResponse {
    PERMITIR_LIGACAO: boolean;
    TELEFONE: string;
    ERRO: boolean;
    IDERRO: number;
    MSG_ERRO: string;
}
type CancelarConsultaResponseArr = CancelarConsultaResponse[];

// Função para cancelar consulta
export const cancelarConsulta = async (IDCONSULTA: number): Promise<CancelarConsultaResponseArr> => {
    const context = getAuthContext();
    const url = `${baseURL}/${servicePath}/Cancelar`;
    const response = await instance.get(url, {
        params: {
            IDCONSULTA,
            CHAVE: context.chave,
        },
    });

    return response.data;
};

// Defina a interface para os itens de exame
export interface ExameItem {
    TITULO: string;
    NOME: string;
    DTEXAME: string;
    DTVALIDADE: string;
    SITUACAO: string;
    STATUS: number;
    IDEXAMES: number;
    IDADE: number;
    ORDEM: number;
    ERRO: boolean;
    IDERRO: number;
    MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo ExameItem
type ListarExamesResponse = ExameItem[];

// Função para listar exames
export const listarExames = async (): Promise<ListarExamesResponse> => {
    const context = getAuthContext();
    const url = `${baseURL}/${servicePath}/ListarExames`;
    const response = await instance.get(url, {
        params: {
            TITULO: context.user,
            CHAVE: context.chave,
        },
    });

    return response.data;
};

// Defina a interface para os itens de histórico de exames
export interface HistoricoExameItem {
    IDEXAMES: number;
    DTEXAME: string;
    DIAGNOSTICO: string;
    ESPECIALISTA: string;
    VALOR: string;
    PAGO: boolean;
    STATUS: number;
    ORDEM: number;
    ERRO: boolean;
    IDERRO: number;
    MSG_ERRO: string;
}

// A resposta é um array de objetos do tipo HistoricoExameItem
type ListarHistoricoExamesResponse = HistoricoExameItem[];

// Função para listar histórico de exames
export const listarHistoricoExames = async (TITULO: string): Promise<ListarHistoricoExamesResponse> => {
    const context = getAuthContext();
    const url = `${baseURL}/${servicePath}/ListarHistoricoExames`;
    const response = await instance.get(url, {
        params: {
            TITULO: TITULO,
            CHAVE: context.chave,
        },
    });

    return response.data;
};