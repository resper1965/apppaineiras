import { nextActivityToListItems } from '@/api/app/appTransformer'
import { listarProximasAtividades } from '@/api/app/atividades'
import React, { useEffect, useState } from 'react'
import DynamicList, { ListItem } from '../DynamicList'
import { useAuth } from '@/providers'
import { ThemedText } from '../ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TouchableHighlight, TouchableOpacity, View } from 'react-native'



export default function NextCard() {
    const [listData, setListData] = useState<ListItem[]>([])
    const AuthContext = useAuth();
    useEffect(() => {
        const fetchListData = async () => {
            const response = await listarProximasAtividades({ TITULO: AuthContext.user })
            setListData(nextActivityToListItems(response))
        }
        fetchListData();
    }, [])
    const activeBackground = useThemeColor({}, 'activeBackground');
    return (
        <>
            {listData &&
                <>
                    <DynamicList data={listData.slice(0, 5)} removeBottomBorder />
                    <TouchableOpacity onPress={()=>{console.log("Pressionad")}} style={{ paddingHorizontal: 20, backgroundColor: activeBackground, borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}>
                        <ThemedText style={{ textAlign: 'center', borderTopWidth:1, borderTopColor:"gray", paddingVertical:10 }}>Ver todas</ThemedText>
                    </TouchableOpacity>
                </>
            }
        </>
    )
}