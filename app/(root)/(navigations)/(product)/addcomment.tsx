import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'

const addcomment = () => {
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Viết đánh giá
                    </Text>
                </View>
                <View>
                    <Text className="text-lg font-poppins-bold text-primary-200">Vui lòng viết mức độ hài lòng chung với Dịch vụ vận chuyển / giao hàng của bạn</Text>
                </View>
                <View className='mt-5'>
                    <Text className="text-lg font-poppins-bold text-primary-200">Viết đánh giá của bạn</Text>
                    <View className="border border-gray-100 h-40 px-3 py-3">
                        <TextInput
                            placeholder="Viết tại đây"
                            multiline={true}  // Cho phép xuống dòng
                            style={{ flex: 1, textAlignVertical: 'top' }} // Mở rộng chiều cao theo nội dung
                            maxLength={500}
                            className="text-gray-200 text-base font-poppins-regular"
                        />
                    </View>
                </View>
                <View className='mt-5'>
                    <Text className="text-lg font-poppins-bold text-primary-200">Thêm hình ảnh</Text>
                    <View>
                        <TouchableOpacity>
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default addcomment