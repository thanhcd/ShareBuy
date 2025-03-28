import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import { router } from 'expo-router';



interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    detail?: string;
    date?: string;
    textStyle?: string;
}

const SettingsItem = ({
    icon,
    title,
    textStyle,
    detail,
    date,
}: SettingsItemProps) => {
    return (
        <TouchableOpacity className='flex flex-row items-center justify-between py-3 w-full' >
            <View className='flex flex-row flex-1 gap-3'>
                <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
                <View className="flex flex-col gap-2 flex-shrink">
                    <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
                    <Text className={`text-base font-poppins-regular text-gray-200 ${textStyle}`}>{detail}</Text>
                    <Text className={`text-sm font-poppins-regular text-primary-200 ${textStyle}`}>{date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const offer = () => {
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
                        Giảm giá
                    </Text>
                </View>

                {/* Thêm border ở trên phần "Giảm giá" */}
                <View className="flex flex-col mt-5 border-t border-gray-300 pt-4 gap-4">
                    <SettingsItem icon={icons.offer} title='Tiêu đề hay nhất'
                        detail='Mặt hàng tốt nhất đã có mặt trên Sharebuy, hãy nhấp vào đây.'
                        date='April 30, 2014 1:01 PM' />
                    <SettingsItem icon={icons.offer} title='ƯU ĐÃI MÙA HÈ Hoàn tiền 98%'
                        detail='Mua quần áo với giá rẻ'
                        date='April 30, 2014 1:01 PM' />
                    <SettingsItem icon={icons.offer} title='Ưu đãi đặc biệt GIẢM GIÁ 25%'
                        detail='Nhấp vào đây để xem giảm giá'
                        date='April 30, 2014 1:01 PM' />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default offer