import { featured } from '@/constants';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    Linking,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeliveryScreen() {
    const restaurant = featured.restaurants[0];
    const navigation = useNavigation<any>();

    // Open in Google Maps
    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}`;
        Linking.openURL(url);
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="absolute z-10 rounded-full p-2 top-10 left-4 shadow-lg"
            >
                <Icon.ArrowLeft strokeWidth={3} height={20} width={20} stroke="white" />
            </TouchableOpacity>

            {/* Map Section - Static visual representation */}
            <View className="flex-1 bg-green-100">
                {/* Map background pattern */}
                <View className="flex-1 relative overflow-hidden">
                    {/* Decorative roads */}
                    <View className="absolute top-1/4 left-0 right-0 h-3 bg-gray-300 opacity-50" />
                    <View className="absolute top-1/2 left-1/4 w-3 h-full bg-gray-300 opacity-50" />
                    <View className="absolute top-3/4 left-0 right-0 h-2 bg-gray-200 opacity-50" />
                    <View className="absolute top-1/3 right-1/4 w-2 h-3/4 bg-gray-200 opacity-50" />

                    {/* Green areas */}
                    <View className="absolute top-1/4 left-1/3 w-24 h-20 bg-green-200 rounded-lg opacity-60" />
                    <View className="absolute bottom-1/3 right-1/4 w-32 h-16 bg-green-300 rounded-lg opacity-50" />

                    {/* Restaurant Marker */}
                    <View className="absolute top-1/3 left-1/2 -ml-20 items-center">
                        <View className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                            <Text className="font-bold text-gray-900 text-base">
                                {restaurant.name}
                            </Text>
                            <Text className="text-gray-500 text-xs mt-0.5">
                                {restaurant.description}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderLeftWidth: 8,
                                borderRightWidth: 8,
                                borderTopWidth: 10,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderTopColor: 'white'
                            }}
                        />
                        {/* Location pin */}
                        <View
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            className="w-8 h-8 rounded-full items-center justify-center mt-1 shadow-lg"
                        >
                            <Icon.MapPin height={18} width={18} stroke="white" fill="white" />
                        </View>
                    </View>

                    {/* Delivery guy location */}
                    <View className="absolute bottom-1/4 right-1/3 items-center">
                        <View className="bg-white rounded-full p-2 shadow-lg">
                            <Image
                                source={require('../assets/delivery_guy.png')}
                                className="w-14 h-14 rounded-full "

                            />
                        </View>
                    </View>

                    {/* Tap to open maps button */}
                    <TouchableOpacity
                        onPress={openMaps}
                        className="absolute bottom-4 right-4 bg-white rounded-full py-2 px-4 shadow-lg flex-row items-center"
                        activeOpacity={0.8}
                    >
                        <Icon.Navigation height={16} width={16} stroke={themeColors.bgColor(1)} />
                        <Text style={{ color: themeColors.bgColor(1) }} className="font-semibold ml-2">
                            Open Maps
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom card */}
            <View className="bg-white rounded-t-3xl -mt-6 shadow-2xl">
                {/* Estimated arrival section */}
                <View className="items-center py-6 border-b border-gray-100">
                    <Text className="text-gray-500 text-base font-medium">
                        Estimated Arrival
                    </Text>
                    <Text className="text-4xl font-bold text-gray-900 mt-1">
                        20-30 Minutes
                    </Text>
                    <Text className="text-gray-500 text-base mt-2">
                        Your order is on its way!
                    </Text>
                </View>

                {/* Driver info section */}
                <View
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="flex-row items-center px-5 py-4 mx-4 my-4 rounded-full"
                >
                    {/* Driver avatar */}
                    <Image
                        source={require('../assets/delivery_guy.png')}
                        className="w-14 h-14 rounded-full bg-white"

                    />

                    {/* Driver info */}
                    <View className="flex-1 ml-3">
                        <Text className="text-white font-bold text-lg">
                            Abebe
                        </Text>
                        <Text className="text-white/80 text-sm">
                            Your Rider
                        </Text>
                    </View>

                    {/* Action buttons */}
                    <View className="flex-row items-center space-x-2">
                        {/* Call button */}
                        <TouchableOpacity
                            className="bg-white w-12 h-12 rounded-full items-center justify-center"
                            activeOpacity={0.8}
                        >
                            <Icon.Phone
                                strokeWidth={2}
                                height={22} onPress={() => navigation.goBack()}
                                width={22}
                                stroke="#22c55e"
                                fill="#22c55e"
                            />
                        </TouchableOpacity>

                        {/* Cancel button */}
                        <TouchableOpacity
                            className="bg-white w-12 h-12 rounded-full items-center justify-center ml-2"
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Icon.X
                                strokeWidth={2.5}
                                height={22}
                                width={22}
                                stroke="#ef4444"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Safe area spacing */}
                <SafeAreaView edges={['bottom']} />
            </View>
        </View>
    );
}