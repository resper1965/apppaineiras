//Consultas e Exames
import DynamicList, { ListItem } from '@/components/DynamicList'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Wrapper } from '@/components/Wrapper'
import { router } from 'expo-router'
import React, { useState } from 'react'

export default function home() {
    const menuItems: ListItem[] = [{
        title: 'Consultas Agendadas',
        category: '',
        icon: 'user-doctor',
        iconLibrary: 'fontawesome',
        id: "0",
        onPress: () => { }
    }, {
        title: 'Vencimento de Exames',
        category: '',
        icon: 'file-clipboard',
        iconLibrary: 'fontawesome',
        id: "1",
        onPress: () => { }
    }]

    const handlePress = (item: ListItem) => {
        if (item.id === '0') {
            router.push({
                pathname: '/(consulta)/scheduledAppointments'
            })
        }
        if (item.id === '1') {
           router.push({
                pathname: '/(consulta)/scheduledExams'
            })
        }
    }

    return (
        <Wrapper
            primaryButtonLabel='Nova Consulta'
            onPrimaryPress={() => { }}
        >
            <DynamicList data={menuItems} onClickPrimaryButton={handlePress} />
        </Wrapper>
    )
}