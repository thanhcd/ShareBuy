import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import { addAddressUser, getCurrentUser } from '@/lib/appwrite';
import CustomButton from '@/components/CustomButton';

const AddressItem = ({ title, placeholder, keyboardType, value, onChangeText }: any) => {
    return (
        <View className="flex-1">
            <View className="flex flex-col">
                <Text className="text-lg font-poppins-bold text-primary-200">{title}</Text>
                <TextInput
                    className="p-5 border border-gray-100 rounded-lg"
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor="#9098B1"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const Address = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [addressDetails, setAddressDetails] = useState({
        country: 'Việt Nam',
        house_no: '',
        street: '',
        city: '',
        district: '',
        zipcode: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user && user.$id) {
                setUserId(user.$id);
            }
        };

        fetchUser();
    }, []);

    const handleSaveAddress = async () => {
        if (!userId) {
            Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
            return;
        }
        console.log('Dữ liệu địa chỉ trước khi gửi:', addressDetails);
        try {
            const response = await addAddressUser(userId, addressDetails);
            if (response) {
                Alert.alert('Thành công', 'Địa chỉ đã được lưu thành công.');
                router.back(); // Quay lại trang trước
            } else {
                Alert.alert('Lỗi', 'Không thể lưu địa chỉ.');
            }
        } catch (error) {
            console.error('Lỗi khi lưu địa chỉ:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu địa chỉ.');
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-xl font-poppins-bold text-primary-200">←</Text>
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200 ml-4">
                        Thêm địa chỉ
                    </Text>
                </View>
                <View className="gap-5">
                    <AddressItem
                        title="Số nhà"
                        placeholder="Nhập số nhà"
                        keyboardType="default"
                        value={addressDetails.house_no}
                        onChangeText={(text: any) =>
                            setAddressDetails({ ...addressDetails, house_no: text })
                        }
                    />
                    <AddressItem
                        title="Tên đường"
                        placeholder="Nhập tên đường"
                        keyboardType="default"
                        value={addressDetails.street}
                        onChangeText={(text: any) =>
                            setAddressDetails({ ...addressDetails, street: text })
                        }
                    />
                    <AddressItem
                        title="Thành phố"
                        placeholder="Nhập thành phố"
                        keyboardType="default"
                        value={addressDetails.city}
                        onChangeText={(text: any) =>
                            setAddressDetails({ ...addressDetails, city: text })
                        }
                    />
                    <AddressItem
                        title="Phường/Huyện"
                        placeholder="Nhập phường/huyện"
                        keyboardType="default"
                        value={addressDetails.district}
                        onChangeText={(text: any) =>
                            setAddressDetails({ ...addressDetails, district: text })
                        }
                    />
                    <AddressItem
                        title="Zip Code"
                        placeholder="Nhập mã bưu điện"
                        keyboardType="number-pad"
                        value={addressDetails.zipcode}
                        onChangeText={(text: any) =>
                            setAddressDetails({ ...addressDetails, zipcode: text })
                        }
                    />
                </View>

                <View className="pb-5">
                    <CustomButton
                        title="Lưu địa chỉ"
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={handleSaveAddress}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Address;
