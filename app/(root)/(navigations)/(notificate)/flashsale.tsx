import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { router } from 'expo-router';
  
  import icons from '@/constants/icons';
  import images from '@/constants/images';
  import { Card } from '@/components/Cards';
  import { fetchProducts } from '@/lib/appwrite';
  
  const FlashSale = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [product, setProduct] = useState([]);
  
    // Cập nhật thời gian hiện tại mỗi giây
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    // Fetch sản phẩm 1 lần khi component mount
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const profileData = await fetchProducts();
          console.log('Fetched data: ', profileData);
  
          if (profileData && Array.isArray(profileData)) {
            setProduct(profileData);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProfile();
    }, []);
  
    return (
      <SafeAreaView className="h-full bg-white px-5">
        <View className="px-7">
          <FlatList
            data={product}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.$id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 32 }}
            columnWrapperStyle={{ flex: 1, gap: 5 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                {/* Header */}
                <View className="flex-row py-5 items-center">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.left} className="size-9 mr-2" />
                  </TouchableOpacity>
                  <Text className="text-xl font-poppins-bold text-primary-200">
                    Super Flash Sale
                  </Text>
                </View>
  
                {/* Banner Flash Sale */}
                <View className="flex relative gap-5 mt-5">
                  <View className="relative">
                    <Image source={images.promotion} className="w-full rounded-md" />
  
                    <View className="absolute inset-0 flex flex-col justify-center items-start px-5 gap-y-5">
                      <Text
                        className="text-white font-poppins-bold text-2xl text-start max-w-52"
                        numberOfLines={2}
                      >
                        Flash Sale
                      </Text>
  
                      <View className="flex-row gap-2 items-center">
                        <View className="bg-white px-4 py-2 rounded-md">
                          <Text className="font-bold text-lg text-black">
                            {currentDateTime.getHours()}
                          </Text>
                        </View>
  
                        <Text className="text-white font-bold text-lg">:</Text>
  
                        <View className="bg-white px-4 py-2 rounded-md">
                          <Text className="font-bold text-lg text-black">
                            {currentDateTime.getMinutes()}
                          </Text>
                        </View>
  
                        <Text className="text-white font-bold text-lg">:</Text>
  
                        <View className="bg-white px-4 py-2 rounded-md">
                          <Text className="font-bold text-lg text-black">
                            {currentDateTime.getSeconds()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default FlashSale;
  