import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { Card } from '@/components/Cards'

const flashsale = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, []);

    return (
        <SafeAreaView className="h-full bg-white px-5">
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => <Card />}
                keyExtractor={(item) => item.toString()}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex-1 gap-5 "
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View className="flex-row py-5 items-center">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Image source={icons.left} className="size-9 mr-2" />
                            </TouchableOpacity>
                            <Text className="text-xl font-poppins-bold text-primary-200">
                                Super Flash Sale
                            </Text>
                        </View>
                        <View className="flex relative gap-5 mt-5">
                            <View className="relative">
                                <Image source={images.promotion} className="w-full rounded-md" />
                                <View className="absolute inset-0 flex flex-col justify-center items-start px-5 gap-y-5">
                                    <Text
                                        className="text-white font-poppins-bold text-2xl text-start max-w-52"
                                        numberOfLines={2}
                                    >
                                        Flash Sale
                                    </Text>
                                    <View className="flex-row gap-2 items-center">
                                        <View className="bg-white px-4 py-2 rounded-md">
                                            <Text className="font-bold text-lg text-black">
                                                {currentDateTime.getHours()}
                                            </Text>
                                        </View>
                                        <Text className="text-white font-bold text-lg">:</Text>
                                        <View className="bg-white px-4 py-2 rounded-md">
                                            <Text className="font-bold text-lg text-black">
                                                {currentDateTime.getMinutes()}
                                            </Text>
                                        </View>
                                        <Text className="text-white font-bold text-lg">:</Text>
                                        <View className="bg-white px-4 py-2 rounded-md">
                                            <Text className="font-bold text-lg text-black">
                                                {currentDateTime.getSeconds()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                }
            />

        </SafeAreaView>
    )

}

export default flashsale