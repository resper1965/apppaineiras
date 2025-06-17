import React from 'react';
import { BottomSheet } from './BottomSheet';
import { InputComponent } from './Input';
import { ThemedView } from './ThemedView';
import { Text, View, StyleSheet } from 'react-native';  // Adicionando import para estilos e texto

interface ConfirmActionProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmButtonLabel: string;
  onCancel: () => void;
  cancelButtonLabel: string;
  visible: boolean;
  onPasswordChange: (text: string) => void;
  isLoading?: boolean;
}

export default function ConfirmActionComponent({
  title,
  onClose,
  onConfirm,
  confirmButtonLabel,
  onCancel,
  cancelButtonLabel,
  visible,
  onPasswordChange,
  isLoading = false,
}: ConfirmActionProps) {
  return (
    <ThemedView>
      <BottomSheet
        onClose={onClose}
        onPrimaryPress={onConfirm}
        primaryButtonLabel={confirmButtonLabel}
        onSecondaryPress={onCancel}
        secondaryButtonLabel={cancelButtonLabel}
        visible={visible}
        isLoading={isLoading}
      >
        {/* Título personalizado dentro do BottomSheet */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <InputComponent
          onChangeText={onPasswordChange}
          label="SENHA"
          password={true}
          keyboardType='number-pad'
        />
      </BottomSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor do título
  },
});
