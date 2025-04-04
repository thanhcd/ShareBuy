import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardTypeOptions,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { addCreditCardUser, getCurrentUser } from '@/lib/appwrite';

interface SettingsCreditProps {
    title: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    value: string;
    onChangeText: (text: string) => void;
    onDateChange?: (date: Date | null) => void; // 👉 mới thêm
}

const CreditItem = ({
    title,
    placeholder,
    keyboardType,
    value,
    onChangeText,
    onDateChange
}: SettingsCreditProps) => {
    const parseExpiryToDate = (expiry: string): Date | null => {
        // Tách chuỗi thành tháng và năm
        const [month, year] = expiry.split('/');
    
        // Kiểm tra nếu không có tháng hoặc năm, hoặc độ dài không đúng
        if (!month || !year || month.length !== 2 || year.length !== 2) {
            return null;
        }
    
        // Chuyển đổi tháng và năm sang số
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10) + 2000; // Thêm 2000 để chuyển "YY" thành "YYYY"
    
        // Kiểm tra giá trị tháng và năm hợp lệ
        if (
            isNaN(parsedMonth) ||
            isNaN(parsedYear) ||
            parsedMonth < 1 ||
            parsedMonth > 12
        ) {
            return null;
        }
    
        // Trả về đối tượng Date
        return new Date(parsedYear, parsedMonth - 1, 1); // Tháng trong Date bắt đầu từ 0
    };

    return (
        <View className="flex-1">
            <View className="flex flex-col">
                <Text className="text-lg font-poppins-bold text-primary-200">{title}</Text>
                <TextInput
                    className="p-5 border border-gray-100 text-gray-200"
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={(text) => {
                        onChangeText?.(text);

                        if (title === 'Ngày hết hạn' && onDateChange) {
                            const date = parseExpiryToDate(text);
                            onDateChange(date);
                        }
                    }}
                />

            </View>
        </View>
    );
};

const AddCredit = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [creditDetails, setCreditDetails] = useState({
        card_number: '',
        card_name: '',
        card_expiry: '',
        card_cvc: '',
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
            setIsDataLoaded(true); // Đánh dấu dữ liệu đã được tải
        }
    }, [isDataLoaded]);

    const handleSaveCreditCard = async () => {
        if (!userId) {
            Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
            return;
        }

        if (
            !creditDetails.card_number ||
            !creditDetails.card_name ||
            !creditDetails.card_expiry ||
            !creditDetails.card_cvc
        ) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin thẻ tín dụng.');
            return;
        }

        console.log('Dữ liệu thẻ trước khi gửi:', creditDetails);

        try {
            const response = await addCreditCardUser(userId, creditDetails); // Gọi API lưu thẻ tín dụng
            if (response) {
                Alert.alert('Thành công', 'Thẻ tín dụng đã được lưu thành công.');
                router.back(); // Quay lại trang trước
            } else {
                Alert.alert('Lỗi', 'Không thể lưu thẻ tín dụng.');
            }
        } catch (error) {
            console.error('Lỗi khi lưu thẻ tín dụng:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu thẻ tín dụng.');
        }
    };

    const formatCardNumber = (input: string) => {
        const cleaned = input.replace(/\D+/g, '');
        const limited = cleaned.slice(0, 16);
        const matches = limited.match(/.{1,4}/g);
        return matches ? matches.join('-') : '';
    };

    const formatExpiryDate = (input: string): string => {
        const cleaned = input.replace(/\D+/g, '');
        const limited = cleaned.slice(0, 4);
        if (limited.length >= 3) {
            return `${limited.slice(0, 2)}/${limited.slice(2)}`;
        }
        return limited;
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Thêm thẻ
                    </Text>
                </View>

                {/* Form nhập thông tin thẻ */}
                <View className="gap-5 flex-col">
                    <CreditItem
                        title="Số thẻ"
                        placeholder="1234-5678-0000-0000"
                        keyboardType="number-pad"
                        value={creditDetails.card_number}
                        onChangeText={(text) => {
                            const formatted = formatCardNumber(text);
                            setCreditDetails({ ...creditDetails, card_number: formatted });
                        }}
                    />

                    <View className="flex flex-row gap-5 flex-1">
                        <CreditItem
                            title="Ngày hết hạn"
                            placeholder="MM/YY"
                            keyboardType="number-pad"
                            value={creditDetails.card_expiry}
                            onChangeText={(text) => {
                                const formatted = formatExpiryDate(text);
                                setCreditDetails({ ...creditDetails, card_expiry: formatted });
                            }}
                            onDateChange={(date) => {
                                if (date) {
                                    console.log('🔁 Ngày hết hạn dạng Date:', date);
                                } else {
                                    console.log('❌ Sai định dạng ngày');
                                }
                            }}
                        />

                        <CreditItem
                            title="Mã bảo mật"
                            placeholder="123"
                            keyboardType="number-pad"
                            value={creditDetails.card_cvc}
                            onChangeText={(text) =>
                                setCreditDetails({ ...creditDetails, card_cvc: text })
                            }
                        />
                    </View>

                    <CreditItem
                        title="Tên chủ thẻ"
                        placeholder="Nguyen Van A"
                        keyboardType="default"
                        value={creditDetails.card_name}
                        onChangeText={(text) =>
                            setCreditDetails({ ...creditDetails, card_name: text })
                        }
                    />
                </View>

                {/* Nút lưu thẻ */}
                <CustomButton
                    title="Thêm thẻ"
                    containerStyles="bg-primary-100 mt-5 rounded-lg"
                    textStyles="text-white"
                    handlePress={handleSaveCreditCard}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddCredit;
