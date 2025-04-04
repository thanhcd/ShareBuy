import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import icons from '@/constants/icons';
import { addAddressUser, getCurrentUser, updateAddressUser } from '@/lib/appwrite';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/lib/GlobalProvider';

interface AddressParams {
    documentId?: string;
    country?: string;
    house_no?: string;
    street?: string;
    city?: string;
    district?: string;
    zipcode?: string;
}

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
    const params = useLocalSearchParams<AddressParams>();
    const [userId, setUserId] = useState<string | null>(null);
    const { user } = useGlobalContext(); // Lấy thông tin người dùng từ context
    const userIdAuth = user?.$id; // Lấy ID người dùng từ context
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State để kiểm tra dữ liệu đã tải
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

        if (!isDataLoaded) {
            fetchUser();

            if (params && params.documentId) {
                setAddressDetails({
                    country: params.country || 'Việt Nam', // Thiết lập mặc định nếu không có giá trị
                    house_no: params.house_no || '',
                    street: params.street || '',
                    city: params.city || '',
                    district: params.district || '',
                    zipcode: params.zipcode || '',
                });
            }

            setIsDataLoaded(true); // Đánh dấu dữ liệu đã được tải
        }
    }, [isDataLoaded, params]);

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

    const handleUpdateAdress = async (documentId: string) => {
        try {
            if (!documentId) {
                Alert.alert('Lỗi', 'Không tìm thấy ID của địa chỉ cần sửa.');
                return;
            }
    
            console.log('Dữ liệu địa chỉ trước khi cập nhật:', addressDetails);
    
            // Gửi yêu cầu cập nhật địa chỉ
            const response = await updateAddressUser(documentId, addressDetails);
    
            if (response) {
                Alert.alert('Thành công', 'Địa chỉ đã được cập nhật thành công.');
                router.back(); // Quay lại trang trước
            } else {
                Alert.alert('Lỗi', 'Không thể cập nhật địa chỉ.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật địa chỉ.');
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
                        {params.documentId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ'}
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
                        title={params.documentId ? 'Cập nhật địa chỉ' : 'Lưu địa chỉ'}
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={() =>
                            params.documentId
                                ? handleUpdateAdress(params.documentId) // Gọi hàm cập nhật
                                : handleSaveAddress() // Gọi hàm lưu mới
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Address;

