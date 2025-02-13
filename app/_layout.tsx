import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from "@/lib/cache";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  // console.log("your key",publishableKey)
  // if (!publishableKey) {
  //   throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  // }

  
  return (
    // <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    //   <ClerkLoaded>
        <Stack>
          {/* <Stack.Screen
            name="login/index"
            options={{
              headerShown: false, // Đảm bảo header sẽ không hiển thị
            }}
          /> */}
        </Stack>
    //   </ClerkLoaded>
    // </ClerkProvider>
  )
}
