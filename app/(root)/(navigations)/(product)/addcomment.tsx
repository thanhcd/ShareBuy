import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/CustomButton';

const AddComment = () => {
    const [images, setImages] = useState<string[]>([]); // Lưu danh sách ảnh

    const pickImage = async () => {
        if (images.length >= 5) {
            Alert.alert('Thông báo', 'Bạn chỉ có thể thêm tối đa 5 ảnh.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Cắt ảnh vuông
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]); // Thêm ảnh vào danh sách
        }
    };

    return (
        <SafeAreaView className="h-full bg-white px-7">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 ">
                
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Viết đánh giá
                    </Text>
                </View>

                {/* Nội dung đánh giá */}
                <View>
                    <Text className="text-lg font-poppins-bold text-primary-200">
                        Vui lòng viết mức độ hài lòng chung với Dịch vụ vận chuyển / giao hàng của bạn
                    </Text>
                </View>

                {/* Ô nhập đánh giá */}
                <View className="mt-5">
                    <Text className="text-lg font-poppins-bold text-primary-200">Viết đánh giá của bạn</Text>
                    <View className="border border-gray-300 h-40 px-3 py-3 rounded-lg mt-2">
                        <TextInput
                            placeholder="Viết tại đây..."
                            multiline
                            maxLength={500}
                            style={{ flex: 1, textAlignVertical: 'top' }}
                            className="text-gray-600 text-base font-poppins-regular"
                        />
                    </View>
                </View>

                {/* Thêm hình ảnh */}
                <View className="mt-5">
                    <Text className="text-lg font-poppins-bold text-primary-200">Thêm hình ảnh</Text>
                    <View className="flex-row mt-2">
                        
                        {/* Hiển thị danh sách ảnh */}
                        {images.map((img, index) => (
                            <Image key={index} source={{ uri: img }} className="w-20 h-20 mr-2 rounded-lg border border-gray-300" />
                        ))}

                        {/* Nút thêm ảnh nếu chưa đủ 3 ảnh */}
                        {images.length < 3 && (
                            <TouchableOpacity
                                onPress={pickImage}
                                className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center"
                            >
                                <Text className="text-2xl text-gray-400">+</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

            </ScrollView>
            <CustomButton title='Đánh giá' containerStyles='bg-primary-100 rounded-lg mb-5' textStyles='text-white' handlePress={{}}/>
        </SafeAreaView>
    )
}

export default AddComment;
