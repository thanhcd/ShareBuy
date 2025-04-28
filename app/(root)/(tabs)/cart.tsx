import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';
import { deleteCartItem, getCartItems, getProductById, updateCartItem } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { colorOptions, sizeShow } from '@/constants/data';
import icons from '@/constants/icons';

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

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showCardFields, setShowCardFields] = useState(false);

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

  const handleUpdateItem = (id: string) => {
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const handleConfirmUpdate = async () => {
    if (selectedColor && selectedSize && selectedItemId) {
      try {
        const response = await updateCartItem(selectedItemId, selectedSize, selectedColor);
        if (response) {
          setCartData((prevCart) =>
            prevCart.map((item) =>
              item.id === selectedItemId
                ? { ...item, color: selectedColor, size: selectedSize }
                : item
            )
          );
          Alert.alert('Thành công', `Màu: ${selectedColor}, Size: ${selectedSize} đã được cập nhật.`);
          setModalVisible(false);
        } else {
          Alert.alert('Lỗi', 'Không thể cập nhật sản phẩm.');
        }
      } catch (error) {
        console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật sản phẩm.');
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng chọn đủ Màu và Size.');
    }
  };

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
                  onUpdateItem={() => handleUpdateItem(item.id)}
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
              handlePress={() => setPaymentModalVisible(true)}
            />
          </View>
        </View>

        {/* Modal chọn màu và size */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-5 rounded-lg w-4/5">
              <Text className="text-lg font-bold mb-3">Chọn Màu và Size</Text>

              {/* Chọn màu */}
              <Text className="mb-1">Màu:</Text>
              <View className="flex flex-row gap-3 mb-3 flex-wrap">
                {colorOptions.map((option, index) => (
                  <Pressable
                    key={index}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === option.color ? 'border-primary-100' : 'border-gray-300'
                      }`}
                    style={{ backgroundColor: option.color }}
                    onPress={() => setSelectedColor(option.color)}
                  />
                ))}
              </View>

              {/* Chọn size */}
              <Text className="mb-1">Size:</Text>
              <View className="flex flex-row gap-3 mb-3 flex-wrap">
                {sizeShow.map((option, index) => (
                  <Pressable
                    key={index}
                    className={`px-3 py-2 rounded-full border ${selectedSize === option.title ? 'bg-primary-100 border-primary-100' : 'bg-gray-100 border-gray-300'
                      }`}
                    onPress={() => setSelectedSize(option.title)}
                  >
                    <Text className="text-center">{option.title}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Confirm Button */}
              <CustomButton
                title="Xác nhận"
                containerStyles="bg-primary-100 rounded-lg mt-3"
                textStyles="text-white"
                handlePress={handleConfirmUpdate}
              />

              {/* Cancel Button */}
              <CustomButton
                title="Đóng"
                containerStyles="bg-gray-100 rounded-lg mt-2"
                textStyles="text-black"
                handlePress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={paymentModalVisible}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-5 rounded-lg w-4/5 relative pt-10">

              {/* Icon Close */}
              <Pressable
                onPress={() => setPaymentModalVisible(false)}
                className="absolute top-3 right-3"
              >
                <Image source={icons.x} className="w-8 h-8" />
              </Pressable>

              {/* Tiêu đề */}
              <Text className="text-lg font-poppins-bold mb-5 text-center">
                Phương thức thanh toán
              </Text>

              {/* Chọn phương thức */}
              <View className="flex flex-col gap-3">
                {/* Thanh toán bằng thẻ */}
                <Pressable
                  className={`px-4 py-3 rounded-lg border ${selectedPaymentMethod === 'card' ? 'bg-primary-100 border-primary-100' : 'border-gray-300'
                    }`}
                  onPress={() => {
                    setSelectedPaymentMethod('card');
                    setShowCardFields(true);
                  }}
                >
                  <Text className="text-center font-poppins-regular text-black">Thanh toán bằng thẻ</Text>
                </Pressable>
                {showCardFields && (
                  <View className="flex flex-col gap-4 mt-5">
                    <TextInput
                      placeholder="Số thẻ"
                      keyboardType="numeric"
                      maxLength={16}
                      className="border border-gray-300 p-3 rounded-lg"
                      placeholderTextColor="gray"
                      textContentType="creditCardNumber"
                    />
                    <View className="flex flex-row gap-3">
                      <TextInput
                        placeholder="MM/YY"
                        keyboardType="numeric"
                        maxLength={5}
                        className="flex-1 border border-gray-300 p-3 rounded-lg"
                        textContentType='creditCardExpiration'
                        placeholderTextColor="gray"
                      />
                      <TextInput
                        placeholder="CVC"
                        keyboardType="numeric"
                        maxLength={4}
                        className="flex-1 border border-gray-300 p-3 rounded-lg"
                        textContentType='creditCardSecurityCode'
                        placeholderTextColor="gray"
                      />
                    </View>
                    <TextInput
                      placeholder="Tên chủ thẻ"
                      className="border border-gray-300 p-3 rounded-lg"
                      textContentType='creditCardName'
                      placeholderTextColor="gray"
                    />
                  </View>
                )}
                {/* Thanh toán khi nhận hàng */}
                <Pressable
                  className={`px-4 py-3 rounded-lg border ${selectedPaymentMethod === 'cod' ? 'bg-primary-100 border-primary-100' : 'border-gray-300'
                    }`}
                  onPress={() => {
                    setSelectedPaymentMethod('cod');
                    setShowCardFields(false);
                  }}
                >
                  <Text className="text-center font-poppins-regular text-black">Thanh toán khi nhận hàng</Text>
                </Pressable>
              </View>




              {/* Tổng tiền */}
              <View className="flex flex-row justify-between items-center mt-6">
                <Text className="font-poppins-bold text-primary-200 text-lg">Tổng:</Text>
                <Text className="font-poppins-bold text-primary-100 text-lg">${finalPrice.toFixed(2)}</Text>
              </View>

              {/* Nút hành động */}
              <View className="flex flex-row gap-3 mt-5">
                <CustomButton
                  title="Checkout"
                  containerStyles="bg-primary-100 rounded-lg flex-1"
                  textStyles="text-white"
                  handlePress={() => {
                    if (selectedPaymentMethod) {
                      Alert.alert('Thông báo', `Bạn đã chọn phương thức: ${selectedPaymentMethod === 'card' ? 'Thanh toán bằng thẻ' : 'Thanh toán khi nhận hàng'}`);
                      setPaymentModalVisible(false);
                    } else {
                      Alert.alert('Lỗi', 'Vui lòng chọn phương thức thanh toán.');
                    }
                  }}
                />
                {/* <CustomButton
                  title="Đóng"
                  containerStyles="bg-gray-200 rounded-lg flex-1"
                  textStyles="text-black"
                  handlePress={() => setPaymentModalVisible(false)}
                /> */}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

export default Cart;
