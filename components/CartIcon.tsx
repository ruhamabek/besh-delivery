import { useCart } from '@/slices/cartSlice';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

export default function CartIcon() {
    const navigation = useNavigation<any>();
    const { cartCount } = useCart();

    // Always show cart icon to allow user to view empty cart or just navigation
    // if (cartCount === 0) return null;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="absolute top-4 right-4 z-50 p-4 rounded-full"
            style={{
                backgroundColor: themeColors.bgColor(1),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 10,
            }}
        >
            <Icon.ShoppingCart width={24} height={24} color="white" strokeWidth={2.5} />
            {/* Badge - Only show if count > 0 */}
            {cartCount > 0 && (
                <View
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full h-6 w-6 items-center justify-center border-2 border-white"
                >
                    <Text className="text-white text-xs font-bold">
                        {cartCount > 9 ? '9+' : cartCount}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
