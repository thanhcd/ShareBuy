import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { router } from 'expo-router';

interface Props {
  onPress?: () => void;
}
export const Featuredcards = ({ item }: { item?: any }) => {
  if (!item) return null; // ✅ Nếu không có item, không render

  return (
    <View className="w-40 h-60 border border-gray-100 flex py-4 items-center overflow-hidden rounded-md">
      <TouchableOpacity className="flex flex-col items-center w-32 h-32 relative">
        <Image source={item.image} className="w-full h-full rounded-md" />
        <View className="flex flex-col items-start w-full mt-2">
          <Text className="text-sm font-poppins-bold text-primary-200" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-sm font-poppins-bold text-primary-100">${item.discount}</Text>
          <View className="flex-row gap-2">
            <Text className="text-xs font-poppins-bold text-gray-200" style={{ textDecorationLine: "line-through" }}>
              ${item.price}
            </Text>
            <Text className="text-xs font-poppins-bold text-red-100">24% Off</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Card = ({ item }: { item?: any }) => {
  if (!item) return null; // ✅ Nếu item bị undefined, không render
  const handlePress = () => {
    console.log("Navigating with:", {
      id: item.id, // Đổi từ item.$id → item.id
      name: item.name,
      price: item.discount,
      image: item.image,
    });
  
    router.push({
      pathname: "/(root)/properties/[id]",
      params: { // Đổi "query" → "params" vì expo-router dùng "params"
        id: item.id, // Đảm bảo id là chuỗi
        name: item.name,
        describe:item.describe,
        price: item.discount,
        image: item.image,
      },  
    });
  };
  
  return (
    <TouchableOpacity className="flex-1 w-full mt-4 px-3 py-4 rounded-lg border border-gray-100 relative" onPress={handlePress}>
      <Image source={item.image} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-poppins-bold text-primary-200">
          {item.name}
        </Text>

        <View className="flex-row">
          {[...Array(5)].map((_, index) => (
            <Image key={index} source={icons.star} />
          ))}
        </View>

        <Text className="text-base font-poppins-bold text-primary-100 mt-5">
          ${item.price}
        </Text>

        <View className="flex-row gap-3">
          <Text
            className="text-sm font-poppins-bold text-gray-200"
            style={{ textDecorationLine: "line-through" }}
          >
            ${item.discount}
          </Text>
          <Text className="text-sm font-poppins-bold text-red-100">
            24% Off
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

