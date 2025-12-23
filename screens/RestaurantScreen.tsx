import CartIcon from '@/components/CartIcon';
import DishRow from '@/components/DishRow';
import { useTheme } from '@/context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

export const RestaurantScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params as any;
  const { theme, isDark } = useTheme();
  // We can use isDark to conditionally render status bar or other elements

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CartIcon />
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView>
        <View className='relative'>
          <Image className='w-full h-72' source={item.image} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow'
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop: -40,
            backgroundColor: theme.colors.background
          }}
          className='pt-6'
        >
          <View className='px-5'>
            <Text style={{ color: theme.colors.text }} className='text-3xl font-bold'>{item.name}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <Icon.Star width={16} height={16} fill="#166534" color="#166534" />
                <Text className='text-green-700'>{item.stars}</Text>
                <Text style={{ color: theme.colors.textSecondary }}>
                  ({item.reviews} reviews) • <Text className='font-semibold'>{item.category}</Text>
                </Text>
              </View>
              <View className='flex-row items-center space-x-1'>
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text style={{ color: theme.colors.textSecondary }} className='text-xs'>Nearby • {item.address}</Text>
              </View>
            </View>
            <Text style={{ color: theme.colors.textSecondary }} className='mt-2'>{item.description}</Text>
          </View>
        </View>

        <View className='pb-36 bg-white dark:bg-slate-900' style={{ backgroundColor: theme.colors.background }}>
          <Text style={{ color: theme.colors.text }} className='px-4 py-4 text-2xl font-bold'>Menu</Text>
          {item.dishes.map((dish: any, index: number) => (
            <DishRow dish={{ ...dish }} key={index} />
          ))}
        </View>

      </ScrollView>
    </View>
  )
}
