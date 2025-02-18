import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
    onPress?: () => void;
}

export const Featuredcards = ({ onPress }: Props) => {
    return (
        <View className='w-40 h-60 border border-gray-100 flex py-4 items-center overflow-hidden rounded-md'>
            <TouchableOpacity onPress={onPress} className='flex flex-col items-center w-32 h-32 relative'>
                <Image source={images.shoe1} className='w-full h-full rounded-md' />
                <View className='flex flex-col items-start w-full mt-2'>
                    <View className='flex-col items-start w-full'>
                        <Text className='text-sm font-poppins-bold text-primary-200' numberOfLines={1}>
                            Modern Shoe
                        </Text>
                    </View>
                    <Text className='text-sm font-poppins-bold text-primary-100'>$299.43</Text>
                    <View className='flex-row gap-2'>
                        <Text className='text-xs font-poppins-bold text-gray-200' style={{ textDecorationLine: 'line-through' }}>
                            $534.33
                        </Text>
                        <Text className='text-xs font-poppins-bold text-red-100'>24% Off</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const Cards = ({ onPress }: Props) => {
    return (
        <View className='w-52 h-96 border border-gray-100 flex py-6 items-center overflow-hidden rounded-md'>
            <TouchableOpacity onPress={onPress} className='flex flex-col items-center w-40 h-44 relative'>
                <Image source={images.shoe1} className='w-full h-full rounded-md' />
                <View className='flex flex-col items-start w-full mt-3'>
                    <View className='flex-col items-start w-full py-2'>
                        <Text className='text-base font-poppins-bold text-primary-200' numberOfLines={1}>Modern Shoe</Text>
                        <View className='flex flex-row'>
                            <Image source={images.stargroup} className='w-5 h-5' />
                            <Image source={images.stargroup} className='w-5 h-5' />
                            <Image source={images.stargroup} className='w-5 h-5' />
                            <Image source={images.stargroup} className='w-5 h-5' />
                            <Image source={images.stargroup} className='w-5 h-5' />
                        </View>
                    </View>
                    <Text className='text-base font-poppins-bold text-primary-100'>$299.43</Text>
                    <View className='flex-row gap-3'>
                        <Text className='text-sm font-poppins-bold text-gray-200' style={{ textDecorationLine: 'line-through' }}>
                            $534,33
                        </Text>
                        <Text className='text-sm font-poppins-bold text-red-100'>24% Off</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}
