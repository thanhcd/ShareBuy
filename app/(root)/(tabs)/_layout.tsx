import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#40BFFF' : '#9098B1'} resizeMode='contain' className='size-8' />
        <Text className={`${focused ? 'text-primary-100 font-poppins-bold' : 'text-primary-200 font-poppins-regular'} text-[10px] w-full text-center`}>{title}</Text>
    </View>
)
const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "white",
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                minHeight: 70
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.home} focused={focused} title='Home' />
                    )
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.search} focused={focused} title='Explore' />
                    )
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.cart} focused={focused} title='Cart' />
                    )
                }}
            />
            <Tabs.Screen
                name='offer'
                options={{
                    title: 'Offer',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.offer} focused={focused} title='Offer' />
                    )
                }}
            />
            <Tabs.Screen
                name='account'
                options={{
                    title: 'Account',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.user} focused={focused} title='Account' />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout