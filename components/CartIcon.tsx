import { useCart } from '@/slices/cartSlice';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

export default function CartIcon() {
    const navigation = useNavigation<any>();
    const { cartCount } = useCart();

    if (cartCount === 0) return null;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="absolute top-14 right-4 p-3 rounded-full"
            style={{
                backgroundColor: themeColors.bgColor(1),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
            }}
        >
            <Icon.ShoppingCart width={20} height={20} color="white" strokeWidth={2.5} />
            {/* Badge */}
            <View
                className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 items-center justify-center"
            >
                <Text className="text-white text-xs font-bold">
                    {cartCount > 9 ? '9+' : cartCount}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
