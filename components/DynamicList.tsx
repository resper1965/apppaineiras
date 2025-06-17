import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet, ListRenderItem, Image } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from './ui/IconSymbol';
import { Filter } from '@/api/app/appTypes';
import { unicodeToChar } from '@/api/app/appTransformer';
import { InputComponent } from './Input';

type Tab = string; // Agora as abas podem ser dinâmicas

export type ListItem = {
    title: string;
    subtitle?: string;
    icon?: string;
    iconLibrary?: 'material' | 'fontawesome';
    category: string;
    id: string;
    key?: string;
    tags?: [{ title: string, color: string }];
    onPress?: () => void; // Adicionando onPress como opcional
};

type DynamicListProps = {
    filters?: Filter[]; // Filtros opcionais
    tabs?: Tab[]; // Abas opcionais
    data?: ListItem[]; // Dados opcionais
    selectedFilter?: Filter | null; // Filtro selecionado externamente
    onChangeTab?: (tab: number) => void; // Callback quando uma aba é selecionada
    searchable?: boolean;
    onSelectFilter?: (filter: Filter) => void; // Callback quando um filtro é selecionado
    onClickPrimaryButton?: (item: ListItem) => void; // Callback quando um item é clicado
    removeBottomBorder?: boolean;
    selectedTabProp?: Tab | null; // Aba selecionada externamente
};

