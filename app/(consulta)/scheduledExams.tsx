import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { listarExames } from '@/api/app/appointments';
import DynamicList, { ListItem } from '@/components/DynamicList';
import { examesToItems } from '@/api/app/appTransformer'; // Ajuste para usar a função correta
import { Wrapper } from '@/components/Wrapper';
import { router } from 'expo-router';

export default function ScheduledExams() {
    const [exames, setExames] = useState<ListItem[]>([]); // Renomeado para "exames"
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar o carregamento

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarExames(); // Busca a lista de exames
                console.log(response);
                setExames(examesToItems(response)); // Transforma os exames em ListItems
            } catch (error) {
                console.error('Erro ao buscar exames:', error); // Mensagem de erro ajustada
            } finally {
                setIsLoading(false); // Define isLoading como false após o carregamento (ou erro)
            }
        };
        fetchData();
    }, []);

    // Função para navegar para a tela de detalhes do exame
    const handleNavigateToDetail = (titulo: string) => {
        router.push({
            pathname: '/(consulta)/examsHistory', // Navega para a tela de detalhes do exame
            params: { TITULO: titulo }, // Passa o TITULO como parâmetro
        });
    };

    return (
        <Wrapper isLoading={isLoading}> {/* Passa o estado isLoading para o Wrapper */}
            <DynamicList
                searchable
                data={exames}
                onClickPrimaryButton={(res) => {
                    console.log(res.id);
                    handleNavigateToDetail(res.id); // Navega para a tela de detalhes com o TITULO
                }}
            />
        </Wrapper>
    );
}