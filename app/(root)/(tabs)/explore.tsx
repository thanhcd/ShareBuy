import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SearchBar from '@/components/Search'
import icons from '@/constants/icons'
import { router } from 'expo-router'

const explore = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='px-5 mt-5'>
        <SearchBar
          leftIcon={icons.filter}
          rightIcon={icons.filter1}
          onLeftPress={() => router.push('/classify')}
        />

      </View>
    </SafeAreaView>
  )
}

export default explore