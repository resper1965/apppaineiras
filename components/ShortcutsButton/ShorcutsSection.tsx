import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ShortcutAction {
  title: string;
  icon: string;
  color: string;
  onPress: () => void
}

interface ShortcutsSectionProps {
  shortcutActions: ShortcutAction[];
}

const ShortcutsButtonComponent: React.FC<ShortcutsSectionProps> = ({ shortcutActions }) => {
  const activeBackground = useThemeColor({}, 'activeBackground');

  const styles = StyleSheet.create({
    section: {
      marginVertical: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    shortcutsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    shortcutCard: {
      backgroundColor: activeBackground,
      padding: 19,
      borderRadius: 8,
      width: '48%', // Dois itens por linha com um pequeno espaçamento
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    shortcutLabel: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Atalhos</ThemedText>
      <View style={styles.shortcutsWrapper}>
        {shortcutActions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.shortcutCard} onPress={item.onPress}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <IconSymbol size={28} library="fontawesome" name={item.icon} color="#fff" />
            </View>
            <ThemedText style={styles.shortcutLabel}>{item.title}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



export default ShortcutsButtonComponent;