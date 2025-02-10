import { TouchableOpacity, Text, ActivityIndicator, Image, View } from "react-native";
import React from "react";

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
    icons,
}) => {
    return (
        <TouchableOpacity
            className={`bg-white min-h-[62px] justify-center items-center ${isLoading ? 'opacity-50' : ''} ${containerStyles}`}
            disabled={isLoading}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <View className="flex-row"> {/* Bọc Image và Text trong View */}
                    <Image source={icons} />
                    <Text className={`font-poppins-bold text-base ${textStyles}`}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );

};

export default CustomButton;