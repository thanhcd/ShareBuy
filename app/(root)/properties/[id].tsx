import { useLocalSearchParams, router } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import icons from "@/constants/icons";
import { colorOptions, megasale, normalProduct, sizeShow } from "@/constants/data"; // Import danh sách sản phẩm
import images from "@/constants/images";
import { useState } from "react";
import { Featuredcards } from "@/components/Cards";
import CustomButton from "@/components/CustomButton";

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
              <Text className="text-base font-poppins-regular text-gray-200">{product.describe}</Text>
            </View>
          </View>
          <View className="flex flex-col">
            <View className="flex flex-row justify-between mt-5">
              <Text className="text-primary-200 font-poppins-bold text-lg">Đánh giá</Text>
              <TouchableOpacity onPress={() => router.push('/productcomment')}>
                <Text className="text-primary-100 font-poppins-bold text-lg">Xem thêm</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row mt-2">
              {[...Array(5)].map((_, index) => (
                <Image key={index} source={icons.star} />
              ))}
              <View className="flex flex-row gap-2 ml-2">
                <Text className="font-poppins-bold text-gray-200">5</Text>
                <Text className="font-poppins-regular text-gray-200">(5 Reviews)</Text>
              </View>
            </View>
            <View className="flex flex-row gap-5 mt-5">
              <View className="">
                <Image source={images.profilecomment} />
              </View>
              <View className="flex flex-col">
                <Text className="text-primary-200 font-poppins-bold text-lg">James Lawson</Text>
                <View className="flex flex-row">
                  {[...Array(5)].map((_, index) => (
                    <Image key={index} source={icons.star} />
                  ))}
                </View>
              </View>
            </View>
            {/* comment */}
            <View className="mt-5">
              <Text className="text-lg font-poppins-regular text-gray-200">air max are always very comfortable fit,
                clean and just perfect in every way. just the box was too small and scrunched the sneakers up
                a little bit, not sure if the box was always this small but the 90s are and will always be one of my favorites.</Text>
            </View>
          </View>
          <View className="mt-5 flex flex-col">
            <Text className="text-primary-200 font-poppins-bold text-lg">Có lẽ bạn cũng thích</Text>
            <FlatList
              data={megasale}
              renderItem={({ item }) => item ? <Featuredcards item={item} /> : null}
              keyExtractor={(item) => item.id}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
            />
          </View>
          <CustomButton title="Thêm vào giỏ" containerStyles="bg-primary-100 rounded-lg mt-10" textStyles="text-white" handlePress={{}}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
