import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="login/index"
        options={{
          headerShown: false, // Đảm bảo header sẽ không hiển thị
        }}
      />
    </Stack>
  )
}
