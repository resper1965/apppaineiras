import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Wrapper } from '@/components/Wrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useError } from '@/providers/ErrorProvider';
import { useConfirmation } from '@/providers/ConfirmProvider';
import { cancelarConsulta, exibirConsulta, ExibirConsultaResponse } from '@/api/app/appointments';

const AppointmentDetail: React.FC = () => {
    const params = useLocalSearchParams();
    const [consulta, setConsulta] = useState<ExibirConsultaResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setError } = useError();
    const confirm = useConfirmation();

    const backgroundColor = useThemeColor({}, 'background');
    const activeBackground = useThemeColor({}, 'activeBackground');

    useEffect(() => {
        setIsLoading(true); // Inicia o carregamento

        // Acessa o IDCONSULTA diretamente dos parâmetros
        const IDCONSULTA = params.IDCONSULTA ? Number(params.IDCONSULTA) : null;

        if (IDCONSULTA === null) {
            setError('ID da consulta não encontrado', 'error');
            setIsLoading(false);
            return;
        }

        exibirConsulta(IDCONSULTA)
            .then((response) => {
                // Define os detalhes da consulta
                setConsulta(response[0]);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao carregar detalhes da consulta', 'error');
            })
            .finally(() => {
                setIsLoading(false); // Finaliza o carregamento
            });
    }, [params.IDCONSULTA, setError]);

    const handleCancel = () => {
        confirm.showConfirmation('Cancelar Consulta', handleCancelConfirmation);
    };

    const handleCancelConfirmation = async () => {
        if (!consulta) return;

        try {
            const IDCONSULTA = params.IDCONSULTA ? Number(params.IDCONSULTA) : null;
            // Aqui você deve chamar a função para cancelar a consulta
            // Exemplo: await cancelarConsulta(consulta.IDCONSULTA);
            if (IDCONSULTA === null) {
                setError('ID da consulta não encontrado', 'error');
                return;
            }
            cancelarConsulta(IDCONSULTA);
            setError('Consulta cancelada com sucesso!', 'success');
            router.dismissTo('/(tabs)');
        } catch (error) {
            setError('Erro ao cancelar consulta', 'error');
            console.error('Erro ao cancelar consulta:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            padding: 16,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        infoContainer: {
            width: '100%',
            backgroundColor: activeBackground,
            padding: 16,
            borderRadius: 16,
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
    });

    return (
        <Wrapper
            isLoading={isLoading}
            secondaryButtonLabel={consulta?.CANCELAR ? 'Cancelar Consulta' : undefined}
            onSecondaryPress={consulta?.CANCELAR ? handleCancel : undefined}
        >
            {consulta && (
                <ThemedView style={styles.container}>
                    <ThemedText style={styles.title}>{consulta.TITULO}</ThemedText>
                    <ThemedView style={styles.infoContainer}>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Data:</ThemedText>
                            <ThemedText style={styles.infoValue}>{consulta.DATA}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Horário:</ThemedText>
                            <ThemedText style={styles.infoValue}>{consulta.HORARIO}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Associado:</ThemedText>
                            <ThemedText style={styles.infoValue}>{consulta.NOME}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Especialista:</ThemedText>
                            <ThemedText style={styles.infoValue}>{consulta.ESPECIALISTA}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Especialidade:</ThemedText>
                            <ThemedText style={styles.infoValue}>{consulta.ESPECIALIDADE}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.infoRow}>
                            <ThemedText style={styles.infoLabel}>Valor:</ThemedText>
                            <ThemedText style={styles.infoValue}>R$ {consulta.VALOR}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            )}
        </Wrapper>
    );
};

export default AppointmentDetail;