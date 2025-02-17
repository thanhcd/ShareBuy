import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
    onPress?: () => void;
}

export const Featuredcards = ({ onPress }: Props) => {
    return (
        <View className='w-52 h-72 border border-gray-100 flex py-5 items-center overflow-hidden rounded-md'>
            <TouchableOpacity onPress={onPress} className='flex flex-col items-center w-40 h-40 relative'>
                <Image source={images.shoe1} className='w-full h-full rounded-md' />
                <View className='flex flex-col items-start w-full mt-3'>
                    <View className='flex-row items-start w-full'>
                        <Text className='text-base font-poppins-bold text-primary-200' numberOfLines={1}>Modern Shoe</Text>
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

export const Cards = () => {
    return (
        <View>
            <Text>Cards</Text>
        </View>
    )
}
