import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import { router } from 'expo-router';
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;

}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,

}: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      {/* Icon + Title */}
      <View className='flex flex-row items-center flex-1 gap-3'>
        <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
        <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
      </View>

    </TouchableOpacity>
  )
}
const addCard = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className="flex-row py-5 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.left} className="size-9 mr-2" />
          </TouchableOpacity>
          <Text className="text-xl font-poppins-bold text-primary-200">
            Thanh toán
          </Text>
        </View>

        <View className='flex flex-col gap-2'>
          <SettingsItem icon={icons.payment} title='Thẻ tín dụng hoặc ghi nợ' onPress={() =>router.push('./addCredit')}/>
          <SettingsItem icon={icons.paypal} title='Paypal' />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default addCard