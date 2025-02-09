import { View, Text, SafeAreaView, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const LoginScreen = () => {
    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.login} className='w-full h-4/6' />
                <View className='px-10 py-2'>
                    <Text className='font-outfit-bold text-3xl text-center'>Ready to make a new friends?</Text>
                    <Text className='font-outfit mt-5 text-base text-center text-gray'>Let's adopt the pet which you like and make there life happy again!</Text>
                    <Pressable className="p-5 mt-5 bg-primary rounded-[14px] w-full">
                        <Text className='font-outfit-medium text-lg text-center'>Get Started</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen