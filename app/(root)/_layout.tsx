import { useGlobalContext } from "@/lib/GlobalProvider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();
    if (loading) {

        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-200" size={"large"}>

                </ActivityIndicator>
            </SafeAreaView>
        )
    }
    if (!isLogged) return <Redirect href={'/signIn'} />
    return <Slot />

}