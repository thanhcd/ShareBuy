import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CreditCardItem from '@/components/CreditCardItems';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { getUserCredit } from '@/lib/appwrite';

interface CreditCardInfo {
    $id: string;
    card_number: string;
    card_name: string;
    card_expiry: string;
    color?: string; // Nếu có thuộc tính màu
}

const Credit = () => {
    const { user } = useGlobalContext();
    const userIdAuth: string = user?.$id || '';

    const [creditInfo, setCreditInfo] = useState<CreditCardInfo[]>([]);
    const colors = ['bg-primary-300', 'bg-primary-100', 'bg-secondary-200', 'bg-secondary-300'];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    useEffect(() => {
        const fetchCredit = async () => {
            try {
                const credit = await getUserCredit(userIdAuth);
                if (credit) {
                    setCreditInfo(credit); // Lưu danh sách thẻ vào state
                } else {
                    Alert.alert('Thông báo', 'Không thể lấy danh sách credit.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách credit:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy danh sách credit.');
            }
        };

        if (userIdAuth) {
            fetchCredit();
        }
    }, [userIdAuth]);

    const handleDeleteCredit = async (documentId: string) => {
        try {

        } catch (error) {
            console.error('Lỗi khi xóa credit:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa credit');
        }
    }

    const handleNotdone = () => {
        Alert.alert('Thông báo', 'Chức năng này chưa được thực hiện.');
    }

    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Thẻ tín dụng hoặc ghi nợ
                    </Text>
                </View>

                {/* Danh sách thẻ (FlatList) */}
                <FlatList
                    data={creditInfo}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item, index }) => {
                        let bgColor = 'bg-primary-100'; // default

                        if (creditInfo.length === 2) {
                            bgColor = index === 0 ? 'bg-primary-100' : 'bg-primary-200';
                        } else if (creditInfo.length === 3) {
                            bgColor =
                                index === 0
                                    ? 'bg-primary-100'
                                    : index === 1
                                        ? 'bg-primary-200'
                                        : 'bg-secondary-200';
                        }

                        return (
                            <CreditCardItem
                                idcard={item.card_number}
                                name={item.card_name}
                                date={new Date(item.card_expiry).toLocaleDateString('vi-VN', {
                                    month: '2-digit',
                                    year: '2-digit',
                                })}
                                color={{}}
                                bgColor={bgColor}
                                handlePress={handleNotdone}
                            />
                        );
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-400 mt-10">Chưa có thẻ nào</Text>
                    }
                />

                {/* Nút thêm thẻ */}
                <View className="w-full">
                    <CustomButton
                        title="Thêm thẻ"
                        containerStyles="bg-primary-100 mt-5 rounded-lg"
                        textStyles="text-white"
                        handlePress={() => router.push('/addCredit')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Credit;