const DynamicList: React.FC<DynamicListProps> = ({
    filters = [],
    tabs = [],
    data = [],
    selectedFilter: externalSelectedFilter = null, // Filtro selecionado externamente
    searchable = false,
    onChangeTab,
    onSelectFilter,
    onClickPrimaryButton,
    removeBottomBorder = false,
    selectedTabProp
}) => {
    const [internalSelectedFilter, setInternalSelectedFilter] = useState<Filter | null>(externalSelectedFilter || null);
    const [selectedTab, setSelectedTab] = useState<Tab | null>(selectedTabProp || null);

    const buttonBackground = useThemeColor({}, 'buttonBackground');
    const activeBackground = useThemeColor({}, 'activeBackground');
    const brand = useThemeColor({}, 'brand');

    // Sincroniza o estado interno com a prop externa
    useEffect(() => {
        setInternalSelectedFilter(externalSelectedFilter || null);
    }, [externalSelectedFilter]);

    // Sincroniza a aba selecionada com a prop externa
    useEffect(() => {
        setSelectedTab(selectedTabProp || null);
    }, [selectedTabProp]);

    const groupByCategory = (items: ListItem[]) => {
        return items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {} as Record<string, ListItem[]>);
    };

    // Estilos (mantidos iguais)
    const styles = StyleSheet.create({
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        filterContainer: {
            marginBottom: 16,
        },
        filterButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
            height: 60,
            margin: 4,
            borderRadius: 40,
            backgroundColor: buttonBackground,
        },
        selectedFilterButton: {
            backgroundColor: activeBackground,
            borderWidth: 2,
            borderColor: '#3372c5',
        },
        filterText: {
            fontSize: 20,
        },
        tabContainer: {
            flexDirection: 'row',
            marginBottom: 10,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: buttonBackground
        },
        tabButton: {
            flex: 1,
            paddingVertical: 2,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'transparent',
        },
        selectedTabButton: {
            backgroundColor: activeBackground,
            borderRadius: 10,
        },
        tabText: {
            fontSize: 16,
        },
        categoryTitle: {
            fontSize: 14,
            color: 'gray',
            fontWeight: 'bold',
            marginTop: 16,
            marginLeft: 16,
        },
        itemContainer: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: activeBackground,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomLeftRadius: removeBottomBorder ? 0 : 12,
            borderBottomRightRadius: removeBottomBorder ? 0 : 12,
        },
        item: {
            paddingVertical: 10,
            backgroundColor: activeBackground
        },
        firstItem: {
        },
        lastItem: {
        },
        itemDivider: {
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
        },
        avatar: {
            width: 55,
            height: 55,
            borderRadius: 30,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
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
        subtitleText: {
            fontSize: 12,
            margin: 0,
            color: "gray",
            textAlign: 'center'
        },
        icon: {
            width: 55,
            height: 55,
            borderRadius: 10,
            marginRight: 10,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 1,
            backgroundColor: 'transparent',
        },
        tag: {
            borderRadius: 12,
            paddingHorizontal: 8,
            marginRight: 4,
            marginBottom: 4,
        },
        tagText: {
            fontSize: 11,
            color: 'white', // ou qualquer cor que contraste com o fundo da tag
        },
    });

    // Renderiza um item da lista
    const renderItem: ListRenderItem<ListItem> = ({ item, index }) => {
        const groupedItems = groupByCategory(data); // Agrupa os itens por categoria
        const itemsInCategory = groupedItems[item.category]; // Obtém os itens da categoria atual

        // Verifica se é o primeiro ou último item da categoria atual
        const isFirstItem = index === 0;
        const isLastItem = index === itemsInCategory?.length - 1;

        return (
            <ThemedView
                style={[
                    styles.item,
                    isFirstItem && styles.firstItem,
                    isLastItem && styles.lastItem,
                    !isLastItem && styles.itemDivider,
                ]}
            >
                <TouchableOpacity
                    onPress={() => onClickPrimaryButton?.(item)}
                    style={styles.itemContent}
                >
                    {item.icon &&
                        <>
                            {!item.icon.startsWith("U+") &&
                                <View style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: brand, height: 40, width: 40, borderRadius: 10, marginRight: 10 }}>
                                    <IconSymbol color={'white'} name={item.icon} size={20} library={item.iconLibrary} ></IconSymbol>
                                </View>}
                            {item.icon.startsWith("U+") &&
                                <ThemedView style={styles.icon}>
                                    <ThemedText>{unicodeToChar(item.icon)}</ThemedText>
                                </ThemedView>}
                        </>
                    }
                    <ThemedView style={styles.textContainer}>
                        <ThemedText style={styles.titleText}>{item.title}</ThemedText>
                        <ThemedView style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                            {item.tags && item.tags.length > 0 && (
                                <ThemedView style={styles.tagsContainer}>
                                    {item.tags.map((tag, index) => (
                                        <ThemedView
                                            key={index}
                                            style={[styles.tag, { backgroundColor: tag.color }]}
                                        >
                                            <ThemedText style={styles.tagText}>{tag.title}</ThemedText>
                                        </ThemedView>
                                    ))}
                                </ThemedView>
                            )}
                            {item.subtitle && (
                                <ThemedText
                                    style={styles.subtitleText}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.subtitle}
                                </ThemedText>
                            )}
                        </ThemedView>
                    </ThemedView>
                    <IconSymbol name={"chevron-right"} color={'white'} />
                </TouchableOpacity>
            </ThemedView>
        );
    };

    // Renderiza uma categoria com seus itens
    const renderCategory = (item: ListItem) => (
        <ThemedView key={item.category}>
            <ThemedText style={styles.categoryTitle}>{item.category}</ThemedText>
            <ThemedView style={styles.itemContainer}>
                <FlatList
                    data={groupByCategory(data)[item.category]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key || item.id}
                />
            </ThemedView>
        </ThemedView>
    );

    return (
        <ThemedView>
            {/* Filtros horizontais */}
            {filters.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.TITULO}
                            style={[
                                styles.filterButton,
                                internalSelectedFilter?.TITULO === filter.TITULO && styles.selectedFilterButton,
                            ]}
                            onPress={() => {
                                setInternalSelectedFilter(filter); // Atualiza o estado interno
                                onSelectFilter?.(filter); // Chama o callback
                            }}
                        >
                            {
                                filter.AVATAR ?
                                    <Image source={{ uri: filter.AVATAR }} style={styles.avatar} /> :
                                    <ThemedText style={styles.filterText}>{filter.NOME.charAt(0)}</ThemedText>
                            }
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Campo de busca */}
            {searchable && <InputComponent
                onChangeText={() => { }}
                placeholder='Buscar'
            />}

            {/* Abas */}
            {tabs.length > 0 && (
                <ThemedView style={styles.tabContainer}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tabButton,
                                selectedTab === tab && styles.selectedTabButton,
                            ]}
                            onPress={() => {
                                setSelectedTab(tab);
                                onChangeTab?.(index);
                            }}
                        >
                            <ThemedText style={styles.tabText}>{tab}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </ThemedView>
            )}

            {/* Lista de itens */}
            {data.length > 0 ? (
                <FlatList
                    data={Object.values(groupByCategory(data))}
                    renderItem={({ item }) => renderCategory(item[0])}
                    keyExtractor={(item) => item[0].category}
                />
            ) : (
                <ThemedText style={styles.subtitleText}>Nenhuma atividade disponível</ThemedText>
            )}
        </ThemedView>
    );
};

export default DynamicList;