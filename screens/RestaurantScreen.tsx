import DishRow from '@/components/DishRow';
import { useCart } from '@/slices/cartSlice';
import { themeColors } from '@/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

export const RestaurantScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const restaurant = params;
  const { cartCount, cartTotal } = useCart();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Hero Image with Back Button */}
      <View className="relative">
        <Image
          source={restaurant.image}
          className="w-full h-56"
          resizeMode="cover"
        />
        {/* Gradient Overlay */}
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        />
        {/* Back Button */}
        <SafeAreaView className="absolute top-0 left-0 right-0">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-4 mt-2 bg-white/90 rounded-full p-2 w-10 h-10 items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Icon.ArrowLeft
              width={20}
              height={20}
              strokeWidth={2.5}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Restaurant Info Section */}
      <View className="bg-white -mt-6 rounded-t-3xl pt-5 px-5">
        {/* Restaurant Name */}
        <Text className="text-2xl font-bold text-gray-900">
          {restaurant.name}
        </Text>

        {/* Rating, Category, Location */}
        <View className="flex-row items-center mt-2 flex-wrap">
          {/* Rating */}
          <View className="flex-row items-center">
            <Icon.Star
              width={14}
              height={14}
              fill="#22c55e"
              color="#22c55e"
            />
            <Text className="text-sm text-green-600 ml-1 font-medium">
              {restaurant.reviews} reviews
            </Text>
          </View>
          <Text className="text-gray-400 mx-2">•</Text>

          {/* Category */}
          <Text className="text-sm text-gray-500 font-medium">
            {restaurant.category}
          </Text>
          <Text className="text-gray-400 mx-2">•</Text>

          {/* Location */}
          <View className="flex-row items-center">
            <Icon.MapPin width={12} height={12} color="#9ca3af" />
            <Text className="text-sm text-gray-500 ml-1">
              {restaurant.address}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-sm text-orange-500 mt-2 italic">
          {restaurant.description}
        </Text>
      </View>

      {/* Menu Section */}
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: cartCount > 0 ? 100 : 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Header */}
        <View className="px-5 pt-5 pb-3">
          <Text className="text-xl font-bold text-gray-900">Menu</Text>
        </View>

        {/* Dish List */}
        {restaurant.dishes?.map((dish: any, index: number) => (
          <DishRow key={dish.id || index} dish={dish} />
        ))}

        {/* Empty State */}
        {(!restaurant.dishes || restaurant.dishes.length === 0) && (
          <View className="py-10 items-center">
            <Icon.Coffee width={48} height={48} color="#d1d5db" />
            <Text className="text-gray-400 mt-3">
              No menu items available
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Cart Bar */}
      {cartCount > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-6 pt-3 px-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="flex-row items-center justify-between rounded-full py-4 px-6"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            {/* Cart Count Badge */}
            <View className="bg-white/20 rounded-full h-8 w-8 items-center justify-center">
              <Text className="text-white font-bold text-sm">
                {cartCount}
              </Text>
            </View>

            {/* View Cart Text */}
            <Text className="text-white font-bold text-lg">
              View Cart
            </Text>

            {/* Total */}
            <Text className="text-white font-bold text-lg">
              ${cartTotal.toFixed(0)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
