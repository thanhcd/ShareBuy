import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/lib/GlobalProvider';
import icons from '@/constants/icons';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-5' onPress={onPress}>
      <View className='flex flex-row items-center flex-1 gap-3'>
        <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
        <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
      </View>
      <Text className='text-gray-200 mr-4'>hello</Text>
      {showArrow && <Image source={icons.right} className='size-5' />}
    </TouchableOpacity>
  )

}
const profile = () => {
  const { loading, isLogged, user, refetch } = useGlobalContext();

  if (!loading && isLogged) console.log("dang dang nhap")


  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-poppins-bold text-primary-200'>Profile</Text>
        </View>
        <View className='flex-row flex mt-5'>
          <View className='flex flex-row items-center relative mt-5'>
            <Image source={{ uri: user?.avatar }} className='size-28 relative rounded-full' />
            <View className='flex flex-col ml-5'>
              <Text className='text-lg font-poppins-bold mt-2 text-primary-200'>{user?.name}</Text>
              <Text className='text-gray-200 font-poppins-regular text-lg'>
                @{user?.email?.split('@')[0]}
              </Text>
            </View>
          </View>

        </View>
        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.gender} title='Giới tính' />
          <SettingsItem icon={icons.date} title='Sinh nhật' />
          <SettingsItem icon={icons.email} title='Email' />
          <SettingsItem icon={icons.phone} title='Số điện thoại' />
          <SettingsItem icon={icons.password} title='Thay đổi mật khẩu' />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile