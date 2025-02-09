import { Link, router } from "expo-router";
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="h-full w-full">
      <View className="w-full justify-center items-center">
        {/* <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="font-outfit-medium">Go to Login Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="font-outfit-medium">Go to Tabs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="font-outfit-medium">Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="font-outfit-medium">Go to Profile</Text>
        </TouchableOpacity> */}
        <Link href={'/signIn'}><Text>sign</Text></Link>
        <Link href={'/profile'}><Text>profile</Text></Link>
        <Link href={'/search'}><Text>search</Text></Link>
        <Link href={'/explore'}><Text>search</Text></Link>
        
      </View>
    </SafeAreaView>
  );
}
