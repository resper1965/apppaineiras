import { AuthContextType, getAuthContext } from '@/providers/AuthProvider';
import instance from '../api';
import { AxiosResponse } from 'axios';

// Defina a base do URL e o caminho do serviço
const baseURL = 'https://clubepaineiras.com.br/AliveTeste';
const servicePath = 'Alive.App.Atividades/Atividades.asmx';
const hourServiceParth = 'Alive.App.Atividades/GradeHoraria.asmx';
const waitingActivitiesPath = "Alive.App.Atividades/ListaEspera.asmx";
const canceledServicePath = 'Alive.App.Atividades/Programacao.asmx';

// Defina a interface para os parâmetros da API
interface ListarAssociadosParams {
  TITULO: number;
}

interface AtividadeResponseItem {
  IDATIVIDADE: number;
  TITULO: string;
  NOME: string;
  ATIVIDADE: string;
  TURMA: string;
  STATUS: string;
  DATA: string;
  AVATAR: string;
  DEPARTAMENTO: string;
  HORARIO: string;
  DIAS: string;
  POSICAO: number;
  MATRICULAR: boolean;
  ICONE: string;
  IDAREA: number;
  ORDEM: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type AtividadeResponse = AtividadeResponseItem[];

// Função para listar associados e suas atividades
export const listarAssociados = async (params: ListarAssociadosParams): Promise<AtividadeResponse> => {
  const context = getAuthContext();
  const url = `${baseURL}/${servicePath}/ListarAssociados`;
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

interface ExibirDetalhesParams {
  TITULO: string;
  IDATIVIDADE: number;
  IDTURMA: string;
}

interface DetalheAtividadeResponse {
  ASSOCIADO: string;
  ATIVIDADE: string;
  HORARIO: string;
  DIAS: string;
  PROFESSOR: string;
  LOCAL: string;
  CATEGORIA: string;
  NIVEL: string;
  MATRICULAR: boolean;
  CANCELAR: boolean;
  TRANSFERIR: boolean;
  FASEREMATRICULA: boolean;
  INCIDE_VALOR: boolean;
  VALOR_MENSAL: string;
  VALOR_MATRICULA: string;
  TIPO_COBRANCA: string;
  TIPO: string;
  LINK_ARQUIVO: string;
  TEXTO_LINK: string;
  IDSTATUS: number;
  STATUS: string;
  EXIBIR_PROTOCOLO: boolean;
  PROTOCOLO: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

export const exibirDetalhes = async (params: ExibirDetalhesParams): Promise<AxiosResponse<DetalheAtividadeResponse>> => {
  const url = `${baseURL}/${servicePath}/ExibirDetalhes`;
  console.log("Atividades", params);
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      IDATIVIDADE: params.IDATIVIDADE,
      IDTURMA: params.IDTURMA,
      CHAVE: context.chave,
    },
  });

  return response.data[0];
};

interface ListarMatriculadosParams {
  TITULO: number;
  IDATIVIDADE: number;
  TURMA: string;
}

interface MatriculadoResponseItem {
  IDASSOCIADO: number;
  NOME: string;
  MATRICULA: string;
  STATUS: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type MatriculadoResponse = MatriculadoResponseItem[];
//listar matriculados em uma ativdade especifica
export const listarMatriculados = async (params: ListarMatriculadosParams): Promise<AxiosResponse<MatriculadoResponse>> => {
  const url = `${baseURL}/${servicePath}/ListarMatriculados`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      IDATIVIDADE: params.IDATIVIDADE,
      TURMA: params.TURMA,
      CHAVE: context.chave,
    },
  });

  return response;
};

interface ProgramarExclusaoParams {
  TITULO: number;
  IDATIVIDADE: number;
  IDTURMA: string;
}

