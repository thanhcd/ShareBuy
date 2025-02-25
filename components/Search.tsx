import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

interface SearchItemProps {
    icon: ImageSourcePropType;
    onPress?: () => void;
}
const FilterItem = ({ icon, onPress }: SearchItemProps) => {
    return (
        <TouchableOpacity className="relative" onPress={onPress}>
            <Image source={icon} className={icon === icons.mic ? "size-7" : "size-5 opacity-50"} />
        </TouchableOpacity>
    );
};


interface SearchBarProps {
    leftIcon?: ImageSourcePropType;
    rightIcon?: ImageSourcePropType;
    micIcon? : ImageSourcePropType;
    onLeftPress?: () => void;
    onRightPress?: () => void;
    onMicPress?: () => void;
}

const SearchBar = ({
    leftIcon,
    rightIcon,
    micIcon,
    onLeftPress,
    onRightPress,
    onMicPress
}: SearchBarProps) => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query || '');
    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
    }, 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    };

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

            {/* Nếu search có nội dung thì hiển thị icon micro, nếu không thì 2 icon filter */}
            {search.length > 0 ? (
                <FilterItem icon={micIcon} onPress={() => console.log('Micro pressed')} />
            ) : (
                <View className="flex-row items-center gap-3">
                    <FilterItem icon={leftIcon} onPress={onLeftPress} />
                    <FilterItem icon={rightIcon} onPress={onRightPress} />
                </View>
            )}
        </View>
    );
};

export default SearchBar;
