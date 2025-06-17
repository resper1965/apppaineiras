import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image, Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from './ui/IconSymbol';
import { AssociadoResponseItem, listarDependentes } from '@/api/app/atividades';
import { useAuth } from '@/providers';
import { Wrapper } from './Wrapper';
import { router } from 'expo-router';

type ProfileItem = {
    title: string;
    onPress?: () => void;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
};

type ProfileProps = {
    onLogout: () => void;
};

const THEME_KEY = 'user_theme'; // Chave para salvar o tema no AsyncStorage

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
    const [darkMode, setDarkMode] = useState(false);
    const colorScheme = useColorScheme(); // Obtém o esquema de cores padrão do dispositivo
    const [profile, setProfile] = useState<AssociadoResponseItem>();
    const AuthContext = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Carrega o tema salvo ao iniciar o componente
    useEffect(() => {
        setIsLoading(true);
        listarDependentes({ TITULO: AuthContext.user }).then((response) => {
            setProfile(response.find((item) => item.TITULO === AuthContext.user))
        }
        ).finally(() => {
            setIsLoading(false);
        });
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (savedTheme !== null) {
                    // Se houver um tema salvo, aplica-o
                    setDarkMode(savedTheme === 'dark');
                } else {
                    // Se não houver um tema salvo, usa o esquema de cores padrão do dispositivo
                    setDarkMode(colorScheme === 'dark');
                }
            } catch (error) {
                console.error('Erro ao carregar o tema:', error);
            }
        };

        loadTheme();
    }, []); // Removemos a dependência de colorScheme para evitar o loop

    // Salva o tema sempre que ele for alterado manualmente
    const handleSwitchChange = (value: boolean) => {
        setDarkMode(value);
        Appearance.setColorScheme(value ? 'dark' : 'light'); // Atualiza o tema imediatamente

        const saveTheme = async () => {
            try {
                await AsyncStorage.setItem(THEME_KEY, value ? 'dark' : 'light');
            } catch (error) {
                console.error('Erro ao salvar o tema:', error);
            }
        };

        saveTheme();
    };

    const buttonBackground = useThemeColor({}, 'buttonBackground');
    const activeBackground = useThemeColor({}, 'activeBackground');
    const dangerBackground = 'red';

    const profileItems: ProfileItem[] = [
        {
            title: 'Dados Pessoais',
            onPress: () => {
                router.push({
                    pathname: '/personalData',
                    params: {
                        profile: JSON.stringify(profile)
                    }
                });
            },
        },
        {
            title: 'Notificações',
            onPress: () => {
                // Navegar para a tela de notificações
            },
        },
        {
            title: 'Tema Escuro',
            isSwitch: true,
            switchValue: darkMode,
            onSwitchChange: handleSwitchChange,
        },
    ];

    const styles = StyleSheet.create({
        itemContainer: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: activeBackground,
        },
        firstItem: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        lastItem: {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
        },
        itemDivider: {
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
        },
        itemContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            maxHeight: 30
        },
        icon: {
            width: 55,
            height: 55,
            borderRadius: 10,
            marginRight: 10,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            flex: 1,
        },
        titleText: {
            fontSize: 14,
            lineHeight: 16,
            maxWidth: '100%',
        },
        logoutButton: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: activeBackground,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20,
        },
        logoutButtonText: {
            fontSize: 16,
            color: dangerBackground,
        },
    });

    const renderItem = (item: ProfileItem, index: number) => {
        const isFirstItem = index === 0;
        const isLastItem = index === profileItems.length - 1;

        return (
            <TouchableOpacity
                key={item.title}
                style={[
                    styles.itemContainer,
                    isFirstItem && styles.firstItem,
                    isLastItem && styles.lastItem,
                    !isLastItem && styles.itemDivider,
                ]}
                onPress={item.onPress}
            >
                <View style={styles.itemContent}>
                    <View style={styles.textContainer}>
                        <ThemedText style={styles.titleText}>{item.title}</ThemedText>
                    </View>
                    {item.isSwitch && (
                        <Switch
                            value={item.switchValue}
                            onValueChange={item.onSwitchChange}
                        />
                    )}
                    {!item.isSwitch && <IconSymbol name={"chevron-right"} color={'black'} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Wrapper
            isLoading={isLoading}
        >
            <View style={{ display: "flex", alignItems: "center", marginBottom: 50, overflow: "hidden", gap: 10 }}>
                <Image style={{ borderRadius: 100, borderWidth: 3, borderColor: "#4389e6" }} source={{ uri: profile?.AVATAR }} width={200} height={200} />
                <ThemedText style={{ fontWeight: 800, fontSize: 25 }}>Associado</ThemedText>
                <ThemedText style={{ fontWeight: 800, fontSize: 14, color: "gray" }}>N° do Título: {profile?.TITULO}</ThemedText>
            </View>
            {profileItems.map((item, index) => renderItem(item, index))}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogout}
            >
                <Text style={styles.logoutButtonText}>Finalizar Sessão</Text>
            </TouchableOpacity>
        </Wrapper>
    );
};

export default Profile;