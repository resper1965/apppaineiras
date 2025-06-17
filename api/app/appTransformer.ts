import { ListItem } from "@/components/DynamicList";
import { Filter } from "./appTypes";
import { AssociadoResponseItem, AtividadeFiltroResponseItem, ProximaAtividadeResponseItem } from "./atividades";
import { ConsultaItem } from "./appointments";
import { ListarTaxasResponse } from "./financeiro";

export interface Atividade {
  ATIVIDADE: string;
  AVATAR?: string;
  DATA: string;
  DEPARTAMENTO: string;
  DIAS: string;
  ERRO: boolean;
  HORARIO: string;
  ICONE: string;
  IDAREA: number;
  IDATIVIDADE: number;
  IDERRO: number;
  MATRICULAR: boolean;
  MSG_ERRO: string;
  NOME: string;
  ORDEM: number;
  POSICAO: number;
  STATUS: string;
  TITULO: string;
  TURMA: string;
}

export const extractFilters = (data: Atividade[]): Filter[] => {
  const uniqueUsers = new Map<string, Filter>();

  data.forEach((item) => {
    if (item.TITULO && !uniqueUsers.has(item.TITULO)) {
      uniqueUsers.set(item.TITULO, {
        NOME: item.NOME,
        AVATAR: item.AVATAR,
        TITULO: item.TITULO,
      });
    }
  });

  return Array.from(uniqueUsers.values());
};


export const convertToListItem = (data: Atividade[]): ListItem[] => {
  return data.map((item) => ({
    title: item.ATIVIDADE,
    subtitle: `Turma ${item.TURMA} - ${item.HORARIO}`,
    icon: item.ICONE,
    category: item.DEPARTAMENTO,
    id: item.IDATIVIDADE.toString(),
    onPress: () => console.log(`Clicou em ${item.ATIVIDADE}`), // Exemplo de callback
  }));
};

export const unicodeToChar = (unicode: string) => {
  if (!unicode) {
    return '';
  }
  const codePoint = parseInt(unicode.replace('U+', ''), 16);
  return String.fromCodePoint(codePoint);
};


// Sobrecarga da função para aceitar um único JsonItem
export function newActivityToList(jsonItem: AtividadeFiltroResponseItem): ListItem;

// Sobrecarga da função para aceitar um array de JsonItem
export function newActivityToList(jsonItem: AtividadeFiltroResponseItem[]): ListItem[];

// Implementação da função
export function newActivityToList(jsonItem: AtividadeFiltroResponseItem | AtividadeFiltroResponseItem[]): ListItem | ListItem[] {
  if (Array.isArray(jsonItem)) {
    // Se for um array, mapeia cada item para um ListItem
    return jsonItem.map(item => ({
      title: item.DESCRICAO,
      subtitle: item.TURMAS + " Horários",
      icon: item.ICONE,
      id: item.IDENTIFICADOR.toString(),
      tags: [{
        title: item.VAGAS === 0 ? "Lista de espera" : item.VAGAS + " VAGAS",
        color: item.VAGAS === 0 ? '#ffcc00' : '#36c557'
      }],
      key: item.IDENTIFICADOR.toString() + item.DESCRICAO + item.IDAREA.toString() + item.DESCRICAO,
      category: item.IDAREA == 2 ? 'Cultural' : 'Esportes',
      onPress: () => {
        console.log(`Item ${item.IDENTIFICADOR} pressionado`);
      }
    }));
  } else {
    // Se for um único objeto, retorna um ListItem
    return {
      title: jsonItem.NOME,
      subtitle: jsonItem.DESCRICAO,
      icon: jsonItem.ICONE,
      category: jsonItem.IDAREA.toString(),
      id: jsonItem.IDENTIFICADOR.toString(),
      onPress: () => {
        console.log(`Item ${jsonItem.IDENTIFICADOR} pressionado`);
      }
    };
  }
}

