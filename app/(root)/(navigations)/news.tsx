import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import images from '@/constants/images';
import { router } from 'expo-router';



interface SettingsItemProps {
    image: ImageSourcePropType;
    title: string;
    detail?: string;
    date?: string;
    textStyle?: string;
}

const SettingsItem = ({
    image,
    title,
    textStyle,
    detail,
    date,
}: SettingsItemProps) => {
    return (
        <TouchableOpacity className='flex flex-row items-center justify-between py-3 w-full' >
            <View className='flex flex-row flex-1 gap-3'>
                <Image source={image} className='size-20' />
                <View className="flex flex-col gap-2 flex-shrink">
                    <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
                    <Text className={`text-base font-poppins-regular text-gray-200 ${textStyle}`}>{detail}</Text>
                    <Text className={`text-sm font-poppins-regular text-primary-200 ${textStyle}`}>{date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const news = () => {
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
                        Bảng tin
                    </Text>
                </View>

                {/* Thêm border ở trên phần "Giảm giá" */}
                <View className="flex flex-col mt-5 border-t border-gray-300 pt-4 gap-4">
                    <SettingsItem image={images.boost_yellow} title='Sản phẩm mới'
                        detail='Nike Air Zoom Pegasus 36 Miami - Special For your Activity'
                        date='June 3, 2015 5:06 PM' />
                    <SettingsItem image={images.boost_blue} title='Sản phẩm tốt nhất'
                        detail='Nike Air Zoom Pegasus 36 Miami - Special For your Activity'
                        date='June 3, 2015 5:06 PM' />
                    <SettingsItem image={images.boost_red} title='Sản phẩm mới'
                        detail='Nike Air Zoom Pegasus 36 Miami - Special For your Activity'
                        date='June 3, 2015 5:06 PM' />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default news