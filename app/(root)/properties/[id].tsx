import { useLocalSearchParams, router } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import icons from "@/constants/icons";
import { colorOptions, normalProduct, sizeShow } from "@/constants/data"; // Import danh sách sản phẩm
import images from "@/constants/images";
import { useState } from "react";

const ProductDetail = () => {
  const params = useLocalSearchParams();
  // console.log("Received params:", params);

  // Tìm sản phẩm trong danh sách bằng `id`
  const product = normalProduct.find((p) => p.id === params.id);
  // console.log("Found product:", product);

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-red-500">Sản phẩm không tồn tại!</Text>
      </SafeAreaView>
    );
  }

  const paramsfilter = useLocalSearchParams<{ filter?: string, color?: string }>();
  const [selectedSize, setSelectedSize] = useState(paramsfilter.filter || '6');

  const handleCategoryPress = (title: string) => {
    if (selectedSize === title) {
      setSelectedSize('6');
      router.setParams({ filter: '6' });
      return
    }
    setSelectedSize(title);
    router.setParams({ filter: title });
  }


  const [selectedColor, setSelectedColor] = useState(paramsfilter.color || '#FFC833');
  const handleColorPress = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('#FFC833'); // Reset về màu mặc định
      router.setParams({ color: '#FFC833' });
      return;
    }
    setSelectedColor(color);
    router.setParams({ color });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className=" px-7 pb-5">
          {/* Header */}
          <View className="flex-row py-5 items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.left} className="w-9 h-9 mr-2" />

            </TouchableOpacity>
            <Text className="text-xl font-poppins-bold text-primary-200">
              {product.name}
            </Text>
          </View>

          <View className="flex flex-col items-center gap-5">
            <Image source={product.image} className="w-full h-64 rounded-lg" />
            <Image source={images.slider} />
          </View>

          <View className="flex flex-col mt-2 gap-5">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl font-poppins-bold text-primary-200">{product.name}</Text>
              <TouchableOpacity>
                <Image source={icons.love} />
              </TouchableOpacity>
            </View>
            <View className="flex-row mt-2">
              {[...Array(5)].map((_, index) => (
                <Image key={index} source={icons.star} />
              ))}
            </View>
            <Text className="text-xl font-poppins-bold text-primary-100">${product.discount}</Text>
          </View>

          <View className="mt-5">
            <Text className="text-lg font-poppins-bold text-primary-200">Chọn kích cỡ</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
              {sizeShow.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => handleCategoryPress(item.title)}
                  className="flex flex-col items-center">

                  <View className="flex flex-col mr-5 items-center justify-center">
                    <View className={`w-14 h-14 flex items-center justify-center rounded-full border 
               ${selectedSize === item.title ? 'border-primary-100' : 'border-gray-100'} p-2`}>

                      {/* Hiển thị chữ ở giữa vòng tròn */}
                      <Text className="text-sm text-primary-200 font-poppins-bold text-center">{item.title}</Text>

                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mt-5">
            <Text className="text-lg font-poppins-bold text-primary-200">Chọn màu</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
              {colorOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleColorPress(item.color)}
                  className="flex flex-col items-center">

                  <View className="flex flex-col mr-5 items-center justify-center">
                    <View
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center
              ${selectedColor === item.color ? 'border-primary-100' : 'border-transparent'}`}
                      style={{ backgroundColor: item.color }}>

                      {/* Hiển thị dấu chấm trắng khi được chọn */}
                      {selectedColor === item.color && (
                        <View className="w-4 h-4 bg-white rounded-full" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="flex flex-col mt-5 gap-5">
            <Text className="text-lg font-poppins-bold text-primary-200">Mô tả</Text>
            <View className="flex flex-row justify-between flex-wrap">
              <Text className="text-base font-poppins-regular text-primary-200">Shown:</Text>
              <Text className="text-base font-poppins-regular text-gray-200 w-48 text-right">Laser Blue/Anthracite/Watermelon/White</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base font-poppins-regular text-primary-200">Style:</Text>
              <Text className="text-base font-poppins-regular text-gray-200 w-48 text-right">CD0113-400</Text>
            </View>
            <View className="mt-4">
              <Text className="text-base font-poppins-regular text-gray-200">The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
