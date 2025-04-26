import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';
import { deleteCartItem, getCartItems, getProductById } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { router } from 'expo-router';

interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
}

const Cart = () => {
  const { user } = useGlobalContext();
  const userId = user?.$id || null;

  const [cartData, setCartData] = useState<CartItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems(userId);

        const enrichedCartItems = await Promise.all(
          cartItems.map(async (item) => {
            const product = await getProductById(item.productId);
            return {
              ...item,
              id: item.$id,
              name: product?.name,
              image: product?.image,
              price: product?.price,
              discount: product?.discount,
              quantity: item.quantity || 1,
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

  const totalPrice = cartData.reduce(
    (sum, item) => sum + parseFloat(item.discount) * item.quantity,
    0
  );
  const shippingFee = cartData.length > 0 ? 5 : 0;
  const finalPrice = totalPrice + shippingFee - discountAmount;

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteCartItem(id);
            if (result) {
              setCartData((prev) => prev.filter((item) => item.id !== id));
              Alert.alert('Thành công', 'Sản phẩm đã được xóa.');
            } else {
              Alert.alert('Lỗi', 'Không thể xóa sản phẩm.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'ShareBuy') {
      const discount = totalPrice * 0.05;
      setDiscountAmount(discount);
      setDiscountApplied(true);
      Alert.alert('Thành công', 'Mã giảm giá đã được áp dụng!');
    } else {
      setDiscountAmount(0);
      setDiscountApplied(false);
      Alert.alert('Lỗi', 'Mã giảm giá không hợp lệ.');
    }
  };

  const handleQuantityChange = (id: string, action: 'increase' | 'decrease') => {
    setCartData((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty =
            action === 'increase'
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const onUpdateItem = () => {
    router.push('/(root)/properties/[id]')
  }
  return (
    <KeyboardAvoidingView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-5">
          <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">
            Giỏ hàng
          </Text>

          <View style={{ height: 280 }}>
            <FlatList
              data={cartData}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  onDelete={handleDeleteItem}
                  onIncrease={() => handleQuantityChange(item.id, 'increase')}
                  onDecrease={() => handleQuantityChange(item.id, 'decrease')}
                  onUpdateItem={() => onUpdateItem}
                />
              )}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>

          {/* Discount code input */}
          <View className="flex flex-col gap-2">
            <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
              <TextInput
                placeholder="Nhập mã giảm giá"
                className="px-3 flex-1"
                placeholderTextColor="#9ca3af"
                value={discountCode}
                onChangeText={setDiscountCode}
              />
              <CustomButton
                title="Áp dụng"
                containerStyles="bg-primary-100 px-5 rounded-r-lg"
                textStyles="text-white"
                handlePress={handleApplyDiscount}
              />
            </View>
            <Text className="text-sm font-poppins-regular text-gray-200">
              Nhập mã "ShareBuy" để được giảm 5%
            </Text>
          </View>

          {/* Payment summary */}
          <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-2">
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">
                Sản phẩm ({cartData.length}):
              </Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">
                Giao hàng:
              </Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                +${shippingFee.toFixed(2)}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">
                Giảm giá:
              </Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                -${discountAmount.toFixed(2)}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-bold text-primary-200">
                Tổng:
              </Text>
              <Text className="text-lg font-poppins-bold text-primary-100">
                ${finalPrice.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Checkout button */}
          <View className="mt-5">
            <CustomButton
              title="Thanh toán"
              containerStyles="bg-primary-100 rounded-lg"
              textStyles="text-white"
              handlePress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Cart;
