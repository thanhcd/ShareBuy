import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { AddressData, CreditCard } from '@/constants/data'
import CreditCardItem from '@/components/CreditCardItems'

interface AddressItemProps {
    name?: string,
    place?: string,
    phone?: string,

}

const AddressItem = ({
    name,
    place,
    phone,
}: AddressItemProps) => {
    return (
        < View className='flex flex-col py-6 px-6 border border-primary-100 rounded-lg gap-5 mb-10' >
            <Text className='font-poppins-bold text-lg text-primary-200'>{name}</Text>
            <Text className='font-poppins-regular text-xm text-gray-200'>{place}</Text>
            <Text className='font-poppins-regular text-xm text-gray-200'>{phone}</Text>
            <View className='flex flex-row items-center gap-8'>
                <CustomButton title='Sửa' containerStyles='bg-primary-100 px-8 rounded-lg' textStyles='text-white' handlePress={{}}/>
                <Image source={icons.trash} className='size-7' />
            </View>
        </View >

    )
}

const address = () => {
    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Địa chỉ
                    </Text>
                </View>

                <FlatList
                    data={AddressData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <AddressItem
                            name={item.name}
                            phone={item.phone}
                            place={item.place}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {/* Nút thêm thẻ */}
                <View className="w-full">
                    <CustomButton
                        title="Thêm địa chỉ"
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={() => router.push('/Addaddress')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default address
