import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import { router } from 'expo-router';


interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  handlePress?: () => void;
  textStyle?: string;
  showMark?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  handlePress,
  textStyle,
  showMark = true
}: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      <View className='flex flex-row items-center flex-1 gap-3'>
        <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
        <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
      </View>
      {showMark && <Image source={icons.mark} className='size-6' />}
    </TouchableOpacity>
  )
}

const notificate = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex-row py-5 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.left} className="size-9 mr-2"/>
          </TouchableOpacity>
          <Text className="text-xl font-poppins-bold text-primary-200">
            Thông báo
          </Text>
        </View>

        {/* Thêm border ở trên phần "Giảm giá" */}
        <View className="flex flex-col mt-5 border-t border-gray-100 pt-4 gap-4">
          <SettingsItem icon={icons.offer} title="Giảm giá" onPress={() => router.push('/discount')} />
          <SettingsItem icon={icons.list} title="Bảng tin" onPress={() => router.push('/news')} />
          <SettingsItem icon={icons.bell} title="Hoạt động" onPress={() => router.push('/activity')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );

}

export default notificate