import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import { orderData } from '@/constants/data'
import OrderItem from '@/components/OrderItem'
import CustomButton from '@/components/CustomButton'


const orderDetail = () => {
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="w-9 h-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Chi tiết đặt hàng
                    </Text>
                </View>

                <View>
                    <Text className='text-primary-200 font-poppins-bold text-lg'>Sản phẩm</Text>
                    <View>
                        <FlatList
                            data={orderData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <OrderItem item={item} />}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                        />
                    </View>
                    <View className='mt-2'>
                        <Text className='text-primary-200 font-poppins-bold text-lg'>Chi tiết giao hàng</Text>
                        <View className='flex flex-col gap-3 border border-gray-100 py-5 px-5 rounded-lg'>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Ngày giao hàng
                                </Text>
                                <Text className='font-poppins-regular'>
                                    January 16, 2015
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Đơn vị
                                </Text>
                                <Text className='font-poppins-regular'>
                                    POS Reggular
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    No. Resi
                                </Text>
                                <Text className='font-poppins-regular'>
                                    000192848573
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Địa chỉ
                                </Text>
                                <Text className='font-poppins-regular'>
                                    IUH
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='mt-2'>
                        <Text className='text-primary-200 font-poppins-bold text-lg'>Chi tiết thanh toán</Text>
                        <View className='flex flex-col gap-3 border border-gray-100 py-5 px-5 rounded-lg'>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Giá sản phẩm
                                </Text>
                                <Text className='font-poppins-regular'>
                                    $598.86
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Phí giao hàng
                                </Text>
                                <Text className='font-poppins-regular'>
                                    $40.00
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-gray-200 font-poppins-regular'>
                                    Giá giảm
                                </Text>
                                <Text className='font-poppins-regular'>
                                    -$128.00
                                </Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-primary-200 font-poppins-bold'>
                                    Total price
                                </Text>
                                <Text className='font-poppins-bold text-primary-100'>
                                    $766.86
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='pb-5'>
                        <CustomButton title='Thông báo cho tôi' handlePress={{}} containerStyles='bg-primary-100 mt-5 rounded-lg' textStyles='text-white'/>

                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default orderDetail