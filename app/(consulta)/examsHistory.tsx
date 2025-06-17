import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Wrapper } from '@/components/Wrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, FlatList } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useError } from '@/providers/ErrorProvider';
import { listarHistoricoExames } from '@/api/app/appointments';

interface Exame {
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

const ExamHistory: React.FC = () => {
    const params = useLocalSearchParams();
    const [exames, setExames] = useState<Exame[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setError } = useError();
    const [errored, setErrored] = useState<boolean>(false);

    const backgroundColor = useThemeColor({}, 'background');
    const activeBackground = useThemeColor({}, 'activeBackground');

    useEffect(() => {
        setIsLoading(true); // Inicia o carregamento

        // Acessa o TITULO diretamente dos parâmetros
        const TITULO = params.TITULO as string;

        if (!TITULO) {
            setError('Título do exame não encontrado', 'error');
            setIsLoading(false);
            return;
        }

        listarHistoricoExames(TITULO)
            .then((response) => {
                // Verifica se há algum erro na resposta
                const hasError = response.some((exame: Exame) => exame.ERRO);
                if (hasError) {
                    // Se houver erro, exibe a mensagem de erro
                    setError(response[0].MSG_ERRO, 'error');
                    setErrored(true);
                    setExames(response);
                } else {
                    // Define a lista de exames
                    setExames(response);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao carregar histórico de exames', 'error');
            })
            .finally(() => {
                setIsLoading(false); // Finaliza o carregamento
            });
    }, []);

    const renderItem = ({ item }: { item: Exame }) => (
        <ThemedView style={styles.examContainer}>
            <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Data:</ThemedText>
                <ThemedText style={styles.infoValue}>{item.DTEXAME}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Médico:</ThemedText>
                <ThemedText style={styles.infoValue}>{item.ESPECIALISTA}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Status do Débito:</ThemedText>
                <ThemedText style={styles.infoValue}>{item.PAGO ? 'Pago' : 'Pendente'}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Diagnóstico:</ThemedText>
                <ThemedText style={[styles.infoValue, { color: item.DIAGNOSTICO === 'Apto' ? 'green' : 'red' }]}>
                    {item.DIAGNOSTICO}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Valor:</ThemedText>
                <ThemedText style={styles.infoValue}>R$ {item.VALOR}</ThemedText>
            </ThemedView>
        </ThemedView>
    );

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            padding: 16,
        },
        examContainer: {
            width: '100%',
            backgroundColor: activeBackground,
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
            backgroundColor: activeBackground,
        },
        infoLabel: {
            fontSize: 14,
            lineHeight: 20,
            fontWeight: 'bold',
            backgroundColor: activeBackground,
        },
        infoValue: {
            fontSize: 14,
            lineHeight: 20,
            backgroundColor: activeBackground,
        },
        errorText: {
            fontSize: 15,
            color: 'red',
            textAlign: 'center',
            marginTop: 20,
        },
    });

    return (
        <Wrapper isLoading={isLoading}>
            {errored ? (
                <ThemedText style={styles.errorText}>{JSON.stringify(exames[0].MSG_ERRO)}</ThemedText>
            ) : (
                <FlatList
                    data={exames}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.IDEXAMES.toString()}
                />
            )}
        </Wrapper>
    );
};

export default ExamHistory;