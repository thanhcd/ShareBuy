import { View, Text, SafeAreaView, FlatList, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { cartData } from '@/constants/data';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';

const Cart = () => {
  const totalPrice = cartData.reduce((sum, item) => sum + parseFloat(item.discount), 0);
  const shippingFee = cartData.length > 0 ? 5 : 0;
  const finalPrice = totalPrice - shippingFee;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">
            Giỏ hàng
          </Text>

          {/* Bọc FlatList để nó scroll riêng */}
          <View style={{ height: 300 }}> 
            <FlatList
              data={cartData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CartItem item={item} />}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true} 
            />
          </View>

          {/* Mã gemm giá */}
          <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
            <TextInput placeholder="Nhập mã giảm giá" className="px-3 flex-1" />
            <CustomButton
              title="Áp dụng"
              containerStyles="bg-primary-100 px-5 rounded-r-lg"
              textStyles="text-white"
              handlePress={() => {}}
            />
          </View>

          <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-5">
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">
                Sản phẩm ({cartData.length}):
              </Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            {cartData.length > 0 && (
              <View className="flex flex-row justify-between">
                <Text className="text-lg font-poppins-regular text-gray-200">{'Giao hàng:'}</Text>
                <Text className="text-lg font-poppins-regular text-primary-200">
                  -${shippingFee.toFixed(2)}
                </Text>
              </View>
            )}
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">{'Giảm giá:'}</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">$0.00</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-bold text-primary-200">{'Tổng:'}</Text>
              <Text className="text-lg font-poppins-bold text-primary-100">
                ${finalPrice.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Nút Thanh toán */}
          <View className="mt-5">
            <CustomButton
              title="Thanh toán"
              containerStyles="bg-primary-100 rounded-lg"
              textStyles="text-white"
              handlePress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
