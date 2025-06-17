import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { IconSymbol } from './ui/IconSymbol';

export interface InputProps extends TextInputProps {
  label?: string;
  password?: boolean;
  backgroundColorProp?: string;
}

export const InputComponent: React.FC<InputProps> = ({
  label,
  password = false,
  secureTextEntry,
  backgroundColorProp,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const backgroundColor = backgroundColorProp || "#fff"//useThemeColor({}, 'buttonBackground');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <View style={[styles.inputContainer, { backgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholderTextColor="#999"
          secureTextEntry={password && !isPasswordVisible}
          {...rest}
        />
        {password && (
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <IconSymbol
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              size={22}
              color={"#5A69E2"}
              library='fontawesome'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});
