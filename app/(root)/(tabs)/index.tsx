import { Cards, Featuredcards } from "@/components/Cards";
import Filter from "@/components/filter";
import SearchBar from "@/components/Search";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 py-5 border-t border-gray-100">
        <SearchBar />
        <View className="my-5 ">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-poppins-bold text-black-300">Flash Sale</Text>
            <TouchableOpacity>
              <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row gap-5">
          <Featuredcards />
          <Featuredcards />
          <Featuredcards />

        </View>
        <View className="my-5 ">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-poppins-bold text-black-300">Phân loại</Text>
            <TouchableOpacity>
              <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Filter/>
        <View className="my-5 ">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-poppins-bold text-black-300">Mega Sales</Text>
            <TouchableOpacity>
              <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row gap-5 mt-5">
          <Cards/>
          <Cards/>
        </View>
      </View>

    </SafeAreaView>

  );
}
