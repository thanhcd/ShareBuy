import SearchBar from "@/components/Search";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 py-5 border-b border-gray-100">
        <SearchBar />
      </View>
    </SafeAreaView>

  );
}
