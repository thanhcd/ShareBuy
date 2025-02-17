import { Cards, Featuredcards } from "@/components/Cards";
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
            <Text className="text-xl font-poppins-bold text-black-300">Featured</Text>
            <TouchableOpacity>
              <Text className="text-base font-poppins-bold text-primary-100">Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Featuredcards/>
        {/* <Cards/> */}
      </View>

    </SafeAreaView>

  );
}
