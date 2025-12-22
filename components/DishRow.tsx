import { Dish, useCart } from '@/slices/cartSlice';
import { themeColors } from '@/theme';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

interface DishRowProps {
    dish: Dish;
}

export default function DishRow({ dish }: DishRowProps) {
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const quantity = getItemQuantity(dish.id);

    return (
        <View
            className="flex-row items-center bg-white py-3 px-4 border-b border-gray-100"
        >
            {/* Dish Image */}
            <Image
                source={dish.image}
                className="h-20 w-20 rounded-xl"
                resizeMode="cover"
            />

            {/* Dish Info */}
            <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-gray-800">
                    {dish.name}
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
                    {dish.description}
                </Text>
                <Text
                    className="text-base font-bold mt-1"
                    style={{ color: themeColors.bgColor(1) }}
                >
                    ${dish.price}
                </Text>
            </View>

            {/* Quantity Controls */}
            <View className="flex-row items-center">
                {quantity > 0 && (
                    <>
                        <TouchableOpacity
                            onPress={() => removeFromCart(dish.id)}
                            className="p-1.5 rounded-full"
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                        >
                            <Icon.Minus
                                width={16}
                                height={16}
                                color="white"
                                strokeWidth={3}
                            />
                        </TouchableOpacity>
                        <Text className="px-3 font-bold text-gray-800 text-base">
                            {quantity}
                        </Text>
                    </>
                )}
                <TouchableOpacity
                    onPress={() => addToCart(dish)}
                    className="p-1.5 rounded-full"
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                >
                    <Icon.Plus
                        width={16}
                        height={16}
                        color="white"
                        strokeWidth={3}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
