import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import {useDebouncedCallback} from 'use-debounce';

const SearchBar = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?: string}>();
    const [search, setSearch] = useState(params.query)
    const debouncedSearch = useDebouncedCallback((text:string) => {
        router.setParams({query: text}), 500
    })
    const handleSearch = (text:string) =>{
        setSearch(text);
        debouncedSearch(text)
    }

    return (
        <View className="flex-row items-center bg-white">
            <View className="flex-row items-center flex-1 bg-white py-2 shadow-md rounded-lg border border-gray-100 mr-4">
                <Image source={icons.search} className="size-5 tint-primary-400 ml-5 mr-2" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor="#A0AEC0"
                    className="flex-1 text-gray-600 text-base font-poppins-regular"
                />
            </View>

            <View className="flex-row items-center gap-3">
                <TouchableOpacity>
                    <Image source={icons.love} className="size-6 opacity-50" />
                </TouchableOpacity>

                <TouchableOpacity className="relative" onPress={() => router.push("/notificate")}>
                    <Image source={icons.bell} className="size-5 opacity-50" />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default SearchBar;
