import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';

interface CapacityCardComponentProps {
    currentCapacity: string;
    operatingHours: string;
}

const CapacityCardComponent: React.FC<CapacityCardComponentProps> = ({
    currentCapacity,
    operatingHours,
}) => {
    const activeBackground = useThemeColor({}, 'activeBackground');

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: activeBackground,
            borderRadius: 12,
            marginVertical: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
        },
        capacity: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        operatingHours: {
            fontSize: 16,
            fontWeight: '300',
        },
        content: {
            flexDirection: 'column',
        },
        iconContainer: {
            width: 60,
            height: 60,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#da0282',
            marginRight: 16,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <IconSymbol name={'groups'} color={"#fff"} size={40}></IconSymbol>
            </View>
            <View style={styles.content}>
                <ThemedText style={styles.title}>Ocupação do clube</ThemedText>
                <ThemedText style={styles.capacity}>{currentCapacity}</ThemedText>
                <ThemedText style={styles.operatingHours}>{operatingHours}</ThemedText>
            </View>
        </View>
    );
};



export default CapacityCardComponent;