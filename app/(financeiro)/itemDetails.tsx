import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Wrapper } from '@/components/Wrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { unicodeToChar } from '@/api/app/appTransformer';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useError } from '@/providers/ErrorProvider';
import { useConfirmation } from '@/providers/ConfirmProvider';

const ContestationDetail: React.FC<any> = () => {
  const params = useLocalSearchParams();
  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setError } = useError();
  const confirm = useConfirmation();

  const backgroundColor = useThemeColor({}, 'background');
  const activeBackground = useThemeColor({}, 'activeBackground');

  useEffect(() => {
    setIsLoading(true); // Inicia o carregamento
    const itemNavegacao = JSON.parse(params.item as string);
    setItem(itemNavegacao);
    setIsLoading(false); // Finaliza o carregamento
  }, []);

  const handleContest = () => {
    confirm.showConfirmation('Contestar Item', handleContestConfirmation);
  }

  const handleContestConfirmation = async () => {
    // Lógica para contestar o item
    // Aqui você pode chamar uma API ou realizar alguma ação específica
    setError('Item contestado com sucesso!', 'success');
    router.dismissTo('/(tabs)');
    console.log('Item contestado com sucesso!');
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 16,
    },
    avatar: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    associated: {
      fontSize: 18,
      marginBottom: 16,
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
    iconContainer: {
      backgroundColor: activeBackground,
      width: 90,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginBottom: 20,
    },
    iconText: {
      fontSize: 30,
      lineHeight: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    associatedContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginBottom: 16,
      gap: 8,
    },
  });

  return (
    <Wrapper
      isLoading={isLoading}
      primaryButtonLabel="Contestar Item"
      onPrimaryPress={handleContest}
    >
      {item &&
        <ThemedView style={styles.container}>
          <ThemedView style={styles.iconContainer}>
            <ThemedText style={styles.iconText}>{unicodeToChar('U+1F4B0')}</ThemedText>
          </ThemedView>
          <ThemedText style={styles.title}>{item.GRUPO}</ThemedText>
          <ThemedView style={styles.infoContainer}>
            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Data:</ThemedText>
              <ThemedText style={styles.infoValue}>{item.DATA}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Nome:</ThemedText>
              <ThemedText style={styles.infoValue}>{item.NOME}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Taxa:</ThemedText>
              <ThemedText style={styles.infoValue}>{item.TAXA}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Valor:</ThemedText>
              <ThemedText style={styles.infoValue}>R$ {item.VALOR}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      }
    </Wrapper>
  );
};

export default ContestationDetail;