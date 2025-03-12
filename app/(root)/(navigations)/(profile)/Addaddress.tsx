import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton';


interface SettingsAddressProps {
    // icon: ImageSourcePropType;
    title: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    // onPress?: () => void;
    // textStyle?: string;
    // showArrow?: boolean;
    // middleText?: string;
}

const AddressItem = ({
    title,
    placeholder,
    keyboardType,
}: SettingsAddressProps) => {
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

const address = () => {
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
                        Thêm địa chỉ
                    </Text>
                </View>
                <View className='gap-5'>
                    <AddressItem title='Họ' placeholder='Châu' keyboardType={'default'} />
                    <AddressItem title='Tên' placeholder='Thạnh' keyboardType={'default'} />
                    <AddressItem title='Số nhà' placeholder='68 - 22' keyboardType={'default'} />
                    <AddressItem title='Tên đường' placeholder='3/2' keyboardType={'default'} />
                    <AddressItem title='Thành phố' placeholder='HCM' keyboardType={'default'} />
                    <AddressItem title='Phường/Huyện' placeholder='6' keyboardType={'default'} />
                    <AddressItem title='Zip Code' placeholder='70000' keyboardType={'number-pad'} />
                    <AddressItem title='Số điện thoại' placeholder='0999999999' keyboardType={'phone-pad'} />

                </View>

                <View className='pb-5'>
                    <CustomButton title={'Thêm địa chỉ'} containerStyles='bg-primary-100 mt-5 rounded-lg' textStyles='text-white' handlePress={{}} />

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default address