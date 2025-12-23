import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/slices/cartSlice';
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
    const { theme, isDark } = useTheme();

    const deliveryFee = 2;
    const orderTotal = cartTotal + deliveryFee;

    if (items.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

                {/* Header */}
                <View className="relative py-4 border-b border-gray-100 dark:border-gray-800" style={{ borderColor: theme.colors.border }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: theme.colors.primary }}
                        className="absolute z-10 rounded-full p-2 top-3 left-4"
                    >
                        <Icon.ArrowLeft strokeWidth={3} height={20} width={20} stroke="white" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text style={{ color: theme.colors.text }} className="font-bold text-xl">Your Cart</Text>
                    </View>
                </View>

                {/* Empty State */}
                <View className="flex-1 items-center justify-center p-8">
                    <View style={{ backgroundColor: isDark ? theme.colors.surface : '#f3f4f6' }} className="p-6 rounded-full mb-6">
                        <Icon.ShoppingCart width={64} height={64} color={theme.colors.textSecondary} />
                    </View>
                    <Text style={{ color: theme.colors.text }} className="text-2xl font-bold mb-2">Cart is Empty</Text>
                    <Text style={{ color: theme.colors.textSecondary }} className="text-center text-base mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: theme.colors.primary }}
                        className="py-4 px-12 rounded-full shadow-lg"
                    >
                        <Text className="text-white font-bold text-lg">Start Browsing</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Header */}
            <View className="relative py-4 border-b" style={{ borderColor: theme.colors.border }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: theme.colors.primary }}
                    className="absolute z-10 rounded-full p-2 top-3 left-4"
                >
                    <Icon.ArrowLeft strokeWidth={3} height={20} width={20} stroke="white" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text style={{ color: theme.colors.text }} className="font-bold text-xl">Your Cart</Text>
                    <Text style={{ color: theme.colors.textSecondary }} className="text-sm mt-0.5">Calculated based on your selection</Text>
                </View>
            </View>

            {/* Delivery Info */}
            <View
                style={{ backgroundColor: isDark ? theme.colors.surface : '#eef2ff' }}
                className="flex-row px-4 py-3 items-center mx-4 my-4 rounded-2xl"
            >
                <Icon.Truck strokeWidth={3} height={20} width={20} stroke="white"  />
             
                <Text style={{ color: theme.colors.text }} className="flex-1 pl-3 font-medium">
                    Delivered in 20-30 minutes
                </Text>
                <TouchableOpacity>
                    {/* <Text style={{ color: theme.colors.primary }} className="font-bold text-base">
                        Change
                    </Text> */}
                </TouchableOpacity>
            </View>

            {/* Cart Items */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ flex: 1 }}
            >
                {items.map((item, index) => (
                    <View key={item.id}>
                        <View className="flex-row items-center py-4 px-4 mx-4"
                            style={{
                                backgroundColor: theme.colors.surface,
                                marginBottom: 12,
                                borderRadius: 16,
                                borderWidth: isDark ? 1 : 0,
                                borderColor: theme.colors.border
                            }}>
                            {/* Quantity */}
                            <Text
                                style={{ color: theme.colors.primary }}
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
                            <Text style={{ color: theme.colors.text }} className="flex-1 font-semibold text-base ml-3">
                                {item.name}
                            </Text>

                            {/* Price */}
                            <Text style={{ color: theme.colors.text }} className="font-bold text-base mr-4">
                                ${item.price * item.quantity}
                            </Text>

                            {/* Remove Button */}
                            <TouchableOpacity
                                className="p-2 rounded-full"
                                style={{ backgroundColor: theme.colors.primary }}
                                onPress={() => removeFromCart(item.id)}
                            >
                                <Icon.Minus strokeWidth={2.5} height={16} width={16} stroke="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Order Summary */}
            <View
                className="px-6 pt-8 pb-8 rounded-t-3xl space-y-4"
                style={{ backgroundColor: isDark ? theme.colors.surface : '#f6f8fa' }}
            >
                <View className="flex-row justify-between">
                    <Text style={{ color: theme.colors.textSecondary }} className="text-base">Subtotal</Text>
                    <Text style={{ color: theme.colors.text }} className="font-bold text-base">${cartTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text style={{ color: theme.colors.textSecondary }} className="text-base">Delivery Fee</Text>
                    <Text style={{ color: theme.colors.text }} className="font-bold text-base">${deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between border-t pt-4" style={{ borderColor: theme.colors.border }}>
                    <Text style={{ color: theme.colors.text }} className="font-extrabold text-xl">Order Total</Text>
                    <Text style={{ color: theme.colors.text }} className="font-extrabold text-xl">${orderTotal}</Text>
                </View>

                {/* Place Order Button */}
                <TouchableOpacity
                    style={{ backgroundColor: theme.colors.primary }}
                    className="py-4 rounded-full shadow-lg mt-4"
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('OrderPreparing')}
                >
                    <Text className="text-white text-center font-bold text-xl">
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
