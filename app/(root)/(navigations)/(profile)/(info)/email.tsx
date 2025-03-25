import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/lib/GlobalProvider'
import { updateProfileField } from '@/lib/appwrite'

const email = () => {
    const { user } = useGlobalContext();

    const userIdAuth: string = user?.$id || "";
    const [email, setEmail] = useState("");

    const handleSaveEmail = async () => {
        if (!email) {
            alert("Vui lòng nhập Email");
            return;
        }
        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            alert("Email không hợp lệ! Vui lòng nhập đúng định dạng.");
            return;
        }
        try {
            await updateProfileField(userIdAuth, "Email", email.trim());
            alert("Cập nhật email thành công!");
        } catch (error) {
            alert("Cập nhật email không thành công!");
            console.error("Lỗi khi cập nhật email:", error);
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
                        Email
                    </Text>
                </View>
                <View className='flex-1 flex-col gap-5'>
                    <Text className="text-lg font-poppins-bold text-primary-200">
                        Thay đổi Email
                    </Text>
                    <View className="flex-row items-center bg-white py-2 shadow-md rounded-lg border border-gray-100 mr-4">
                        <Image source={icons.message} className="size-8 tint-primary-400 ml-5 mr-2" />
                        <TextInput
                            placeholder="Derlaxy@yahoo.com"
                            placeholderTextColor="#A0AEC0"
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            className="flex-1 text-gray-200 text-base font-poppins-regular font-extrabold"
                        />
                    </View>
                    <Text className='text-lg text-primary-100 font-poppins-regular'>Chúng tôi sẽ gửi những thông tin giảm giá bằng email</Text>
                </View>
                <View className='mt-auto pb-5'>
                    <CustomButton title='Save' handlePress={handleSaveEmail} containerStyles='bg-primary-100 rounded-lg' textStyles='text-white' />
                </View>
            </View>
        </SafeAreaView>


    )
}

export default email