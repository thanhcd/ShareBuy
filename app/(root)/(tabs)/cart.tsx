import { View, Text, SafeAreaView, FlatList, TextInput } from 'react-native'
import React from 'react'
import { cartData } from '@/constants/data'
import CartItem from '@/components/CartItem'
import CustomButton from '@/components/CustomButton'

const Cart = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        ListHeaderComponent={() => (
          <View>
            <View className='flex flex-row items-center justify-between mt-5 mb-4'>
              <Text className='text-xl font-poppins-bold text-primary-200'>Giỏ hàng</Text>
            </View>
            {/* Thêm phần tử khác */}
            <View className="p-4 rounded-lg">
              <Text className="text-sm text-primary-200">Tổng số sản phẩm: {cartData.length}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mt-6 p-4 border-t border-gray-300">
            {/* Tổng giá tiền */}
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-bold text-gray-600">Tổng tiền:</Text>
              <Text className="text-lg font-poppins-bold text-primary-200">$600.00</Text>
            </View>

            {/* Ô nhập mã giảm giá */}
            <View className="mt-4 flex flex-row border border-gray-100 rounded-lg">
              <TextInput
                placeholder="Nhập mã giảm giá"
                className="py-5 px-3  flex-1"
              />
              <CustomButton
              title={"Áp dụng"}
              containerStyles='bg-primary-100 px-5'
              textStyles='text-white'
              />
            </View>

            {/* Nút Thanh toán */}
            <View className="mt-4">
              <CustomButton 
                title={"Thanh toán"}
                containerStyles='bg-primary-100 rounded-lg'
                textStyles='text-white'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className='flex items-center justify-center mt-10'>
            <Text className='text-lg font-poppins-bold text-gray-400'>Giỏ hàng trống</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Cart
