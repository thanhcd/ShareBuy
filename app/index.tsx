import { Link, router } from "expo-router";
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="h-full w-full">
      <View className="w-full justify-center items-center">
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="font-outfit-medium">Go to Login Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
