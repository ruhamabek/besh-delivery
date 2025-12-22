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
    const { items, addToCart, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

    const deliveryFee = 2;
    const orderTotal = cartTotal + deliveryFee;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-gray-100 rounded-full p-2"
                >
                    <Icon.ArrowLeft
                        width={20}
                        height={20}
                        strokeWidth={2.5}
                        stroke={themeColors.bgColor(1)}
                    />
                </TouchableOpacity>

                <Text className="text-xl font-bold text-gray-900">Your Cart</Text>

                <TouchableOpacity onPress={clearCart}>
                    <Text style={{ color: themeColors.bgColor(1) }} className="font-medium">
                        Clear
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Delivery Info */}
            <View
                className="flex-row items-center mx-5 mt-4 p-3 rounded-xl"
                style={{ backgroundColor: themeColors.bgColor(0.1) }}
            >
                <Icon.Clock width={18} height={18} color={themeColors.bgColor(1)} />
                <Text className="text-gray-700 ml-2 flex-1">
                    Deliver in 25-35 minutes
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.bgColor(1) }} className="font-semibold">
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Cart Items */}
            <ScrollView
                className="flex-1 mt-4"
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {items.length === 0 ? (
                    <View className="items-center justify-center py-20">
                        <Icon.ShoppingCart width={64} height={64} color="#d1d5db" />
                        <Text className="text-gray-400 text-lg mt-4">
                            Your cart is empty
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="mt-6 px-6 py-3 rounded-full"
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                        >
                            <Text className="text-white font-semibold">
                                Browse Menu
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    items.map((item, index) => (
                        <View
                            key={item.id}
                            className="flex-row items-center bg-white mx-5 py-3 border-b border-gray-100"
                        >
                            {/* Item Image */}
                            <Image
                                source={item.image}
                                className="h-16 w-16 rounded-xl"
                                resizeMode="cover"
                            />

                            {/* Item Info */}
                            <View className="flex-1 ml-3">
                                <Text className="text-base font-semibold text-gray-800">
                                    {item.name}
                                </Text>
                                <Text
                                    className="text-base font-bold mt-0.5"
                                    style={{ color: themeColors.bgColor(1) }}
                                >
                                    ${item.price}
                                </Text>
                            </View>

                            {/* Quantity Controls */}
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    onPress={() => removeFromCart(item.id)}
                                    className="p-1.5 rounded-full"
                                    style={{ backgroundColor: themeColors.bgColor(1) }}
                                >
                                    <Icon.Minus
                                        width={14}
                                        height={14}
                                        color="white"
                                        strokeWidth={3}
                                    />
                                </TouchableOpacity>
                                <Text className="px-3 font-bold text-gray-800">
                                    {item.quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => addToCart(item)}
                                    className="p-1.5 rounded-full"
                                    style={{ backgroundColor: themeColors.bgColor(1) }}
                                >
                                    <Icon.Plus
                                        width={14}
                                        height={14}
                                        color="white"
                                        strokeWidth={3}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Order Summary */}
            {cartCount > 0 && (
                <View className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    {/* Subtotal */}
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-500">Subtotal</Text>
                        <Text className="text-gray-800 font-medium">${cartTotal.toFixed(2)}</Text>
                    </View>

                    {/* Delivery Fee */}
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-500">Delivery Fee</Text>
                        <Text className="text-gray-800 font-medium">${deliveryFee.toFixed(2)}</Text>
                    </View>

                    {/* Total */}
                    <View className="flex-row justify-between pt-2 border-t border-gray-200">
                        <Text className="text-gray-900 font-bold text-lg">Total</Text>
                        <Text className="text-gray-900 font-bold text-lg">
                            ${orderTotal.toFixed(2)}
                        </Text>
                    </View>

                    {/* Place Order Button */}
                    <TouchableOpacity
                        className="mt-4 py-4 rounded-full items-center"
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                    >
                        <Text className="text-white font-bold text-lg">
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};
