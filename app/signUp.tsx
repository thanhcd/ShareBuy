import { View, Text, SafeAreaView, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import FormFields from '@/components/FormFields'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const SignUnScreen = () => {
    const [form, setForm] = useState();

    const handleSignIn = () => {
        router.push('/signIn')
    }
    return (
        <SafeAreaView className='w-full h-full bg-white'>
            <View className='px-5'>
                <View className='items-center'>
                    <Image source={images.sharebuy1} className='mt-14' />
                </View>
                <View className='py-2'>
                    <Text className='font-poppins-bold text-xl text-center text-primary-200'>Bắt đầu</Text>
                    <Text className='font-poppins-regular text-sm text-center text-gray-200 mt-2'>Tạo một tài khoản mới</Text>
                    <View className="w-full min-h-[83vh] flex">
                        <FormFields title="Tên đầy đủ"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="default"
                            placeholder="Tên đầy đủ"
                            icons={icons.user}
                        />
                        <FormFields title="Email"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="email-address"
                            placeholder="Email"
                            icons={icons.message}
                        />
                        <FormFields title="Mật khẩu"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="password"
                            placeholder="Mật khẩu"
                            icons={icons.password}
                        />
                        <FormFields title="Nhập lại mật khẩu"
                            otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
                            keyboardType="password"
                            placeholder="Nhập lại mật khẩu"
                            icons={icons.message}
                        />
                        <CustomButton title={'Đăng kí'}
                            textStyles={'text-white'}
                            containerStyles={'h-20 bg-primary-100 rounded-lg mt-5'}
                        />
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="font-poppins-regular text-sm text-gray-200">
                                Có tài khoản?
                            </Text>
                            <TouchableOpacity className="ml-1" onPress={() => handleSignIn()}>
                                <Text className="font-poppins-bold text-sm text-primary-100">
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

            </View>
        </SafeAreaView>

    )
}

export default SignUnScreen