import { useLocalSearchParams, router } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import icons from "@/constants/icons";
import { normalProduct } from "@/constants/data"; // Import danh sách sản phẩm

const ProductDetail = () => {
  const params = useLocalSearchParams();
  console.log("Received params:", params);

  // Tìm sản phẩm trong danh sách bằng `id`
  const product = normalProduct.find((p) => p.id === params.id);
  console.log("Found product:", product); // Debug kiểm tra dữ liệu tìm được

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-red-500">Sản phẩm không tồn tại!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 px-7 pb-5">
          {/* Header */}
          <View className="flex-row py-5 items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.left} className="w-9 h-9 mr-2" />
            </TouchableOpacity>
          </View>

          {/* Hình ảnh sản phẩm */}
          <Image source={product.image} className="w-full h-40 rounded-lg" />

          {/* Thông tin chi tiết */}
          <View>
            <Text className="text-xl font-bold">{product.name}</Text>
            <Text>Giá gốc: ${product.price}</Text>
            <Text>Giá giảm: ${product.discount}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
