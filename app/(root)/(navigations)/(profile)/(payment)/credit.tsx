import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { CreditCard } from '@/constants/data'
import CreditCardItem from '@/components/CreditCardItems'

const credit = () => {
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Thẻ tín dụng hoặc ghi nợ
                    </Text>
                </View>

                {/* Danh sách thẻ (FlatList) */}
                <FlatList
                    data={CreditCard}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <CreditCardItem
                            idcard={item.idcard}
                            name={item.name}
                            date={item.date}
                            bgColor={CreditCard.length > 2 && index === 1 ? "bg-primary-300" : "bg-primary-100"}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {/* Nút thêm thẻ */}
                <View className="w-full">
                    <CustomButton
                        title="Thêm thẻ"
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={() => router.push('/addCredit')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default credit
