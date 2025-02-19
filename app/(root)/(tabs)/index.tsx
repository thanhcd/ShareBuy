import { Card, Featuredcards } from "@/components/Cards";
import Filter from "@/components/filter";
import SearchBar from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View, } from "react-native";

export default function Index() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex-1 px-5 gap-5 "
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5 mt-5">
            <SearchBar 
            leftIcon={icons.love} 
            rightIcon={icons.bell} 
            onLeftPress={() => router.push('/favoriteProduct')}
            onRightPress={() => router.push('/notificate')}/>
            <View className="flex relative gap-5 mt-5">
              <View className="relative">
                <Image source={images.durian} className="w-full rounded-md" />
                <View className="absolute inset-0 flex flex-col justify-center items-start px-5 gap-y-5">
                  <Text
                    className="text-white font-poppins-bold text-2xl text-start max-w-52"
                    numberOfLines={2}
                  >
                    Chiến dịch giải cứu sầu riêng
                  </Text>
                  <View className="flex-row gap-2 items-center">
                    <View className="bg-white px-4 py-2 rounded-md">
                      <Text className="font-bold text-lg text-black">
                        {currentDateTime.getHours()}
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-lg">:</Text>
                    <View className="bg-white px-4 py-2 rounded-md">
                      <Text className="font-bold text-lg text-black">
                        {currentDateTime.getMinutes()}
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-lg">:</Text>
                    <View className="bg-white px-4 py-2 rounded-md">
                      <Text className="font-bold text-lg text-black">
                        {currentDateTime.getSeconds()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Ảnh slider phía dưới */}
              <View className="items-center">
                <Image source={images.slider} />
              </View>

            </View>

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-poppins-bold text-primary-200">Phân loại</Text>
                <TouchableOpacity>
                  <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Filter />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-poppins-bold text-primary-200">Flash Sale</Text>
                <TouchableOpacity onPress={() => router.push('/flashsale')}>
                  <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item, index }) => <Featuredcards />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-poppins-bold text-primary-200">Flash Sale</Text>
                <TouchableOpacity>
                  <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item, index }) => <Featuredcards />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="flex relative gap-5 mt-5">
              <View className="relative">
                <Image source={images.shoebanner} className="w-full rounded-md" />
                <View className="absolute inset-0 flex flex-col justify-center items-start px-5 gap-y-5">
                  <Text
                    className="text-white font-poppins-bold text-2xl text-start max-w-52"
                    numberOfLines={2}
                  >
                    Recomended
                    Product
                  </Text>
                  <Text className="text-base font-poppins-regular text-gray-100">We recommend the best for you</Text>
                </View>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
