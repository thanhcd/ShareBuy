import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import { filterbuyForm, filterConditions, filterLook, filterPosition } from '@/constants/data'


const SearchFilter = () => {
    const [selectedBtn, setSelectedBtn] = useState("Mới");

    const handleBtnPress = (id: string) => {
        setSelectedBtn(id);
        router.setParams({ filter: id }); // Cập nhật URL filter
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView className="pb-32 px-7">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.x} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">Tìm theo lọc</Text>
                </View>

                {/* Khoảng giá */}
                <View className="w-full">
                    <Text className="text-xl font-poppins-bold text-primary-200">Khoảng giá</Text>
                    <View className="flex flex-row mt-5 gap-4">
                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center">
                            <TextInput
                                placeholder="100.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold"
                                keyboardType="numeric"
                                textAlignVertical="bottom"
                            />
                        </View>
                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center">
                            <TextInput
                                placeholder="200.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>

                <View className="mt-5">
                    <Text className="text-xl font-poppins-bold text-primary-200">Tình trạng mua</Text>

                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-3">
                        {filterConditions.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleBtnPress(item.id)}
                                className={`px-5 py-3 rounded-md ${selectedBtn === item.id ? "bg-primary-100" : "border border-gray-300"
                                    }`}
                            >
                                <Text
                                    className={`text-lg font-poppins-bold ${selectedBtn === item.id ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="mt-5">
                    <Text className="text-xl font-poppins-bold text-primary-200">Định dạng mua</Text>

                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-3">
                        {filterbuyForm.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleBtnPress(item.id)}
                                className={`px-5 py-3 rounded-md ${selectedBtn === item.id ? "bg-primary-100" : "border border-gray-300"
                                    }`}
                            >
                                <Text
                                    className={`text-lg font-poppins-bold ${selectedBtn === item.id ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="mt-5">
                    <Text className="text-xl font-poppins-bold text-primary-200">Vị trí</Text>

                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-3">
                        {filterPosition.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleBtnPress(item.id)}
                                className={`px-5 py-3 rounded-md ${selectedBtn === item.id ? "bg-primary-100" : "border border-gray-300"
                                    }`}
                            >
                                <Text
                                    className={`text-lg font-poppins-bold ${selectedBtn === item.id ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


                <View className="mt-5">
                    <Text className="text-xl font-poppins-bold text-primary-200">Chỉ hiện</Text>

                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 mt-3">
                        {filterLook.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleBtnPress(item.id)}
                                className={`px-5 py-3 rounded-md ${selectedBtn === item.id ? "bg-primary-100" : "border border-gray-300"
                                    }`}
                            >
                                <Text
                                    className={`text-lg font-poppins-bold ${selectedBtn === item.id ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Nút xác nhận */}
                <CustomButton
                    title="Xác nhận"
                    containerStyles="bg-primary-100 mt-5 rounded-lg"
                    textStyles="text-white"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchFilter;
