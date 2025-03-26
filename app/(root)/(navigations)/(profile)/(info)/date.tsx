import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import { Calendar } from 'react-native-calendars';

const DateScreen = () => {
    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay dạng YYYY-MM-DD

    return (
        <SafeAreaView className="h-full bg-white flex-1">
            <View className="flex-1 px-7 pb-5">
                {/* Header */}
                <View className="flex-row py-5 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.left} className="w-9 h-9 mr-2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-poppins-bold text-primary-200">
                        Ngày tháng năm sinh
                    </Text>
                </View>
                <View className='gap-3 mb-5'>
                    <Text className="text-lg font-poppins-bold text-primary-200">
                        Ngày tháng năm sinh của bạn
                    </Text>

                    <View className='px-3 py-3 w-full border border-primary-100 rounded-lg flex flex-row items-center justify-between'>
                        <Text className='font-poppins-bold text-gray-200'>20/12/2002</Text>
                        <TouchableOpacity>
                            <Image source={icons.date} />

                        </TouchableOpacity>
                    </View>
                </View>

                {/* Calendar */}
                <Calendar
                    style={styles.calendar}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#8A98B1',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#40BFFF',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#40BFFF',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#40BFFF',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#9098B1',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#2d4150',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'poppins',
                        textMonthFontFamily: 'poppins',
                        textDayHeaderFontFamily: 'poppins',
                        textDayFontWeight: 'light',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                    dayComponent={({ date, state }) => {
                        const isToday = date.dateString === today;
                        const isSunday = new Date(date.dateString).getDay() === 0; // Kiểm tra Chủ Nhật

                        return (
                            <View
                                style={[
                                    styles.dayContainer,
                                    isToday && styles.todayContainer,
                                    state === 'disabled' && styles.disabledDay
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        isToday && styles.todayText,
                                        isSunday && !isToday && styles.sundayText
                                    ]}
                                >
                                    {date.day}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    calendar: {
        borderWidth: 1,
        borderColor: '#EBF0FF',
        borderRadius: 5,
        paddingBottom: 10,
    },
    dayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 40,
        width: 40
    },
    todayContainer: {
        borderColor: '#40BFFF', // Viền xanh cho ngày hiện tại
        backgroundColor: '#40BFFF',
        borderRadius: 9999,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    dayText: {
        fontSize: 16,
        color: '#2d4150',
    },
    todayText: {
        color: 'white', // Chữ trắng cho ngày hiện tại
        fontWeight: 'bold',
    },
    sundayText: {
        color: 'red', // Chủ Nhật chữ đỏ
        fontWeight: 'bold',
    },
    disabledDay: {
        opacity: 0.5, // Màu mờ cho ngày ngoài tháng hiện tại
    },
});

export default DateScreen;
