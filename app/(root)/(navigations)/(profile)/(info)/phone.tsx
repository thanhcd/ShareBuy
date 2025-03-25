import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/lib/GlobalProvider'
import { updateProfileField } from '@/lib/appwrite'

const phone = () => {
  const { user } = useGlobalContext();

  const userIdAuth: string = user?.$id || "";
  const [phone, setPhone] = useState("");

  const handleSavePhone = async () => {
      if (!phone.trim()) {
          alert("Vui lòng nhập số điện thoại!");
          return;
      }
  
      try {
          await updateProfileField(userIdAuth, "Phone", phone.trim());
          alert("Cập nhật số điện thoại thành công!");
      } catch (error) {
          alert("Cập nhật số điện thoại không thành công!");
          console.error("Lỗi khi cập nhật số điện thoại:", error);
      }
  };
  return (
    <SafeAreaView className="h-full bg-white flex-1">
      <View className="flex-1 px-7 pb-5">
        {/* Header */}
        <View className="flex-row py-5 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.left} className="w-9 h-9 mr-2" />
          </TouchableOpacity>
          <Text className="text-xl font-poppins-bold text-primary-200">
            Số điện thoại
          </Text>
        </View>
        <View className='flex-1 flex-col gap-5'>
          <Text className="text-lg font-poppins-bold text-primary-200">
            Số điện thoại
          </Text>
          <View className="flex-row items-center bg-white py-2 shadow-md rounded-lg border border-gray-100 mr-4">
            <Image source={icons.phoneg} className="size-8 tint-primary-400 ml-5 mr-2" />
            <TextInput
              keyboardType="phone-pad"
              placeholder="(307) 555-0133"
              placeholderTextColor="#A0AEC0"
              onChangeText={setPhone}
              className="flex-1 text-gray-200 text-base font-poppins-regular font-extrabold"
            />
          </View>
        </View>
        <View className='mt-auto pb-5'>
          <CustomButton title='Save' handlePress={handleSavePhone} containerStyles='bg-primary-100 rounded-lg' textStyles='text-white' />
        </View>
      </View>
    </SafeAreaView>


  )
}

export default phone