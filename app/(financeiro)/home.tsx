import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DynamicList, { ListItem } from '@/components/DynamicList';
import { ThemedText } from '@/components/ThemedText';
import { Wrapper } from '@/components/Wrapper';
import { useThemeColor } from '@/hooks/useThemeColor';
import { listarFaturas } from '@/api/app/financeiro';
import { router } from 'expo-router';
import { invoicesToItems, ListarFaturasItem } from '@/api/app/appTransformer';

// Função para formatar o valor para número
const formatValue = (value: string) => {
  return parseFloat(value.replace('.', '').replace(',', '.'));
};

// Função para calcular a média dos valores
const calcularMedia = (faturas: ListarFaturasItem[]) => {
  if (faturas.length === 0) return 0;

  const valores = faturas.map((fatura) => formatValue(fatura.VALOR));
  const soma = valores.reduce((acc, valor) => acc + valor, 0);
  return soma / faturas.length;
};

export default function Index() {
  const [originalData, setOriginalData] = useState<ListarFaturasItem[]>([]);
  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const activeBackground = useThemeColor({}, 'activeBackground');
  const brand = useThemeColor({}, 'brand');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Inicia o carregamento
        const apiData = await listarFaturas(); // Aguarda a resposta da API
        setOriginalData(apiData);
        console.log("Faturas: ", apiData);
        const convertedData = invoicesToItems(apiData);
        setItemList(convertedData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false); // Finaliza o carregamento, independentemente de sucesso ou erro
      }
    };

    fetchData(); // Chama a função para buscar os dados
  }, []);

  // Pegar as últimas 6 faturas disponíveis
  const ultimasSeisFaturas = originalData.slice(0, 6);

  // Calcular a média das últimas 6 faturas
  const mediaUltimasSeisFaturas = calcularMedia(ultimasSeisFaturas);

  // Dados para o gráfico de barras
  const chartData = {
    labels: ultimasSeisFaturas.map(item => item.DESCRICAO),
    datasets: [
      {
        data: ultimasSeisFaturas.map(item => formatValue(item.VALOR))
      }
    ]
  };

  // Estilos organizados em um objeto
  const styles = StyleSheet.create({
    summaryContainer: {
      padding: 16,
      backgroundColor: activeBackground,
      borderRadius: 16,
      marginBottom: 16
    },
    summaryText: {
      color: 'gray'
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '600'
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16
    }
  });

  const handleClick = (item: ListItem) => {
    // Encontra a fatura selecionada
    const faturaSelecionada = originalData.find(
      (fatura) => fatura.REFERENCIA === item.id
    );
    router.navigate({
      pathname: "/(financeiro)/itemList",
      params: { fatura: JSON.stringify(faturaSelecionada) },
    });
  }

  return (
    <Wrapper
      isLoading={isLoading}
    >
      <View style={styles.summaryContainer}>
        <ThemedText style={styles.summaryText}>
          Média mensal (Últimas 6 faturas)
        </ThemedText>
        <ThemedText style={styles.summaryValue}>
          {`R$ ${mediaUltimasSeisFaturas.toFixed(2).replace('.', ',')}`}
        </ThemedText>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 32} // Ajusta a largura para a largura da tela menos o padding
          height={220}
          yAxisLabel="R$ "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: activeBackground,
            backgroundGradientFrom: activeBackground,
            backgroundGradientTo: activeBackground,
            decimalPlaces: 2,
            color: (opacity = 1) => brand,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: brand
            }
          }}
          style={styles.chart}
        />
      </View>
      <DynamicList data={itemList} onClickPrimaryButton={handleClick} />
    </Wrapper>
  );
}