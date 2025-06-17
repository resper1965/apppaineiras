import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissible?: boolean;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  isLoading?: boolean; // Novo: Propriedade para controlar o estado de carregamento
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  dismissible = true,
  onPrimaryPress,
  onSecondaryPress,
  primaryButtonLabel = 'Confirmar',
  secondaryButtonLabel = 'Cancelar',
  isLoading = false, // Valor padrão para isLoading
}) => {
  const activeBackground = useThemeColor({}, 'activeBackground');
  const buttonBackground = useThemeColor({}, 'buttonBackground');
  const brand = useThemeColor({}, 'brand');
  const textColor = useThemeColor({}, 'text');

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      width: '100%',
      padding: 25,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    content: {
      paddingBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={dismissible ? onClose : undefined}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={dismissible ? onClose : undefined}
        />
        <View style={[styles.container, { backgroundColor: activeBackground }]}>
          <View style={styles.content}>{children}</View>

          <View style={styles.buttonContainer}>
            {onSecondaryPress && (
              <TouchableOpacity
                style={[styles.button]}
                onPress={onSecondaryPress}
                disabled={isLoading} // Desabilita o botão durante o carregamento
              >
                {isLoading ? (
                  <ActivityIndicator color={textColor} /> // Exibe o indicador de carregamento
                ) : (
                  <Text style={[styles.buttonText, { color: textColor }]}>
                    {secondaryButtonLabel}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            {onPrimaryPress && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: brand }]}
                onPress={onPrimaryPress}
                disabled={isLoading} // Desabilita o botão durante o carregamento
              >
                {isLoading ? (
                  <ActivityIndicator color={textColor} /> // Exibe o indicador de carregamento
                ) : (
                  <Text style={[styles.buttonText, { color: 'white' }]}>
                    {primaryButtonLabel}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
