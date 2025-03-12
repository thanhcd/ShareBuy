import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  middleText?: string;
}

const CreditItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  middleText // Không có giá trị mặc định
}: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      {/* Icon + Title */}
      <View className='flex flex-row items-center flex-1 gap-3'>
        <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
        <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
      </View>

      {/* Chỉ hiển thị middleText nếu có truyền vào */}
      {middleText && <Text className='text-gray-500'>{middleText}</Text>}

      {/* Arrow (nếu có) */}
      {showArrow && <Image source={icons.right} className='size-5' />}
    </TouchableOpacity>
  )
}

const payment = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-7">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="flex-grow"
                >
                    <View className="flex-row py-5 items-center">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={icons.left} className="size-9 mr-2" />
                        </TouchableOpacity>
                        <Text className="text-xl font-poppins-bold text-primary-200">
                            Thanh toán
                        </Text>
                    </View>

                    <View className="gap-5 ">
                        <CreditItem title="Thẻ tín dụng hoặc ghi nợ" icon={icons.payment} onPress={() => router.push('/credit')}/>
                        <CreditItem title="Paypal" icon={icons.paypal} />
                    </View>
                </ScrollView>

 
            </View>
        </SafeAreaView>
    );
};

export default payment