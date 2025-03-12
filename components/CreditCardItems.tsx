import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'

const CreditCardItem = ({ idcard, name, date, bgColor, color}) => {
    return (
        <View className={`${bgColor} w-full px-5 py-5 relative rounded-lg mb-4`}>
            <View className='flex flex-col gap-10'>
                <View className='flex flex-row'>
                    <Image source={icons.elips} />
                    <Image source={icons.elips} />
                </View>
                <View className='flex-1'>
                    <Text className='font-poppins-bold text-3xl text-white'>
                        {idcard}
                    </Text>
                </View>
                <View className='flex flex-row gap-5 flex-1'>
                    <View>
                        <Text className='font-poppins-regular text-white text-xl font-thin'>Card holder</Text>
                        <Text className='font-poppins-regular text-white text-xl font-bold'>{name}</Text>
                    </View>
                    <View>
                        <Text className='font-poppins-regular text-white text-xl font-thin'>Card Save</Text>
                        <Text className='font-poppins-regular text-white text-xl font-bold'>{date}</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default CreditCardItem
