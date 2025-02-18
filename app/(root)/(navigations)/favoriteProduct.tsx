import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { Card } from '@/components/Cards'

const favoriteProduct = () => {
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
                                Sản phẩm yêu thích
                            </Text>
                        </View>
                    </View>

                }
            />

        </SafeAreaView>
    )

}

export default favoriteProduct