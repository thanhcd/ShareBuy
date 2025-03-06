// import { View, Text, SafeAreaView, FlatList, TextInput } from 'react-native';
// import React from 'react';
// import { cartData } from '@/constants/data';
// import CartItem from '@/components/CartItem';
// import CustomButton from '@/components/CustomButton';

// const Cart = () => {
//   const totalPrice = cartData.reduce((sum, item) => sum + parseFloat(item.discount), 0);
//   const shippingFee = cartData.length > 0 ? 5 : 0;
//   const finalPrice = totalPrice - shippingFee;

//   return (
//     <SafeAreaView className="h-full bg-white">
//       <View className="flex-1">
//         <FlatList
//           data={cartData.slice(0, 4)} // Giới hạn tối đa 4 CartItem
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <CartItem item={item} />}
//           showsVerticalScrollIndicator={true} // Kích hoạt scroll nếu có nhiều item
//           contentContainerStyle={{
//             paddingBottom: 100,
//             paddingHorizontal: 20,
//           }}
//           ListHeaderComponent={() => (
//             <View className="flex flex-row items-center justify-between mt-5 mb-4">
//               <Text className="text-xl font-poppins-bold text-primary-200">Giỏ hàng</Text>
//             </View>
//           )}
//           ListFooterComponent={() => (
//             <View className="mt-5">
//               {/* Ô nhập mã giảm giá */}
//               <View className="flex flex-row border border-gray-100 rounded-lg">
//                 <TextInput
//                   placeholder="Nhập mã giảm giá"
//                   className="px-3 flex-1"
//                 />
//                 <CustomButton
//                   title="Áp dụng"
//                   containerStyles="bg-primary-100 px-5 rounded-r-lg"
//                   textStyles="text-white"
//                 />
//               </View>

//               {/* Tổng giá tiền */}
//               <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-5">
//                 <View className="flex flex-row justify-between">
//                   <Text className="text-lg font-poppins-regular text-gray-200">
//                     Sản phẩm ({cartData.length}):
//                   </Text>
//                   <Text className="text-lg font-poppins-regular text-primary-200">
//                     ${totalPrice.toFixed(2)}
//                   </Text>
//                 </View>

//                 {/* Chỉ hiển thị phí giao hàng nếu có sản phẩm */}
//                 {cartData.length > 0 && (
//                   <View className="flex flex-row justify-between">
//                     <Text className="text-lg font-poppins-regular text-gray-200">Giao hàng:</Text>
//                     <Text className="text-lg font-poppins-regular text-primary-200">
//                       -${shippingFee.toFixed(2)}
//                     </Text>
//                   </View>
//                 )}

//                 <View className="flex flex-row justify-between">
//                   <Text className="text-lg font-poppins-regular text-gray-200">Giảm giá:</Text>
//                   <Text className="text-lg font-poppins-regular text-primary-200">$0.00</Text>
//                 </View>

//                 <View className="flex flex-row justify-between">
//                   <Text className="text-lg font-poppins-bold text-primary-200">Tổng:</Text>
//                   <Text className="text-lg font-poppins-bold text-primary-100">
//                     ${finalPrice.toFixed(2)}
//                   </Text>
//                 </View>
//               </View>

//               {/* Nút Thanh toán */}
//               <View className="mt-4">
//                 <CustomButton
//                   title="Thanh toán"
//                   containerStyles="bg-primary-100 rounded-lg"
//                   textStyles="text-white"
//                 />
//               </View>
//             </View>
//           )}
//           ListEmptyComponent={() => (
//             <View className="flex items-center justify-center mt-10">
//               <Text className="text-lg font-poppins-bold text-gray-400">Giỏ hàng trống</Text>
//             </View>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Cart;


import { View, Text, SafeAreaView, FlatList, TextInput } from 'react-native';
import React from 'react';
import { cartData } from '@/constants/data';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';

const Cart = () => {
  const totalPrice = cartData.reduce((sum, item) => sum + parseFloat(item.discount), 0);
  const shippingFee = cartData.length > 0 ? 5 : 0;
  const finalPrice = totalPrice - shippingFee;

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 px-5">
        <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">
          Giỏ hàng
        </Text>

        {/* Vùng chứa CartItem có scroll riêng */}
        <View className="overflow-hidden">
          <FlatList
            data={cartData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ maxHeight: 350 }} // Giới hạn chiều cao để kích hoạt scroll khi vượt quá
          />
        </View>

        {/* Mã giảm giá */}
        <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
          <TextInput placeholder="Nhập mã giảm giá" className="px-3 flex-1" />
          <CustomButton
            title="Áp dụng"
            containerStyles="bg-primary-100 px-5 rounded-r-lg"
            textStyles="text-white"
          />
        </View>

        {/* Tổng giá tiền */}
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
              <Text className="text-lg font-poppins-regular text-gray-200">Giao hàng:</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">
                -${shippingFee.toFixed(2)}
              </Text>
            </View>
          )}
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-poppins-regular text-gray-200">Giảm giá:</Text>
            <Text className="text-lg font-poppins-regular text-primary-200">$0.00</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-poppins-bold text-primary-200">Tổng:</Text>
            <Text className="text-lg font-poppins-bold text-primary-100">
              ${finalPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Nút Thanh toán */}
        <View className="mt-4">
          <CustomButton
            title="Thanh toán"
            containerStyles="bg-primary-100 rounded-lg"
            textStyles="text-white"
          />
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Cart;
