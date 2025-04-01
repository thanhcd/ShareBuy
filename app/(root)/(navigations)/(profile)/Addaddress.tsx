import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, KeyboardTypeOptions } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { getCurrentUser, getUserProfile } from '@/lib/appwrite';

interface SettingsAddressProps {
    title: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
}

const AddressItem = ({
    title,
    placeholder,
    keyboardType,
}: SettingsAddressProps) => {
    return (
        <View className="flex-1">
            <View className="flex flex-col">
                <Text className="text-lg font-poppins-bold text-primary-200">
                    {title}
                </Text>
                <TextInput
                    className="p-5 border border-gray-100"
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor="#9098B1"
                />
            </View>
        </View>
    );
};

interface Profile {
    name: string;
    email?: string;
    [key: string]: any;
}

interface UserCollectionData {
    Phone?: string;
    [key: string]: any;
}

const Address = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [userCollectionData, setUserCollectionData] = useState<UserCollectionData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setProfile(userData);

                    const profileData = await getUserProfile(userData.$id);
                    if (profileData) {
                        setUserCollectionData(profileData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Thêm địa chỉ
                    </Text>
                </View>
                <View className="gap-5">
                    <AddressItem
                        title="Họ và Tên"
                        placeholder={profile?.name || 'Tên chưa có'}
                        keyboardType="default"
                    />
                    <AddressItem title="Số nhà" placeholder="68 - 22" keyboardType="default" />
                    <AddressItem title="Tên đường" placeholder="3/2" keyboardType="default" />
                    <AddressItem title="Thành phố" placeholder="HCM" keyboardType="default" />
                    <AddressItem title="Phường/Huyện" placeholder="6" keyboardType="default" />
                    <AddressItem title="Zip Code" placeholder="70000" keyboardType="number-pad" />
                    <AddressItem
                        title="Số điện thoại"
                        placeholder={userCollectionData?.Phone || 'Số điện thoại chưa có'}
                        keyboardType="phone-pad"
                    />
                </View>

                <View className="pb-5">
                    <CustomButton
                        title={'Thêm địa chỉ'}
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={{}}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Address;
