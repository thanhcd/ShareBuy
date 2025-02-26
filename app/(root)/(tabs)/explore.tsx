import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '@/components/Search';
import icons from '@/constants/icons';
import { router, useLocalSearchParams } from 'expo-router';
import { categories_lady, categories_man } from '@/constants/data';
import CustomButton from '@/components/CustomButton';

const explore = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedTitle, setSelectedTitle] = useState(params.filter || 'Áo');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTitlePress = (title: string) => {
    if (selectedTitle === title) {
      setSelectedTitle('Áo');
      router.setParams({ filter: 'Áo' });
      return;
    }
    setSelectedTitle(title);
    router.setParams({ filter: title });
  };

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredMen = categories_man.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredWomen = categories_lady.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5 mt-5">
        <SearchBar
          leftIcon={icons.filter}
          rightIcon={icons.filter1}
          micIcon={icons.mic}
          onLeftPress={() => router.push('/classify')}
          onRightPress={() => router.push('/searchFilter')}
          // onSearch={setSearchQuery} // Cập nhật từ khóa tìm kiếm
        />

        <View className="mt-5">
          {/* Nếu cả hai danh sách đều rỗng, hiển thị "Không có sản phẩm" */}
          {filteredMen.length === 0 && filteredWomen.length === 0 ? (
            <View className="flex items-center justify-center mt-10">
              <Image source={icons.notfound} />
              <Text className="font-poppins-bold text-3xl text-primary-200">Không có sản phẩm</Text>
              <Text className='font-poppins-regular text-base text-gray-200 mt-5'>Hãy đảm bảo bạn nhập đúng tên</Text>
              <CustomButton title={'Quay lại trang chủ'}
                textStyles={'text-white'}
                containerStyles={'h-20 bg-primary-100 rounded-lg mt-5 w-full'}
                handlePress={() => router.push('/')}
              />
            </View>
          ) : (
            <>
              {/* Thời trang nam */}
              {filteredMen.length > 0 && (
                <>
                  <Text className="text-xl font-poppins-bold text-primary-200">Thời trang nam</Text>
                  <View className="flex flex-wrap flex-row mt-3">
                    {filteredMen.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleTitlePress(item.title)}
                        className={`w-1/4 mb-3 flex items-center ${index >= 4 ? 'w-1/2' : ''}`}
                      >
                        <View className="flex flex-col items-center">
                          <View
                            className={`w-14 h-14 flex items-center justify-center rounded-full border ${selectedTitle === item.title ? 'border-primary-100' : 'border-gray-100'
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
                </>
              )}

              {/* Thời trang nữ */}
              {filteredWomen.length > 0 && (
                <>
                  <Text className="text-xl font-poppins-bold text-primary-200 mt-3">Thời trang nữ</Text>
                  <View className="flex flex-wrap flex-row mt-3">
                    {filteredWomen.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleTitlePress(item.title)}
                        className={`w-1/4 mb-3 flex items-center ${index >= 4 ? 'w-1/2' : ''}`}
                      >
                        <View className="flex flex-col items-center">
                          <View
                            className={`w-14 h-14 flex items-center justify-center rounded-full border ${selectedTitle === item.title ? 'border-primary-100' : 'border-gray-100'
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
                </>
              )}
            </>

          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default explore;
