import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { listarConsultas } from '@/api/app/appointments';
import DynamicList, { ListItem } from '@/components/DynamicList';
import { transformarConsultasEmListItems } from '@/api/app/appTransformer';
import { Wrapper } from '@/components/Wrapper';
import { router } from 'expo-router';

export default function ScheduledAppointments() {
    const [consultas, setConsultas] = useState<ListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar o carregamento

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarConsultas();
                console.log(response);
                setConsultas(transformarConsultasEmListItems(response));
            } catch (error) {
                console.error('Erro ao buscar consultas:', error);
            } finally {
                setIsLoading(false); // Define isLoading como false após o carregamento (ou erro)
            }
        };
        fetchData();
    }, []);

    // Função para navegar para a tela de detalhes da consulta
    const handleNavigateToDetail = (id: number) => {
        router.push({
            pathname: '/(consulta)/appointmentDetails', // Navega para a tela de detalhes
            params: { IDCONSULTA: id.toString() }, // Passa o IDCONSULTA como parâmetro
        });
    };

    return (
        <Wrapper isLoading={isLoading}> {/* Passa o estado isLoading para o Wrapper */}
            <DynamicList
                searchable
                data={consultas}
                onClickPrimaryButton={(res) => {
                    console.log(res.id);
                    handleNavigateToDetail(parseInt(res.id)); // Navega para a tela de detalhes
                }}
            />
        </Wrapper>
    );
}