import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import GlobalProvider from "@/lib/GlobalProvider";
import { CartProvider } from "../lib/CartContext";
import { StripeProvider } from '@stripe/stripe-react-native';
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

  return (
    <StripeProvider publishableKey="pk_test_51RIn9KPPTCC6VmXKZRpu9nDKRQvam43GPidsJ4oqz5FFMYXbaYWUp0UmBgaAQTST8CbZ9PhX1D6pesTQvvoLaii10062ftHuaF"> 
      <GlobalProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </GlobalProvider>
    </StripeProvider>

  );
}