interface ProgramarExclusaoResponse {
  DTCANCELAMENTO: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

export const programarExclusao = async (params: ProgramarExclusaoParams): Promise<ProgramarExclusaoResponse> => {
  const url = `${baseURL}/${servicePath}/ProgramarExclusao`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      IDATIVIDADE: params.IDATIVIDADE,
      IDTURMA: params.IDTURMA,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

//Nova Atividades
//passo 1 Listar Atividades para usuario especifico ou para todos
interface ListarAtividadesFiltroParams {
  TITULO: number;
}

export interface AtividadeFiltroResponseItem {
  ICONE: string;
  IDENTIFICADOR: number;
  DESCRICAO: string;
  NOME: string;
  PERIODO: string;
  VAGAS: number;
  VALOR: string;
  STATUS: string;
  EXIBIR_TURMAS: boolean;
  ORDEM: number;
  MSG_BLOQUEIO: string;
  BLOQUEIO: number;
  TURMAS: number;
  IDAREA: number;
  IDDEPARTAMENTO: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type AtividadeFiltroResponse = AtividadeFiltroResponseItem[];

export const listarAtividadesFiltro = async (params: ListarAtividadesFiltroParams): Promise<AtividadeFiltroResponse> => {
  const url = `${baseURL}/${hourServiceParth}/ListarAtividadesFiltro`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

//passo 2 Listar Horarios para atividade especifica tambem é usado para exibir os detalhes da atividade
interface ListarHorariosParams {
  IDATIVIDADE: number;
  TITULO: number;
  VERIFICAR_VAGA?: boolean;
}

interface HorarioResponseItem {
  ATIVIDADE: string;
  HRINICIO: string;
  HRTERMINO: string;
  DIAS: string;
  TURMA: string;
  LOCAL: string;
  PROFESSOR: string;
  NIVEL: string;
  VAGAS: number;
  INSCREVER: boolean;
  LINK_ARQUIVO: string;
  TEXTO_LINK: string;
  ORDEM: number;
  VALOR_MENSAL: string;
  MATRICULAR: boolean;
  TIPO_COBRANCA: string;
  MSG_TESTEHABILIDADE: string;
  TESTEHABILIDADE: number;
  FAIXA_ETARIA: string;
  CATEGORIA: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type HorarioResponse = HorarioResponseItem[];

export const listarHorarios = async (params: ListarHorariosParams): Promise<HorarioResponse> => {
  const url = `${baseURL}/${servicePath}/ListarHorarios`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      IDATIVIDADE: params.IDATIVIDADE,
      TITULO: params.TITULO,
      VERIFICAR_VAGA: params.VERIFICAR_VAGA || true,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

//passo 3 Listar cadastrados para nova atividade
interface ListarCadastradosParams {
  TITULO: number;
  IDATIVIDADE: number;
  TURMA: string;
}

interface CadastradoResponseItem {
  NOME: string;
  TITULO: string;
  AVATAR: string;
  ORDEM: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type CadastradoResponse = CadastradoResponseItem[];

export const listarCadastrados = async (params: ListarCadastradosParams): Promise<CadastradoResponse> => {
  const url = `${baseURL}/${servicePath}/ListarCadastrados`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      IDATIVIDADE: params.IDATIVIDADE,
      TURMA: params.TURMA,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

//passo 4 Matricular o usuario na atividade
interface MatricularParams {
  TITULO: number;
  IDATIVIDADE: number;
  IDTURMA: string;
}

interface MatricularResponse {
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

export const matricular = async (params: MatricularParams): Promise<MatricularResponse> => {
  const url = `${baseURL}/${servicePath}/Matricular`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      IDATIVIDADE: params.IDATIVIDADE,
      IDTURMA: params.IDTURMA,
      CHAVE: context.chave,
    },
  });

  return response.data;
};
//listar associados para efetuar o cadastro em onva atividade.
interface ListarAssociadosParams {
  TITULO: number;
}

export interface AssociadoResponseItem {
  TITULO: string;
  NOME: string;
  IDADE: number;
  SEXO: string;
  EMAIL: string;
  TELEFONE: string;
  DTNASCTO: string;
  AVATAR: string;
  IDPESSOA: number;
  MATRICULAR: boolean;
  ORDEM: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type AssociadoResponse = AssociadoResponseItem[];

export const listarDependentes = async (params: ListarAssociadosParams): Promise<AssociadoResponse> => {
  const url = `${baseURL}/Alive.App.Atendimentos/Associados.asmx/Listar`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

interface ListarProximasAtividadesParams {
  TITULO: number;
}

export interface ProximaAtividadeResponseItem {
  TIPO: number;
  IDATIVIDADE: number;
  ATIVIDADE: string;
  DTATIVIDADE: string;
  HRINICIO: string;
  CANCELADA: boolean;
  TITULO: string;
  AVATAR: string;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type ProximaAtividadeResponse = ProximaAtividadeResponseItem[];

export const listarProximasAtividades = async (params: ListarProximasAtividadesParams): Promise<ProximaAtividadeResponse> => {
  const url = `${baseURL}/${servicePath}/ListarProximasAtividades`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

interface ListarEsperaParams {
  TITULO: number;
}

interface ListaEsperaResponseItem {
  TITULO: string;
  IDATIVIDADE: number;
  ATIVIDADE: string;
  POSICAO: number;
  TURMA: string;
  ICONE: string;
  IDAREA: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type ListaEsperaResponse = ListaEsperaResponseItem[];

export const listarEspera = async (params: ListarEsperaParams): Promise<ListaEsperaResponse> => {
  const url = `${baseURL}/${waitingActivitiesPath}/ListarEspera`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};

interface ListarProgramacaoParams {
  TITULO: number;
}

interface ProgramacaoResponseItem {
  IDATIVIDADE: number;
  TITULO: string;
  NOME: string;
  ATIVIDADE: string;
  TURMA: string;
  DTCANCELAMENTO: string;
  STATUS: string;
  AVATAR: string;
  DEPARTAMENTO: string;
  ICONE: string;
  HORARIO: string;
  DATA: string;
  POSICAO: number;
  MATRICULAR: boolean;
  IDAREA: number;
  ORDEM: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
}

type ProgramacaoResponse = ProgramacaoResponseItem[];

export const listarProgramacao = async (params: ListarProgramacaoParams): Promise<ProgramacaoResponse> => {
  const url = `${baseURL}/${canceledServicePath}/Listar`;
  const context = getAuthContext();
  const response = await instance.get(url, {
    params: {
      TITULO: params.TITULO,
      CHAVE: context.chave,
    },
  });

  return response.data;
};