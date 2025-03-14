import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'

const date = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="w-9 h-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Ngày tháng năm sinh
                    </Text>
                </View>
                
            </View>
        </SafeAreaView>


    )
}

export default date

