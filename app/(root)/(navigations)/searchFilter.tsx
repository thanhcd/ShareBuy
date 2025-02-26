import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'

const searchFilter = () => {
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                {/* Header */}
                <View className="flex-row py-5 items-center ">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.x} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Tìm theo lọc
                    </Text>
                </View>
                <View className="w-full">
                    <Text className="text-xl font-poppins-bold text-primary-200">Khoảng giá</Text>
                    <View className="flex flex-row mt-10 gap-4">
                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center ">
                            <TextInput
                                placeholder="100.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold "
                                keyboardType='numeric'
                                textAlignVertical='bottom'
                            />
                        </View>

                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center">
                            <TextInput
                                placeholder="200.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold "
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default searchFilter