import { View, Text, SafeAreaView, FlatList, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';
import { useCart } from '@/lib/CartContext';
import { deleteCartItem, getCartItems, getProductById } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/GlobalProvider';

const Cart = () => {
  const { user } = useGlobalContext();
  const userId = user?.$id || null;

  const [cartData, setCartData] = useState([]);
  const [discountCode, setDiscountCode] = useState(''); // Lưu mã giảm giá
  const [discountApplied, setDiscountApplied] = useState(false); // Kiểm tra xem mã giảm giá đã được áp dụng chưa
  const [discountAmount, setDiscountAmount] = useState(0); // Lưu giá trị giảm giá

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems(userId);
        console.log('✅ Giỏ hàng:', cartItems);

        const enrichedCartItems = await Promise.all(
          cartItems.map(async (item) => {
            const product = await getProductById(item.productId); // lấy từ bảng product
            return {
              ...item,
              id: item.$id,
              name: product?.name,
              image: product?.image,
              price: product?.price,
              discount: product?.discount,
            };
          })
        );

        setCartData(enrichedCartItems);
      } catch (error) {
        console.error('❌ Lỗi khi lấy giỏ hàng:', error);
      }
    };

    if (userId) fetchCartItems();
  }, [userId]);

  const totalPrice = cartData.reduce((sum, item) => sum + parseFloat(item.discount), 0);
  const shippingFee = cartData.length > 0 ? 5 : 0;
  const finalPrice = totalPrice + shippingFee - discountAmount; // Tính giá cuối cùng sau khi giảm giá

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const result = await deleteCartItem(id);
            if (result) {
              setCartData(prev => prev.filter(item => item.id !== id));
              Alert.alert("Thành công", "Sản phẩm đã được xóa khỏi giỏ hàng.");
            } else {
              Alert.alert("Lỗi", "Không thể xóa sản phẩm. Vui lòng thử lại.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'ShareBuy') {
      setDiscountApplied(true);
      const discount = totalPrice * 0.05; // Giảm 5% của tổng giá trị
      setDiscountAmount(discount);
      Alert.alert("Thành công", "Mã giảm giá đã được áp dụng!");
    } else {
      setDiscountApplied(false);
      setDiscountAmount(0);
      Alert.alert("Lỗi", "Mã giảm giá không hợp lệ.");
    }
  };

  return (
    <KeyboardAvoidingView className='flex-1'>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-5">
          <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">Giỏ hàng</Text>

          <View style={{ height: 280 }}>
            <FlatList
              data={cartData}
              keyExtractor={(item, index) => item.$id || index.toString()}
              renderItem={({ item }) => <CartItem item={item} onDelete={handleDeleteItem} onDecrease={() => { }} onIncrease={() => { }} />}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>

          {/* Nhập mã giảm giá */}
          <View className='flex flex-col gap-2'>
            <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
              <TextInput
                placeholder="Nhập mã giảm giá"
                className="px-3 flex-1"
                placeholderTextColor="#9ca3af"
                value={discountCode}
                onChangeText={setDiscountCode} // Cập nhật mã khi người dùng nhập
              />
              <CustomButton
                title="Áp dụng"
                containerStyles="bg-primary-100 px-5 rounded-r-lg"
                textStyles="text-white"
                handlePress={handleApplyDiscount} // Gọi hàm áp dụng mã giảm giá
              />
            </View>
            <View>
              <Text className='text-sm font-poppins-regular text-gray-200'>Nhập mã "ShareBuy" để được giảm 5% </Text>
            </View>
          </View>
          {/* Hiển thị thông tin thanh toán */}
          <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-2">
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">Sản phẩm ({cartData.length}):</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">${totalPrice.toFixed(2)}</Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">Giao hàng:</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">+${shippingFee.toFixed(2)}</Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">Giảm giá:</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                ${discountAmount.toFixed(2)}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-bold text-primary-200">Tổng:</Text>
              <Text className="text-lg font-poppins-bold text-primary-100">${finalPrice.toFixed(2)}</Text>
            </View>
          </View>

          {/* Nút thanh toán */}
          <View className="mt-5">
            <CustomButton
              title="Thanh toán"
              containerStyles="bg-primary-100 rounded-lg"
              textStyles="text-white"
              handlePress={() => { }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
};

export default Cart;
