import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { productComment } from '@/constants/data';
import CustomButton from '@/components/CustomButton';

// Component CommentItem
export const CommentItem = ({ item }: { item?: any }) => {
    return (
        <View className="mt-5">
            <View className="flex flex-row gap-5">
                {/* Ảnh đại diện */}
                <Image source={item.image} className="w-12 h-12 rounded-full" resizeMode="contain" />

                {/* Thông tin người bình luận */}
                <View className="flex flex-col">
                    <Text className="text-primary-200 font-poppins-bold text-lg">{item.name}</Text>
                    <View className="flex flex-row">
                        {[...Array(5)].map((_, index) => (
                            <Image key={index} source={icons.star} className="w-4 h-4" />
                        ))}
                    </View>
                </View>
            </View>

            {/* Nội dung comment */}
            <View className='flex flex-col gap-5 mb-2'>
                <View className='mt-2'>
                    <Text className="text-lg font-poppins-regular text-gray-500">{item.describe}</Text>
                </View>
                <View>
                    <Text className="text-base font-poppins-regular text-gray-200">{item.date}</Text>
                </View>
            </View>
        </View>
    );
};


const ProductComment = () => {
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="w-9 h-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">Đánh giá</Text>
                </View>

                {/* Hiển thị danh sách comment */}
                <FlatList
                    data={productComment}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentItem item={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                />
                <CustomButton title='Viết đánh giá' containerStyles='bg-primary-100 rounded-lg mt-5' textStyles='text-white' handlePress={{}}/>
            </View>
        </SafeAreaView>
    );
};

export default ProductComment;
