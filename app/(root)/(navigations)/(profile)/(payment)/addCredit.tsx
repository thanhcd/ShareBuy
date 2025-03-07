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
                <TextInput className='p-5 border border-gray-100' placeholder={placeholder} keyboardType={keyboardType} />
            </View>
        </View>
    )
}

const addcredit = () => {
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
                        Thêm thẻ
                    </Text>
                </View>
                <View className='gap-5 flex-col'>
                    <CreditItem title='Số thẻ' placeholder='1234-5678-0000-0000' keyboardType={'number-pad'} />

                    <View className='flex flex-row gap-5 flex-1'>
                        <CreditItem title='Ngày hết hạn' placeholder='MM/YY' keyboardType={'number-pad'} />
                        <CreditItem title='Mã bảo mật' placeholder='123' keyboardType={'number-pad'} />
                    </View>

                    <CreditItem title='Tên chủ thẻ' placeholder='Nguyen Van A' keyboardType={'default'} />
                </View>

                <CustomButton title={'Thêm địa chỉ'} containerStyles='bg-primary-100 mt-5 rounded-lg' textStyles='text-white' handlePress={{}} />
            </ScrollView>
        </SafeAreaView>


    )
}

export default addcredit