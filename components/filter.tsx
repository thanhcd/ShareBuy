import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filter = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

    const handleCategoryPress = (category: string) => {
        if(selectedCategory === category){
            setSelectedCategory('All');
            router.setParams({filter: 'All'});
            return
        }
        setSelectedCategory(category);
        router.setParams({filter:category});
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
            {categories.map((item, index) => (
                <TouchableOpacity onPress={() => handleCategoryPress(item.category)} className={`flex flex-col items-center 
               `}>
                    <View className='flex flex-col mr-5 items-center'>
                        <View className={`w-14 h-14 flex items-center justify-center rounded-full border ${selectedCategory === item.category ? 'border-primary-100' : 'border-gray-100'} p-10`}>
                            <Image source={item.icon} className='size-7' />
                        </View>
                        <Text className='text-sm font-poppins-regular w-16 text-center break-words text-gray-200'>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filter