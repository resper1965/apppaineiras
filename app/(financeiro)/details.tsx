import React, { useState, useEffect } from 'react';
import { Wrapper } from '@/components/Wrapper';
import { ThemedText } from '@/components/ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import { enviarFatura, exibirFatura, ExibirFaturaResponse, visualizarBoleto } from '@/api/app/financeiro';
import { TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ListarFaturasItem } from '@/api/app/appTransformer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useError } from '@/providers/ErrorProvider';
import * as Clipboard from 'expo-clipboard';

export default function Details() {
    // Obtém os parâmetros da rota
    const { fatura } = useLocalSearchParams();
    const { setError } = useError();

    // Estados para gerenciar o carregamento e os dados da fatura
    const [isLoading, setIsLoading] = useState(true);
    const [faturaData, setFaturaData] = useState<ExibirFaturaResponse[] | null>(null);
    const [faturaInfo, setFaturaInfo] = useState<ListarFaturasItem | null>(null); // Novo estado para salvar a fatura

    const activeBackground = useThemeColor({}, 'activeBackground');

    const sendEmail = () => {
        if (faturaInfo)
            enviarFatura(faturaInfo?.REFERENCIA)
        setError('Fatura enviada com sucesso!', 'success');
        router.dismissTo('/(tabs)');
    }

    const handleCopy = () => {
        if (faturaData && faturaData[0].CODIGO) {
            Clipboard.setStringAsync(faturaData[0].CODIGO).then(() => {
                setError('Código de barras copiado!', 'success');
            }
            );
        }
    }

    // Simula uma chamada à API ou processamento dos dados da fatura
    useEffect(() => {
        if (fatura) {
            // Converte a fatura de string para objeto
            const parsedFatura = JSON.parse(Array.isArray(fatura) ? fatura[0] : fatura);
            setFaturaInfo(parsedFatura); // Salva a fatura no estado

            exibirFatura(parsedFatura.REFERENCIA)
                .then((response) => {
                    setFaturaData(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                }).finally(() => setIsLoading(false));
        }
    }, [fatura]);

    const visualizarPDF = async () => {
        if (faturaInfo) {
            try {
                const response = await visualizarBoleto(faturaInfo.REFERENCIA);
                if (!response[0].ERRO) {
                    // Navega para a tela de visualização do PDF
                    router.push({
                        pathname: '/(financeiro)/pdfView',
                        params: { pdfData: response[0].LINK },
                    });
                } else {
                    setError(response[0].MSG_ERRO, 'error');
                }
            } catch (error) {
                setError('Erro ao visualizar o boleto', 'error');
            }
        }
    };

    return (
        <Wrapper
            isLoading={isLoading}
            primaryButtonLabel='Enviar por e-mail'
            onPrimaryPress={faturaData && faturaData[0].ENVIAR ? sendEmail : undefined}
            secondaryButtonLabel='Visualizar PDF'
            onSecondaryPress={visualizarPDF}
        >
            {/* Conteúdo da tela de detalhes */}
            <ThemedText style={{ lineHeight: 16, color: 'gray', borderBottomWidth: 1, paddingBottom: 10 }}>Confira os dados e clique no botão abaixo para enviar ao e-mail
                cadastrado, ou copie o código de barras e pague pelo aplicativo do seu
                banco.
            </ThemedText>
            {faturaData && faturaInfo && (
                <View style={{ padding: 20, backgroundColor: activeBackground, marginTop: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ThemedText style={{ color: 'gray' }}>Status</ThemedText>
                        <View style={{ backgroundColor: faturaInfo.STATUS === "Em Aberto" ? "orange" : "red", paddingHorizontal: 15, borderRadius: 15 }}>
                            <ThemedText style={{ color: 'white' }}>{faturaInfo.STATUS}</ThemedText> {/* Exibe o status da fatura */}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ThemedText style={{ color: 'gray' }}>Vencimento</ThemedText>
                        <ThemedText style={{ color: 'gray' }}>{faturaInfo.VENCIMENTO}</ThemedText> {/* Exibe a data de vencimento */}
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleCopy}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <ThemedText style={{ fontWeight: 800, fontSize: 18 }}>Código de barras</ThemedText>
                                <IconSymbol color={''} name={'content-copy'} size={20}></IconSymbol>
                            </View>
                            <ThemedText style={{ color: 'gray' }}>{faturaData[0].CODIGO}</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'space-between', marginTop: 10 }}>
                        <ThemedText style={{ fontWeight: 800, fontSize: 18 }}>Email de cadastro</ThemedText>
                        <ThemedText style={{ color: 'gray' }}>{faturaData[0].EMAIL}</ThemedText> {/* Exibe a referência da fatura */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ThemedText style={{ fontWeight: 800, fontSize: 18 }}>Valor</ThemedText>
                        <ThemedText style={{ fontWeight: 800, fontSize: 18 }}>R$ {faturaInfo.VALOR}</ThemedText> {/* Exibe o valor da fatura */}
                    </View>
                </View>
            )}
        </Wrapper>
    );
}