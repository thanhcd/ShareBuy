import { Card, Featuredcards } from "@/components/Cards";
import Filter from "@/components/filter";
import SearchBar from "@/components/Search";
import images from "@/constants/images";
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
            <SearchBar />
            <View className="flex items-center justify-center relative">
              <View className="flex flex-col items-center gap-5 mt-5">
                <Image
                  source={images.durian}
                  className="h-62 w-auto"
                  resizeMode="contain"
                />

                <Image source={images.slider} />
              </View>

              <View className="absolute flex flex-col justify-center items-start left-0 px-5 gap-y-5">
                <Text
                  className="text-white font-poppins-bold text-2xl text-start max-w-52"
                  numberOfLines={2}
                >
                  Chiến dịch giải cứu sầu riêng
                </Text>
                <View className="flex-row gap-2 items-center">
                  <View className="bg-white px-4 py-2 rounded-md">
                    <Text className="font-bold text-lg text-black">{currentDateTime.getHours()}</Text>
                  </View>
                  <Text className="text-white font-bold text-lg">:</Text>
                  <View className="bg-white px-4 py-2 rounded-md">
                    <Text className="font-bold text-lg text-black">{currentDateTime.getMinutes()}</Text>
                  </View>
                  <Text className="text-white font-bold text-lg">:</Text>
                  <View className="bg-white px-4 py-2 rounded-md">
                    <Text className="font-bold text-lg text-black">{currentDateTime.getSeconds()}</Text>
                  </View>
                </View>
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
            <View className="items-center justify-center relative mb-2">
              <View className="flex flex-col items-center gap-5 mt-5">
                <Image
                  source={images.shoebanner}
                  className="h-62 w-auto"
                  resizeMode="contain"
                />
              </View>

              <View className="absolute flex flex-col justify-center items-start left-0 px-5 gap-y-5">
                <Text
                  className="text-white font-poppins-bold text-2xl text-start max-w-52"
                  numberOfLines={2}
                >
                  Recomended
                  Product
                </Text>
                <Text
                  className="text-white font-poppins-regular text-base text-start max-w-80"
                >
                  We recommend the best for you
                </Text>

              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
