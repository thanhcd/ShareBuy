import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';
import { router, useLocalSearchParams } from 'expo-router';
import { classify } from '@/constants/data';

interface ClassifyItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
}

const Classify = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedTitle, setSelectedTitle] = useState(params.filter || 'Váy');

    const handleTitlePress = (title: string) => {
        if (selectedTitle === title) {
            setSelectedTitle('Váy');
            router.setParams({ filter: 'Váy' });
            return;
        }
        setSelectedTitle(title);
        router.setParams({ filter: title });
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
                {/* Header */}
                <View className="flex-row py-5 items-center px-7">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Phân loại
                    </Text>
                </View>

                {/* Danh sách phân loại */}
                <View className="w-full border-t border-gray-100 py-5 px-2 gap-3">
                    {classify.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => handleTitlePress(item.title)}
                            className={`px-5 py-3 rounded-lg ${
                                selectedTitle === item.title ? 'bg-gray-100' : 'bg-white'
                            }`}
                        >
                            <View className="flex-row gap-5 items-center h-10">
                                <Image source={item.icon} className="size-8" />
                                <Text className={`text-base font-poppins-bold ${
                                    selectedTitle === item.title ? 'text-primary-200' : 'text-primary-200'
                                }`}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Classify;
