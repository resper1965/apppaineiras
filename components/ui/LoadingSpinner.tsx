
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export function LoadingSpinner({ 
  size = 'large', 
  text = 'Carregando...', 
  color 
}: LoadingSpinnerProps) {
  const tintColor = useThemeColor({}, 'tint');
  const spinnerColor = color || tintColor;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {text && (
        <ThemedText style={styles.text}>
          {text}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
