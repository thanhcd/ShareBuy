import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'

const order = () => {
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="w-9 h-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Đặt hàng
                    </Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/orderDetail')}>
                    <View className='flex flex-col gap-2 border border-gray-100 py-5 px-5 rounded-lg'>
                        <Text className='text-primary-200 font-poppins-bold text-lg'>
                            LQNSU346JK
                        </Text>
                        <Text className='text-gray-200 font-poppins-regular'>Order at Lafyuu : August 1, 2017</Text>
                        <View className='flex flex-row justify-between'>
                            <Text className='text-gray-200 font-poppins-regular'>
                                Trạng thái
                            </Text>
                            <Text className='font-poppins-regular'>
                                Đang giao
                            </Text>
                        </View>
                        <View className='flex flex-row justify-between'>
                            <Text className='text-gray-200 font-poppins-regular'>
                                Sản phẩm
                            </Text>
                            <Text className='font-poppins-regular'>
                                2
                            </Text>
                        </View>
                        <View className='flex flex-row justify-between'>
                            <Text className='text-gray-200 font-poppins-regular'>
                                Giá
                            </Text>
                            <Text className='font-poppins-bold text-primary-100'>
                                $299,43
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default order