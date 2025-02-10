import { View, Text, SafeAreaView, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import FormFields from '@/components/FormFields'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'

const LoginScreen = () => {
    const [form, setForm] = useState();

    return (
        <SafeAreaView className='w-full h-full bg-white'>
            <View className='px-5'>
                <View className='items-center'>
                    <Image source={images.sharebuy1} className='mt-14' />
                </View>
                <View className='py-2'>
                    <Text className='font-poppins-bold text-xl text-center text-primary-200'>Chào mừng đến với ShareBuy</Text>
                    <Text className='font-poppins-regular text-base text-center text-gray mt-2'>Đăng nhập để tiếp tục</Text>
                    <View className="w-full min-h-[83vh] flex">
                        <FormFields title="Email"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="email-address"
                            placeholder="Email của bạn"
                            icons={icons.message}
                        />
                        <FormFields title="Password"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="password"
                            placeholder="Mật khẩu"
                            icons={icons.password}
                        />
                        <CustomButton 
                        title="Đăng nhập"
                        handlePress={() => {

                        }}
                        containerStyles="h-20 bg-primary-100 rounded-lg mt-5"
                        textStyles="text-white"/>
                    </View>

                    <Pressable className="p-5 mt-5 bg-primary rounded-[14px] w-full">
                        <Text className='font-outfit-medium text-lg text-center'>Get Started</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>

    )
}

export default LoginScreen