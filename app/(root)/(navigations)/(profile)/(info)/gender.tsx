import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import icons from '@/constants/icons';

const data = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
];

const Gender = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

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
                            borderColor:  '#9098B1' ,
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                        }}
                        data={data}
                        // search
                    
                        selectedTextStyle={{
                            fontFamily: 'Poppins-Bold', // Font đậm cho giá trị đã chọn
                            fontSize: 16,
                            color: '#9098B1', // Tailwind: gray-800
                        }}

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Nam' : '...'}
                        // searchPlaceholder="Tìm kiếm..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //     <AntDesign
                        //         style={{ marginRight: 10 }}
                        //         color={isFocus ? 'blue' : 'black'}
                        //         name="user"
                        //         size={20}
                        //     />
                        // )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Gender;
