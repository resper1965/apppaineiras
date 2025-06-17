import notionClient from './notionClient';

const NOTION_TELAO = "4bd8ec2b8aa54b2197785ee2bdda9d91"; // ID do banco de dados Telão
const NOTION_BANNERS = "6f69861e1f334ed4a562578c63177d67"; // ID do banco de dados Banners

// Função para buscar dados do Telão
export const fetchTelaoData = async () => {
  try {
    const response = await notionClient.databases.query({
      database_id: NOTION_TELAO,
    });
    return response.results;
  } catch (error) {
    console.error('Erro ao buscar dados do Telão:', error);
    return [];
  }
};

const formatDate = (date: any) => {
  return date.toISOString().split("T")[0]; // Pega só a parte da data (sem hora)
};

// Função para buscar dados dos Banners
export const fetchBannersData = async () => {
  try {
    const response = await notionClient.databases.query({
      database_id: NOTION_BANNERS,
    });
    return response.results;
  } catch (error) {
    console.error("Erro ao buscar dados do Notion:", error);
    return [];
  }
};
