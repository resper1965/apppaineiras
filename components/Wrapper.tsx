import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import { ThemedText } from './ThemedText';

export interface WrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  refreshing?: boolean;
  isButtonLoading?: boolean; // Nova prop para controlar o carregamento dos botões
  onRefresh?: () => void;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  secondaryColor?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  useScrollView?: boolean;
  rowButton?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  isLoading = false,
  refreshing = false,
  isButtonLoading = false, // Valor padrão é false
  onRefresh,
  onPrimaryPress,
  onSecondaryPress,
  secondaryColor,
  primaryButtonLabel = 'Cancelar',
  secondaryButtonLabel = 'Confirmar',
  useScrollView = true,
  rowButton = false,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const redTextColor = useThemeColor({}, 'redText');
  const lightPink = useThemeColor({}, 'lightPink');
  const brand = useThemeColor({}, 'brand');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      paddingBottom: 0,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    scrollContent: {
      flexGrow: 1,
    },
    buttonContainer: {
      flexDirection: rowButton ? 'row' : 'column',
      gap: 8,
      paddingBottom: 20,
      paddingHorizontal: 25,
      paddingTop: 10,
    },
    button: {
      width: (rowButton) ? '50%' : '100%',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    disabledButton: {
      opacity: 0.6, // Reduz a opacidade do botão quando está desabilitado
    },
    buttonText: {
      fontSize: 17,
      fontWeight: '900',
    },
  });

  const renderContent = () => {
    if (useScrollView) {
      return (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {children}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.scrollContent}>
          {children}
        </View>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={textColor} />
          <ThemedText style={{ marginBottom: 20 }}>Aguarde, estamos buscando a informação</ThemedText>
        </View>
      ) : (
        <>
          <View style={[styles.container, { backgroundColor }]}>
            {renderContent()}
          </View>
          {(onPrimaryPress || onSecondaryPress) && (
            <View style={styles.buttonContainer}>
              {onSecondaryPress && (
                <TouchableHighlight
                  style={[styles.button, { backgroundColor: lightPink }, isButtonLoading && styles.disabledButton]}
                  underlayColor="#ccc"
                  onPress={isButtonLoading ? undefined : onSecondaryPress}
                  disabled={isButtonLoading}
                >
                  {isButtonLoading ? (
                    <ActivityIndicator size="small" color={secondaryColor || redTextColor} />
                  ) : (
                    <Text style={[styles.buttonText, { color: secondaryColor || redTextColor }]}>
                      {secondaryButtonLabel}
                    </Text>
                  )}
                </TouchableHighlight>
              )}
              {onPrimaryPress && (
                <TouchableHighlight
                  style={[
                    styles.button,
                    { backgroundColor: brand },
                    isButtonLoading && styles.disabledButton,
                  ]}
                  underlayColor="#ccc"
                  onPress={isButtonLoading ? undefined : onPrimaryPress}
                  disabled={isButtonLoading}
                >
                  {isButtonLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={[styles.buttonText, { color: 'white' }]}>
                      {primaryButtonLabel}
                    </Text>
                  )}
                </TouchableHighlight>
              )}
            </View>
          )}
        </>
      )}
    </>
  );
};