export const extractFiltersFromAssociadoResponse = (response: AssociadoResponseItem[]): Filter[] => {
  // Mapeia a resposta da API para o formato de Filter
  const filters: Filter[] = response.map((item) => ({
    NOME: item.NOME, // Nome do associado
    AVATAR: item.AVATAR || undefined, // Avatar do associado (opcional)
    TITULO: item.TITULO, // Título do associado
  }));

  // Remove duplicados com base no campo TITULO
  const uniqueFilters = filters.reduce((acc: Filter[], current) => {
    const isDuplicate = acc.some((filter) => filter.TITULO === current.TITULO);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueFilters;
};

export interface Schedule {
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


export const schedulesToItems = (schedules: Schedule[]): ListItem[] => {
  return schedules.map((schedule) => ({
    title: schedule.FAIXA_ETARIA,
    subtitle: schedule.DIAS.trim() + " " + schedule.HRINICIO + " - " + schedule.HRTERMINO,
    icon: "",
    category: schedule.CATEGORIA,
    id: schedule.TURMA,
    tags: [{
      title: schedule.VAGAS === 0 ? "Lista de espera" : schedule.VAGAS + " VAGAS",
      color: schedule.VAGAS === 0 ? '#ffcc00' : '#36c557'
    }],
    onPress: () => {
      console.log(`Clicou na turma ${schedule.TURMA}`);
    },
  }));
};

export interface AvisoItem {
  IDAVISO: number; // ID do aviso
  DATA: string; // Data do aviso (no formato "DD/MM/YYYY")
  ASSUNTO: string; // Assunto do aviso
  DESCRICAO: string; // Descrição do aviso
  IDSERVICO: number; // ID do serviço relacionado
  LEITURA: boolean; // Indica se o aviso foi lido ou não
  ORDEM: number; // Ordem de exibição do aviso
  EXIBIR_LINK: boolean; // Indica se deve exibir um link
  LINK_ARQUIVO: string; // Link do arquivo relacionado (se houver)
  ERRO: boolean; // Indica se houve erro na requisição
  IDERRO: number; // Código do erro (se houver)
  MSG_ERRO: string; // Mensagem de erro (se houver)
}

export const avisosToItems = (avisos: AvisoItem[]): ListItem[] => {
  return avisos.map((aviso) => ({
    title: aviso.ASSUNTO, // Título do aviso
    subtitle: aviso.DATA, // Data do aviso
    icon: "", // Ícone (pode ser ajustado conforme necessário)
    category: aviso.LEITURA ? "Lidas" : "Não Lidas", // Categoria baseada na leitura
    id: aviso.IDAVISO.toString(), // ID do aviso como string
    onPress: () => {
      console.log(`Clicou no aviso ${aviso.IDAVISO}`);
    },
  }));
};


export type ListarFaturasItem = {
  REFERENCIA: string;
  DESCRICAO: string;
  VENCIMENTO: string;
  STATUS: string;
  VALOR: string;
  ORDEM: number;
  ERRO: boolean;
  IDERRO: number;
  MSG_ERRO: string;
};
export const invoicesToItems = (invoices: ListarFaturasItem[]): ListItem[] => {
  return invoices.map((item) => ({
    category: "Lista de Faturas",
    icon: "U+1F4C5",
    id: item.REFERENCIA,
    subtitle: `Venc. ${item.VENCIMENTO}`,
    title: `${item.DESCRICAO} - R$ ${item.VALOR}`,
    tags: [{
      color: item.STATUS === "Em Aberto" ? "orange" : "red",
      title: item.STATUS
    }]
  }));
};


export const nextActivityToListItems = (atividades: ProximaAtividadeResponseItem[]): ListItem[] => {
  return atividades.map((atividade) => ({
    title: atividade.ATIVIDADE,
    icon: "", // Usa o avatar como ícone, se disponível
    subtitle: `${atividade.DTATIVIDADE} ${atividade.HRINICIO}`, // Concatena data e hora de início
    category: "Proximas Atividades",
    id: atividade.IDATIVIDADE.toString(),
    key: atividade.IDATIVIDADE.toString(), // Usa o ID da atividade como chave
    tags: atividade.CANCELADA ? [{ title: 'Cancelada', color: 'red' }] : undefined, // Adiciona uma tag se a atividade estiver cancelada
    onPress: () => {
      // Define o que acontece quando o item é pressionado
      console.log(`Atividade selecionada: ${atividade.ATIVIDADE}`);
    }
  }));
};


export const transformarConsultasEmListItems = (consultas: ConsultaItem[]): ListItem[] => {
  return consultas.map((consulta) => {
    // Formata a data para "Mês dia, ano"
    const dataFormatada = new Date(consulta.DATA.split('/').reverse().join('-')).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      title: `${consulta.NOME} ${consulta.TITULO}`, // Concatena NOME e TITULO
      subtitle: dataFormatada, // Data formatada
      icon: consulta.ICONE || "", // Usa o ícone se disponível
      category: '',
      id: consulta.IDCONSULTA.toString(), // ID da consulta como string
      key: consulta.IDCONSULTA.toString(), // ID da consulta como chave
      tags: [
        {
          title: `${consulta.ESPECIALIDADE}`, // Tag com a especialidade
          color: "#007dfd", // Cor da tag
        },
      ],
      onPress: () => {
        // Função opcional para quando o item for pressionado
        console.log(`Consulta selecionada: ${consulta.IDCONSULTA}`);
      },
    };
  });
};

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

export const examesToItems = (exames: ExameItem[]): ListItem[] => {
  return exames.map((exame) => ({
    title: `${exame.NOME} (${exame.TITULO})`,
    subtitle: `Validade: ${exame.DTVALIDADE}`,
    icon: "",
    category: "Exames",
    id: exame.TITULO,
    tags: [{
      title: exame.SITUACAO,
      color: exame.SITUACAO === "Vencido" ? "red" : "orange"
    }],
    key: (Math.random()*50000).toString(),
    onPress: () => {
      console.log(`Clicou no exame ${exame.IDEXAMES}`);
    },
  }));
};


export function converterParaListItem(itensFatura: ListarTaxasResponse[]): ListItem[] {
  return itensFatura.map((item, index) => {
      const dataFormatada = item.DATA.split(' ')[0]; // Extrai a data no formato "08/03/2025"
      const subtitulo = `${dataFormatada} - ${item.TAXA} - ${item.NOME}`;

      return {
          title: "R$ "+item.VALOR,
          subtitle: subtitulo,
          icon: 'U+1F4B0', // Código Unicode para o ícone de dinheiro
          iconLibrary: 'material', // Ou 'fontawesome', dependendo da biblioteca que você está usando
          category: item.GRUPO,
          id: `${index}`, // ID único para cada item
          key: `item-${index}`, // Chave única para cada item
          onPress: () => {
              // Função opcional que pode ser chamada ao pressionar o item
              console.log(`Item ${index} pressionado:`, item);
          }
      };
  });
}