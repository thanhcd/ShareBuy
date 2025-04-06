import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { deleteUserAddress, getUserAddresses, updateAddressUser } from '@/lib/appwrite'; // Import hàm getUserAddresses

interface AddressItemProps {
    $id?: string;
    username?: string;
    country?: string;
    district?: string;
    street?: string;
    house_no?: string;
    handlePress?: () => void;
    onPress?: () => void;
}

const AddressItem = ({
    username,
    country,
    district,
    street,
    house_no,
    handlePress,
    onPress,
}: AddressItemProps) => {
    return (
        <View className='flex flex-col py-6 px-6 border border-primary-100 rounded-lg gap-5 mb-10'>
            <Text className='font-poppins-bold text-lg text-primary-200'>{username}</Text>
            <View className='flex flex-row justify-between'>
                <Text className='font-poppins-regular text-xm text-gray-200'>Quốc gia: </Text>
                <Text className='font-poppins-regular text-xm text-gray-200'>{country}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='font-poppins-regular text-xm text-gray-200'>Quận: </Text>
                <Text className='font-poppins-regular text-xm text-gray-200'>{district}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='font-poppins-regular text-xm text-gray-200'>Đường: </Text>
                <Text className='font-poppins-regular text-xm text-gray-200'>{street}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='font-poppins-regular text-xm text-gray-200'>Số nhà:</Text>
                <Text className='font-poppins-regular text-xm text-gray-200'>{house_no}</Text>
            </View>

            <View className='flex flex-row items-center gap-8'>
                <CustomButton title='Sửa' containerStyles='bg-primary-100 px-8 rounded-lg' textStyles='text-white' handlePress={handlePress} />
                <TouchableOpacity onPress={onPress}>
                    <Image source={icons.trash} className='size-7' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Address = () => {
    const { user } = useGlobalContext();
    const username = user?.name;
    const userIdAuth: string = user?.$id || "";

    // State để lưu trữ danh sách địa chỉ
    const [addressInfo, setAddressInfo] = useState<AddressItemProps[]>([]);
    const handleUpdateFunction = async (documentId: string) => {
        console.log("Địa chỉ cần sửa có ID:", documentId);
        try {
            if (!documentId) {
                Alert.alert("Lỗi", "Không tìm thấy ID của địa chỉ cần sửa.");
                return;
            }

            const address = addressInfo.find((item) => item.$id === documentId);
            if (address) {
                // Xóa các thuộc tính không hợp lệ trước khi truyền dữ liệu
                const { handlePress, onPress, ...filteredAddress } = address;

                console.log("Dữ liệu địa chỉ gửi đi:", filteredAddress);

                router.push({
                    pathname: "/Addaddress",
                    params: { ...filteredAddress, documentId }, // Truyền dữ liệu hợp lệ
                });
            }
        } catch (error) {
            console.error("Lỗi khi chuyển trang:", error);
        }
    };


    // const handleDeleteAddress = async (documentId: string) => {
    //     try {
    //         if (!documentId) {
    //             Alert.alert("Lỗi", "Không tìm thấy ID của địa chỉ cần xóa.");
    //             return;
    //         }

    //         const response = await deleteUserAddress(documentId);
    //         if (response) {
    //             Alert.alert("Thông báo", "Địa chỉ đã được xóa thành công.");
    //             setAddressInfo((prevAddresses) => prevAddresses.filter((address) => address.$id !== documentId)); // ✅ Dùng $id
    //         } else {
    //             Alert.alert("Thông báo", "Không thể xóa địa chỉ.");
    //         }
    //     } catch (error) {
    //         console.error("❌ Lỗi khi xóa địa chỉ:", error);
    //         Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa địa chỉ.");
    //     }
    // };

    const handleDeleteAddress = (documentId: string) => {
        if (!documentId) {
            Alert.alert("Lỗi", "Không tìm thấy ID của địa chỉ cần xóa.");
            return;
        }

        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa địa chỉ này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await deleteUserAddress(documentId);
                            if (response) {
                                if (response) {
                                    Alert.alert("Thông báo", "Địa chỉ đã được xóa thành công.");
                                    setAddressInfo((prevAddresses) => prevAddresses.filter((address) => address.$id !== documentId)); // ✅ Dùng $id
                                }
                                else {
                                    Alert.alert("Thông báo", "Không thể xóa địa chỉ.");
                                }

                            }
                        }
                        catch (error) {
                            console.error("❌ Lỗi khi xóa địa chỉ:", error);
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa địa chỉ.");
                        }
                    }
                }

            ]
        )
    }



    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const addresses = await getUserAddresses(userIdAuth);
                if (addresses) {
                    setAddressInfo(addresses); // Lưu danh sách địa chỉ vào state
                } else {
                    Alert.alert('Thông báo', 'Không thể lấy danh sách địa chỉ.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách địa chỉ:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy danh sách địa chỉ.');
            }
        };

        if (userIdAuth) {
            fetchAddresses();
        }
    }, [userIdAuth]); // Chỉ chạy khi userIdAuth thay đổi

    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Địa chỉ
                    </Text>
                </View>

                {/* Danh sách địa chỉ */}
                <FlatList
                    data={addressInfo}
                    keyExtractor={(item, index) => item.$id || index.toString()} // ✅ Đảm bảo key là documentId ($id)
                    renderItem={({ item }) => (
                        <AddressItem
                            username={username}
                            district={item.district}
                            country={item.country}
                            street={item.street}
                            house_no={item.house_no}
                            handlePress={() => handleUpdateFunction(item.$id ?? "")} // ✅ Truyền đúng documentId ($id)
                            onPress={() => handleDeleteAddress(item.$id ?? "")} // ✅ Truyền đúng documentId ($id)
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {/* Nút thêm địa chỉ */}
                <View className="w-full">
                    <CustomButton
                        title="Thêm địa chỉ"
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={() => router.push('/Addaddress')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Address;
