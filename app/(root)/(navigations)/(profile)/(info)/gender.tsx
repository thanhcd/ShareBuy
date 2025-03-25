import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import { createOrUpdateUserProfile, updateProfileField } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/GlobalProvider';

const data = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
];

const Gender = () => {
    const { loading, isLogged, user, refetch } = useGlobalContext();

    const userIdAuth: string = user?.$id || "";
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const handleSaveGender = () => {
        if (!value) {
            alert("Vui lòng chọn giới tính!");
            return;
        }
    
        // Lấy label từ data dựa trên value được chọn
        const selectedGender = data.find(item => item.value === value)?.label;
    
        if (!selectedGender) {
            alert("Giới tính không hợp lệ!");
            return;
        }
    
        updateProfileField(userIdAuth, "Gender", selectedGender);
        alert("Cập nhật giới tính thành công")
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
                        Giới tính
                    </Text>
                </View>

                {/* Dropdown */}
                <View className="flex flex-col gap-5">
                    <Text className="text-lg text-primary-200 font-poppins-bold">
                        Chọn giới tính
                    </Text>

                    <Dropdown
                        style={{
                            height: 50,
                            borderColor: '#9098B1',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                        }}
                        data={data}
                        selectedTextStyle={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 16,
                            color: '#9098B1',
                        }}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Chọn giới tính' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>

                {/* Nút Save */}
                <View className='mt-auto pb-5'>
                    <CustomButton
                        title='Save'
                        handlePress={handleSaveGender}
                        containerStyles='bg-primary-100 rounded-lg'
                        textStyles='text-white'
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Gender;
