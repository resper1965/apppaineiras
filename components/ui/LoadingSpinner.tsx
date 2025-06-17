
import React, { memo } from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
  style?: ViewStyle;
  fullScreen?: boolean;
}

export const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'large', 
  text = 'Carregando...', 
  color,
  style,
  fullScreen = true
}: LoadingSpinnerProps) {
  const tintColor = useThemeColor({}, 'tint');
  const spinnerColor = color || tintColor;

  const containerStyle = fullScreen 
    ? [styles.container, styles.fullScreen, style]
    : [styles.container, style];

  return (
    <View style={containerStyle}>
      <ActivityIndicator 
        size={size} 
        color={spinnerColor}
        accessibilityLabel="Carregando"
      />
      {text && (
        <ThemedText style={styles.text} accessibilityLabel={text}>
          {text}
        </ThemedText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});
