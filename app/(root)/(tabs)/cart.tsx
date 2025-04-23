// import { View, Text, SafeAreaView, FlatList, TextInput, ScrollView } from 'react-native';
// import React from 'react';
// import { cartData } from '@/constants/data';
// import CartItem from '@/components/CartItem';
// import CustomButton from '@/components/CustomButton';
// import { useCart } from '@/app/context/CartContext';

// const Cart = () => {
//   const totalPrice = cartData.reduce((sum, item) => sum + parseFloat(item.discount), 0);
//   const shippingFee = cartData.length > 0 ? 5 : 0;
//   const finalPrice = totalPrice - shippingFee;
//   const { cart, addToCart } = useCart();

//   const renderCart = () => {
//     if (cart.length === 0) {
//       return <Text>Giỏ hàng của bạn đang trống!</Text>;
//     }

//     return (
//       <SafeAreaView>
//         {cart.map((item, index) => (
//           <Text key={index}>
//             {item.name} - {item.size} - {item.color} - {item.discount}
//           </Text>
//         ))}
//       </SafeAreaView>
//     );
//   };
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//         <View className="px-5">
//           <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">
//             Giỏ hàng
//           </Text>
//           <Text className="text-2xl font-bold mb-4">Giỏ Hàng</Text>
//           {renderCart()}
//           <View style={{ height: 300 }}> 
//             <FlatList
//               data={cartData}
//               // keyExtractor={(item) => item.id}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <CartItem item={item} />}
//               showsVerticalScrollIndicator={true}
//               nestedScrollEnabled={true} 
//             />
//           </View>

//           <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
//             <TextInput placeholder="Nhập mã giảm giá" className="px-3 flex-1"  placeholderTextColor="#9ca3af"/>
//             <CustomButton
//               title="Áp dụng"
//               containerStyles="bg-primary-100 px-5 rounded-r-lg"
//               textStyles="text-white"
//               handlePress={() => {}}
//             />
//           </View>

//           <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-5">
//             <View className="flex flex-row justify-between">
//               <Text className="text-lg font-poppins-regular text-gray-200">
//                 Sản phẩm ({cartData.length}):
//               </Text>
//               <Text className="text-lg font-poppins-regular text-primary-200">
//                 ${totalPrice.toFixed(2)}
//               </Text>
//             </View>
//             {cartData.length > 0 && (
//               <View className="flex flex-row justify-between">
//                 <Text className="text-lg font-poppins-regular text-gray-200">{'Giao hàng:'}</Text>
//                 <Text className="text-lg font-poppins-regular text-primary-200">
//                   -${shippingFee.toFixed(2)}
//                 </Text>
//               </View>
//             )}
//             <View className="flex flex-row justify-between">
//               <Text className="text-lg font-poppins-regular text-gray-200">{'Giảm giá:'}</Text>
//               <Text className="text-lg font-poppins-regular text-primary-200">$0.00</Text>
//             </View>
//             <View className="flex flex-row justify-between">
//               <Text className="text-lg font-poppins-bold text-primary-200">{'Tổng:'}</Text>
//               <Text className="text-lg font-poppins-bold text-primary-100">
//                 ${finalPrice.toFixed(2)}
//               </Text>
//             </View>
//           </View>

//           <View className="mt-5">
//             <CustomButton
//               title="Thanh toán"
//               containerStyles="bg-primary-100 rounded-lg"
//               textStyles="text-white"
//               handlePress={() => {}}
//             />
//           </View>
//         </View>
//     </SafeAreaView>
//   );
// };

// export default Cart;

import { View, Text, SafeAreaView, FlatList, TextInput, Alert } from 'react-native';
import React from 'react';
import CartItem from '@/components/CartItem';
import CustomButton from '@/components/CustomButton';
import { useCart } from '@/lib/CartContext';

const Cart = () => {
  const { cart, clearCart } = useCart(); // Lấy giỏ hàng và hàm clearCart từ CartContext

  // Tính tổng giá trị đơn hàng và các khoản phí
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.discount), 0);
  const shippingFee = cart.length > 0 ? 5 : 0;
  const finalPrice = totalPrice - shippingFee;

  // Hiển thị giỏ hàng
  const renderCart = () => {
    if (cart.length === 0) {
      return <Text>Giỏ hàng của bạn đang trống!</Text>;
    }

    return (
      <SafeAreaView>
        {cart.map((item, index) => (
          <Text key={index}>
            {item.name} - {item.size} - {item.color} - {item.discount}
          </Text>
        ))}
      </SafeAreaView>
    );
  };

  const handleClearCart = () => {
    clearCart(); // Xóa hết các sản phẩm trong giỏ hàng
    Alert.alert("Thông báo", "Giỏ hàng đã được xóa!"); // Thông báo sau khi xóa
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5">
        <Text className="text-xl font-poppins-bold text-primary-200 mt-5 mb-4">Giỏ hàng</Text>
        {/* <Text className="text-2xl font-bold mb-4">Giỏ Hàng</Text>
        {renderCart()} */}

        {/* Hiển thị danh sách các mục giỏ hàng */}
        <View style={{ height: 300 }}>
          <FlatList
            data={cart} // Sử dụng giỏ hàng từ context
            keyExtractor={(item, index) => index.toString()} // Key từ index vì không có id
            renderItem={({ item }) => <CartItem item={item} />}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          />
        </View>

        {/* Nhập mã giảm giá */}
        <View className="mt-5 flex flex-row border border-gray-100 rounded-lg">
          <TextInput
            placeholder="Nhập mã giảm giá"
            className="px-3 flex-1"
            placeholderTextColor="#9ca3af"
          />
          <CustomButton
            title="Áp dụng"
            containerStyles="bg-primary-100 px-5 rounded-r-lg"
            textStyles="text-white"
            handlePress={handleClearCart} // Gọi đúng hàm
          />
        </View>

        {/* Hiển thị thông tin thanh toán */}
        <View className="px-5 border border-gray-100 py-5 rounded-lg flex-col gap-2 mt-5">
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-poppins-regular text-gray-200">Sản phẩm ({cart.length}):</Text>
            <Text className="text-lg font-poppins-regular text-primary-200">${totalPrice.toFixed(2)}</Text>
          </View>
          {cart.length > 0 && (
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-poppins-regular text-gray-200">Giao hàng:</Text>
              <Text className="text-lg font-poppins-regular text-primary-200">-${shippingFee.toFixed(2)}</Text>
            </View>
          )}
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-poppins-regular text-gray-200">Giảm giá:</Text>
            <Text className="text-lg font-poppins-regular text-primary-200">$0.00</Text>
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
            handlePress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
