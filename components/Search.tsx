import icons from '@/constants/icons';
import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';

const SearchBar = () => {
    return (
        <View className="flex-row items-center bg-white">
            <View className="flex-row items-center flex-1 bg-white py-2 shadow-md rounded-lg border border-gray-100 mr-4">
                <Image source={icons.search} className="size-5 tint-primary-400 ml-5 mr-2" />
                <TextInput
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor="#A0AEC0"
                    className="flex-1 text-gray-600 text-base font-poppins-regular"
                />
            </View>

            <View className="flex-row items-center gap-3">
                <TouchableOpacity>
                    <Image source={icons.love} className="w-1/12 h-1/24 opacity-50" />
                </TouchableOpacity>

                <TouchableOpacity className="relative">
                    <Image source={icons.bell} className="w-1/12 h-1/24 opacity-50" />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default SearchBar;
