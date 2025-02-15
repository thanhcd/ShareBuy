import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';


interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showMark?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
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
    <SafeAreaView className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-poppins-bold text-primary-200">
            Thông báo
          </Text>
        </View>

        {/* Thêm border ở trên phần "Giảm giá" */}
        <View className="flex flex-col mt-10 border-t border-gray-300 pt-4">
          <SettingsItem icon={icons.offer} title="Giảm giá" />
          <SettingsItem icon={icons.list} title="Bảng tin" />
          <SettingsItem icon={icons.bell} title="Hoạt động" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );

}

export default notificate