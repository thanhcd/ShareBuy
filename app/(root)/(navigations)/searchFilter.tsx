import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'

const searchFilter = () => {
    const [selectedBtn, setSelectedBtn] = useState("Mới");

    const handleBtnPress = (title: string) => {
        setSelectedBtn(title);
        router.setParams({ filter: title }); // Cập nhật URL filter
    };


    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                {/* Header */}
                <View className="flex-row py-5 items-center ">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.x} className="size-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Tìm theo lọc
                    </Text>
                </View>
                <View className="w-full">
                    <Text className="text-xl font-poppins-bold text-primary-200">Khoảng giá</Text>
                    <View className="flex flex-row mt-10 gap-4">
                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center ">
                            <TextInput
                                placeholder="100.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold "
                                keyboardType='numeric'
                                textAlignVertical='bottom'
                            />
                        </View>
                        <View className="flex-1 bg-white py-2 px-4 rounded-lg border border-blue-100 justify-center">
                            <TextInput
                                placeholder="200.000đ"
                                placeholderTextColor="#A0AEC0"
                                className="text-gray-600 text-lg font-poppins-bold "
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                </View>
                <View className='mt-5'>
                    <Text className="text-xl font-poppins-bold text-primary-200">Tình trạng</Text>
                    <View className="flex-row gap-3 mt-5">
                        {/* Button Mới */}
                        <CustomButton
                            title="Mới"
                            handlePress={() => handleBtnPress("Mới")}
                            containerStyles={`px-5 border ${selectedBtn === "Mới" ? "bg-primary-100 bg-opacity-10" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Mới" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Đã sử dụng"
                            handlePress={() => handleBtnPress("Đã sử dụng")}
                            containerStyles={`px-5 border ${selectedBtn === "Đã sử dụng" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Đã sử dụng" ? "text-white" : "text-gray-200"}
                        />
                    </View>
                </View>
                <View className='mt-5'>
                    <Text className="text-xl font-poppins-bold text-primary-200">Định dạng mua</Text>

                    <View className="flex-row gap-3 mt-5 flex-wrap">
                        {/* Button Mới */}
                        <CustomButton
                            title="All Listing"
                            handlePress={() => handleBtnPress("All Listing")}
                            containerStyles={`px-5 border ${selectedBtn === "All Listing" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "All Listing" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Accepts Offers"
                            handlePress={() => handleBtnPress("Accepts Offers")}
                            containerStyles={`px-5 border ${selectedBtn === "Accepts Offers" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Accepts Offers" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Auction"
                            handlePress={() => handleBtnPress("Auction")}
                            containerStyles={`px-5 border ${selectedBtn === "Auction" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Auction" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Buy It Now"
                            handlePress={() => handleBtnPress("Buy It Now")}
                            containerStyles={`px-5 border ${selectedBtn === "Buy It Now" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Buy It Now" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Classified Ads"
                            handlePress={() => handleBtnPress("Classified Ads")}
                            containerStyles={`px-5 border ${selectedBtn === "Classified Ads" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Classified Ads" ? "text-white" : "text-gray-200"}
                        />
                    </View>

                </View>
                <View className='mt-5'>
                    <Text className="text-xl font-poppins-bold text-primary-200">Vị trí</Text>
                    <View className="flex-row gap-3 mt-5 flex-wrap">
                        {/* Button Mới */}
                        <CustomButton
                            title="US Only"
                            handlePress={() => handleBtnPress("US Only")}
                            containerStyles={`px-5 border ${selectedBtn === "US Only" ? "border-primary-200 bg-primary-100 bg-opacity-10" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "US Only" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="North America"
                            handlePress={() => handleBtnPress("North America")}
                            containerStyles={`px-5 border ${selectedBtn === "North America" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "North America" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Europe"
                            handlePress={() => handleBtnPress("Europe")}
                            containerStyles={`px-5 border ${selectedBtn === "Europe" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Europe" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Asia"
                            handlePress={() => handleBtnPress("Asia")}
                            containerStyles={`px-5 border ${selectedBtn === "Asia" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Asia" ? "text-white" : "text-gray-200"}
                        />
                    </View>
                </View>
                <View className='mt-5'>
                    <Text className="text-xl font-poppins-bold text-primary-200">Chỉ hiện</Text>
                    <View className="flex-row gap-3 mt-5 flex-wrap">
                        {/* Button Mới */}
                        <CustomButton
                            title="Free Returns"
                            handlePress={() => handleBtnPress("Free Returns")}
                            containerStyles={`px-5 border ${selectedBtn === "Free Returns" ? "border-primary-200 bg-primary-100 bg-opacity-10" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Free Returns" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Returns Accepted"
                            handlePress={() => handleBtnPress("Returns Accepted")}
                            containerStyles={`px-5 border ${selectedBtn === "Returns Accepted" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Returns Accepted" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Authorized Seller"
                            handlePress={() => handleBtnPress("Authorized Seller")}
                            containerStyles={`px-5 border ${selectedBtn === "Authorized Seller" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Authorized Seller" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Completed Items"
                            handlePress={() => handleBtnPress("Completed Items")}
                            containerStyles={`px-5 border ${selectedBtn === "Completed Items" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Completed Items" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Sold Items"
                            handlePress={() => handleBtnPress("Sold Items")}
                            containerStyles={`px-5 border ${selectedBtn === "Sold Items" ? "border-primary-200 bg-primary-100 bg-opacity-10" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Sold Items" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Deals & Savings"
                            handlePress={() => handleBtnPress("Deals & Savings")}
                            containerStyles={`px-5 border ${selectedBtn === "Deals & Savings" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Deals & Savings" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Sale Items"
                            handlePress={() => handleBtnPress("Sale Items")}
                            containerStyles={`px-5 border ${selectedBtn === "Sale Items" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Sale Items" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Listed as Lots"
                            handlePress={() => handleBtnPress("Listed as Lots")}
                            containerStyles={`px-5 border ${selectedBtn === "Listed as Lots" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Listed as Lots" ? "text-white" : "text-gray-200"}
                        />

                        <CustomButton
                            title="Search in Description"
                            handlePress={() => handleBtnPress("Search in Description")}
                            containerStyles={`px-5 border ${selectedBtn === "Search in Description" ? "border-primary-200 bg-primary-100 bg-opacity-10" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Search in Description" ? "text-white" : "text-gray-200"}
                        />

                        {/* Button Đã sử dụng */}
                        <CustomButton
                            title="Benefits charity"
                            handlePress={() => handleBtnPress("Benefits charity")}
                            containerStyles={`px-5 border ${selectedBtn === "Benefits charity" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Benefits charity" ? "text-white" : "text-gray-200"}
                        />
                        <CustomButton
                            title="Authenticity Verified"
                            handlePress={() => handleBtnPress("Authenticity Verified")}
                            containerStyles={`px-5 border ${selectedBtn === "Authenticity Verified" ? "border-primary-200 bg-primary-100" : "border-gray-100"
                                }`}
                            textStyles={selectedBtn === "Authenticity Verified" ? "text-white" : "text-gray-200"}
                        />
                        
                    </View>
                </View>
                <CustomButton title={'Xác nhận'} containerStyles={'bg-primary-100 mt-5 rounded-lg'} textStyles={'text-white'}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default searchFilter