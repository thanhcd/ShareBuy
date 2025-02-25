import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/Search'
import icons from '@/constants/icons'
import { router, useLocalSearchParams } from 'expo-router'
import { categories_lady, categories_man } from '@/constants/data'

const explore = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedTitle, setSelectedTitle] = useState(params.filter || 'Áo');

  const handleTitlePress = (title: string) => {
    if (selectedTitle === title) {
      setSelectedTitle('Áo');
      router.setParams({ filter: 'Áo' });
      return;
    }
    setSelectedTitle(title);
    router.setParams({ filter: title });
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5 mt-5">
        <SearchBar
          leftIcon={icons.filter}
          rightIcon={icons.filter1}
          onLeftPress={() => router.push('/classify')}
        />
        <View className="mt-5">
          <Text className="text-xl font-poppins-bold text-primary-200">Thời trang nam</Text>

          {/* Danh sách */}
          <View className="flex flex-wrap flex-row mt-3">
            {categories_man.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTitlePress(item.title)}
                className={`w-1/4 mb-3 flex items-center ${index >= 4 ? 'w-1/2' : ''}`}
              >
                <View className="flex flex-col items-center">
                  <View
                    className={`w-14 h-14 flex items-center justify-center rounded-full border ${
                      selectedTitle === item.title ? 'border-primary-100' : 'border-gray-100'
                    } p-10`}
                  >
                    <Image source={item.icon} className="size-7" />
                  </View>
                  <Text className="text-sm font-poppins-regular w-16 text-center text-gray-200">
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-xl font-poppins-bold text-primary-200 mt-3">Thời trang nữ</Text>
          <View className="flex flex-wrap flex-row mt-3">
            {categories_lady.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTitlePress(item.title)}
                className={`w-1/4 mb-3 flex items-center ${index >= 4 ? 'w-1/2' : ''}`}
              >
                <View className="flex flex-col items-center">
                  <View
                    className={`w-14 h-14 flex items-center justify-center rounded-full border ${
                      selectedTitle === item.title ? 'border-primary-100' : 'border-gray-100'
                    } p-10`}
                  >
                    <Image source={item.icon} className="size-7" />
                  </View>
                  <Text className="text-sm font-poppins-regular w-16 text-center text-gray-200">
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default explore;
