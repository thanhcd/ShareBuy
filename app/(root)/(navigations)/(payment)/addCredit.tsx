import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton';


interface SettingsCreditProps {
    // icon: ImageSourcePropType;
    title: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    // onPress?: () => void;
    // textStyle?: string;
    // showArrow?: boolean;
    // middleText?: string;
}

const CreditItem = ({
    title,
    placeholder,
    keyboardType,
}: SettingsCreditProps) => {
    return (
        <View className='flex-1'>
            <View className='flex flex-col'>
                <Text className='text-lg font-poppins-bold text-primary-200'>
                    {title}
                </Text>
                <TextInput className='p-5 border border-gray-100' placeholder={placeholder} keyboardType={keyboardType}/>
            </View>
        </View>
    )
}

const addCredit = () => {
    return (
        <SafeAreaView className='h-full bg-white flex-1'>
            <View className="flex-1">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-32 px-7"
                >
                    <View className="flex-row py-5 items-center">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={icons.left} className="size-9 mr-2" />
                        </TouchableOpacity>
                        <Text className="text-xl font-poppins-bold text-primary-200">
                            Thêm thẻ
                        </Text>
                    </View>

                    <View className="flex-1 flex-col gap-5">
                        <CreditItem title="Số thẻ" />
                        <View className="flex flex-row gap-5">
                            <CreditItem title="Ngày hết hạn" />
                            <CreditItem title="Mã bảo mật" />
                        </View>
                        <CreditItem title="Tên chủ thẻ" />
                    </View>
                </ScrollView>

                {/* Button cố định ở cuối */}
                <View className="px-7 pb-10">
                    <CustomButton 
                        title="Thêm thẻ" 
                        containerStyles="bg-primary-100 rounded-lg"
                        textStyles="text-white"
                        handlePress={{}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default addCredit