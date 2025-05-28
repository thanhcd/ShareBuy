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
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';
import { DeleteCartAfterPayment, deleteCartItem, getCartItems, getProductById, updateCartItem } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { colorOptions, sizeShow } from '@/constants/data';
import icons from '@/constants/icons';
import { CardField, CardForm, useStripe } from '@stripe/stripe-react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
  userId?: string;
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
  const [reloadKey, setReloadKey] = useState(0);
  
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
  }, [userId, reloadKey]);

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

  const { confirmPayment } = useStripe(); // Gọi useStripe trong component

  const handleStripePayment = async () => {
    console.log('Checkout button pressed'); // Log để kiểm tra
    if (!selectedPaymentMethod || selectedPaymentMethod !== 'card') {
      Alert.alert('Lỗi', 'Vui lòng chọn phương thức thanh toán bằng thẻ.');
      return;
    }

    try {
      const serverUrl = 'http://192.168.100.8:3000/create-payment-intent'; // Đảm bảo URL đúng
      console.log('Sending request to:', serverUrl);

      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(finalPrice * 100), // Stripe yêu cầu số tiền tính bằng cents
          currency: 'usd',
        }),
      });
      
      console.log('Response status:', response.status); // Log trạng thái phản hồi
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText); // Log lỗi từ server
        throw new Error('Không thể tạo PaymentIntent. Vui lòng kiểm tra server.');
      }

      const { clientSecret } = await response.json();
      console.log('Received clientSecret:', clientSecret);

      // Xác nhận thanh toán bằng Stripe
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType : 'Card'
      });

      if (error) {
        Alert.alert('Lỗi', `Thanh toán thất bại: ${error.message}`);
      } else if (paymentIntent) {
        Alert.alert('Thành công', 'Thanh toán thành công!');
        setPaymentModalVisible(false);
        await DeleteCartAfterPayment(userId); // Xóa giỏ hàng sau khi thanh toán thành công
        setReloadKey(prev => prev + 1); // Gọi lại để cập nhật danh sách giỏ hàng mới nhất
      }
    } catch (error) {
      console.error('❌ Lỗi khi thanh toán:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thanh toán.');
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 justify-center items-center bg-black/50"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          >
            <View className="bg-white p-5 rounded-lg w-11/12 max-w-xl relative pt-10">
              {/* Close Button */}
              <Pressable
                onPress={() => setPaymentModalVisible(false)}
                className="absolute top-3 right-3"
              >
                <Image source={icons.x} className="w-6 h-6" />
              </Pressable>

              {/* Title */}
              <Text className="text-lg font-poppins-bold mb-5 text-center">
                Phương thức thanh toán
              </Text>

              {/* Payment Options */}
              <View className="flex flex-col gap-3">
                {/* Card Payment Option */}
                <Pressable
                  className={`px-4 py-3 rounded-lg border ${selectedPaymentMethod === 'card'
                    ? 'bg-primary-100 border-primary-100'
                    : 'border-gray-300'
                    }`}
                  onPress={() => {
                    setSelectedPaymentMethod('card');
                    setShowCardFields(true);
                  }}
                >
                  <Text className="text-center font-poppins-regular text-black">
                    Thanh toán bằng thẻ
                  </Text>
                </Pressable>

                {/* CardField Component */}
                {showCardFields && (
                  <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                      placeholderColor: '#A0A0A0',
                      borderColor: '#E5E7EB',
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    style={{
                      width: '100%',
                      height: 50,
                      marginVertical: 10,
                    }}
                    onCardChange={(cardDetails) => {
                      console.log('Card details changed', cardDetails);
                    }}
                  />
                )}

                {/* COD Option */}
                {/* <Pressable
                  className={`px-4 py-3 rounded-lg border ${selectedPaymentMethod === 'cod'
                      ? 'bg-primary-100 border-primary-100'
                      : 'border-gray-300'
                    }`}
                  onPress={() => {
                    setSelectedPaymentMethod('cod');
                    setShowCardFields(false);
                  }}
                >
                  <Text className="text-center font-poppins-regular text-black">
                    Thanh toán khi nhận hàng
                  </Text>
                </Pressable> */}
              </View>

              {/* Total */}
              <View className="flex flex-row justify-between items-center mt-6">
                <Text className="font-poppins-bold text-primary-200 text-lg">Tổng:</Text>
                <Text className="font-poppins-bold text-primary-100 text-lg">
                  ${finalPrice.toFixed(2)}
                </Text>
              </View>

              {/* Checkout Button */}
              <View className="flex flex-row gap-3 mt-5">
                <CustomButton
                  title="Checkout"
                  containerStyles="bg-primary-100 rounded-lg flex-1"
                  textStyles="text-white"
                  handlePress={() => {
                    // console.log('Checkout button clicked'); // Log để kiểm tra
                    handleStripePayment();
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>


      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

export default Cart;
