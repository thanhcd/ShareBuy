import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { Card } from '@/components/Cards'
import { normalProduct } from '@/constants/data'
import { fetchProducts } from '@/lib/appwrite'

const favoriteProduct = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const productData = await fetchProducts();
            // console.log('Fetched data: ', productData);
    
            if (productData && Array.isArray(productData)) {
              setProduct(productData);
            }
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProfile();
      }, []);
    return (
        <SafeAreaView className="h-full bg-white px-5">
            <View className='px-7'>
                <FlatList
                    data={product}
                    renderItem={({ item }) => item ? <Card item={item} /> : null}
                    keyExtractor={(item, index) => item.$id || index.toString()}
                    numColumns={2}
                    contentContainerClassName="pb-32"
                    columnWrapperClassName="flex-1 gap-5 "
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            <View className="flex-row py-5 items-center">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Image source={icons.left} className="size-9 mr-2" />
                                </TouchableOpacity>
                                <Text className="text-xl font-poppins-bold text-primary-200">
                                    Sản phẩm yêu thích
                                </Text>
                            </View>
                        </View>

                    }
                />
            </View>


        </SafeAreaView>
    )

}

export default favoriteProduct