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


export const Card = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 px-3 py-4 rounded-lg border border-gray-100 relative'>
            {/* <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50'>
          <Image source={icons.star} className='size-2.5' />
          <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>4.4</Text>
        </View> */}
            <Image source={images.shoe1} className='w-full h-40 rounded-lg' />
            <View className='flex flex-col mt-2'>
                <Text className='text-base font-poppins-bold text-primary-200'>Modern Shoe</Text>
                <View className='flex-row'>
                    <Image source={icons.star} />
                    <Image source={icons.star} />
                    <Image source={icons.star} />
                    <Image source={icons.star} />
                    <Image source={icons.star} />
                </View>
                <Text className='text-base font-poppins-bold text-primary-100 mt-5'>$299.43</Text>
                    <View className='flex-row gap-3'>
                        <Text className='text-sm font-poppins-bold text-gray-200' style={{ textDecorationLine: 'line-through' }}>
                            $534,33
                        </Text>
                        <Text className='text-sm font-poppins-bold text-red-100'>24% Off</Text>
                    </View>
            </View>
        </TouchableOpacity>
    )
}
