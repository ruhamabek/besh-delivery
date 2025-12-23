import { useCart } from '@/slices/cartSlice';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
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

export const CartScreen = () => {
    const navigation = useNavigation<any>();
    const { items, removeFromCart, cartTotal } = useCart();

    const deliveryFee = 2;
    const orderTotal = cartTotal + deliveryFee;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar  />

            {/* Header */}
            <View className="relative py-4 border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="absolute z-10 rounded-full p-2 top-3 left-4"
                >
                    <Icon.ArrowLeft strokeWidth={3} height={20} width={20} stroke="white" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="font-bold text-xl text-gray-900">Your cart</Text>
                    <Text className="text-gray-500 text-sm mt-0.5">Papa Johns</Text>
                </View>
            </View>

            {/* Delivery Info */}
            <View
                style={{ backgroundColor: themeColors.bgColor(0.1) }}
                className="flex-row px-4 py-3 items-center mx-4 my-4 rounded-2xl"
            >
                 <View>
                     <Icon.Truck strokeWidth={2.5} height={20} width={20} className='text-base'  style={{ color: themeColors.bgColor(1) }} />
                 </View>

             
                <Text className="flex-1 pl-3 text-gray-700 font-medium">
                    Delivered in 20-30 minutes
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.bgColor(1) }} className="font-semibold text-base">
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Cart Items */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                className="flex-1 bg-white"
            >
                {items.map((item, index) => (
                    <View key={item.id}>
                        <View className="flex-row items-center py-4 px-4 mx-4">
                            {/* Quantity */}
                            <Text
                                style={{ color: themeColors.bgColor(1) }}
                                className="font-bold text-base mr-3"
                            >
                                {item.quantity} x
                            </Text>

                            {/* Item Image */}
                            <Image
                                className="h-14 w-14 rounded-full"
                                source={item.image}
                                resizeMode="cover"
                            />

                            {/* Item Name */}
                            <Text className="flex-1 font-semibold text-gray-800 text-base ml-3">
                                {item.name}
                            </Text>

                            {/* Price */}
                            <Text className="font-bold text-gray-900 text-base mr-4">
                                ${item.price}
                            </Text>

                            {/* Remove Button */}
                            <TouchableOpacity
                                className="p-2 rounded-full"
                                style={{ backgroundColor: themeColors.bgColor(1) }}
                                onPress={() => removeFromCart(item.id)}
                            >
                                <Icon.Minus strokeWidth={2.5} height={16} width={16} stroke="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Divider between items */}
                        {index < items.length - 1 && (
                            <View className="h-px bg-gray-100 mx-8" />
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Divider */}
            <View className="h-px bg-gray-200 mx-4" />

            {/* Order Summary */}
            <View className="bg-white px-6 pt-4 pb-2">
                <View className="flex-row justify-between py-2">
                    <Text className="text-gray-500 text-base">Subtotal</Text>
                    <Text className="text-gray-700 font-medium text-base">${cartTotal}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                    <Text className="text-gray-500 text-base">Delivery Fee</Text>
                    <Text className="text-gray-700 font-medium text-base">${deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                    <Text className="text-gray-900 font-bold text-base">Order Total</Text>
                    <Text className="text-gray-900 font-bold text-base">${orderTotal}</Text>
                </View>
            </View>

            {/* Place Order Button */}
            <View className="px-6 pb-4 pt-2">
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="py-4 rounded-full shadow-lg"
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('OrderPreparing')}
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
