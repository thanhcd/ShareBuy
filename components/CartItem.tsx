import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'

const CartItem = ({ item }: { item: any }) => {
    return (
        <View className="w-full p-4 border border-gray-100 rounded-lg flex flex-row items-center mb-4">
            {/* Hình ảnh sản phẩm */}
            <View className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image source={item.image} className="w-full h-full" resizeMode="cover" />
            </View>

            {/* Thông tin sản phẩm */}
            <View className="flex-1 flex flex-col ml-4">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-lg font-poppins-bold text-primary-200 flex-1" numberOfLines={2}>
                        {item.name}
                    </Text>
                    <View className="flex flex-row gap-2">
                        <TouchableOpacity>
                            <Image source={icons.love} className="size-8 opacity-50" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={icons.trash} className="size-7 opacity-50" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Giá sản phẩm */}
                <View className="flex flex-row items-center mt-2 justify-between">
                    {/* <Text className="text-lg font-poppins-bold text-gray-400 line-through mr-2">${item.price}</Text> */}
                    <Text className="text-lg font-poppins-bold text-primary-100">${item.discount}</Text>

                    {/* Bộ chọn số lượng */}
                    <View className="flex flex-row items-center border border-gray-100 rounded-lg overflow-hidden">
                        <TouchableOpacity className="w-10 h-10 flex items-center justify-center bg-white" onPress={() => onDecrease(item.id)}>
                            <Text className="text-lg text-gray-500 opacity-50">-</Text>
                        </TouchableOpacity>
                        <Text className="w-12 h-10 text-lg font-poppins-semibold bg-gray-100 flex items-center justify-center text-center">
                            {item.quantity}
                        </Text>
                        <TouchableOpacity className="w-10 h-10 flex items-center justify-center bg-white" onPress={() => onIncrease(item.id)}>
                            <Text className="text-lg text-gray-500 opacity-50">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    )
}

export default CartItem
