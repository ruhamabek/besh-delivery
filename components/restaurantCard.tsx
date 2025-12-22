import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as Icon from "react-native-feather";

export default function RestaurantCard({ item }: { item: any }) {
    const navigation = useNavigation<any>();
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Restaurant', { ...item })}>
            <View
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 8,
                }}
                className="mr-5 bg-white rounded-2xl overflow-hidden mb-4"
            >
                {/* Image Container with Overlays */}
                <View className="relative">
                    <Image
                        className="h-40 w-72"
                        source={item.image}
                        resizeMode="cover"
                    />

                    {/* Gradient Overlay for better text readability */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 60,
                            backgroundColor: 'rgba(0,0,0,0.15)',
                        }}
                    />

                    {/* Favorite Button */}
                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: 20,
                            padding: 8,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Icon.Heart
                            width={18}
                            height={18}
                            fill={isFavorite ? '#ef4444' : 'transparent'}
                            color={isFavorite ? '#ef4444' : '#374151'}
                            strokeWidth={2}
                        />
                    </TouchableOpacity>

                    {/* Delivery Time Badge */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                    >
                        <Icon.Clock width={12} height={12} color="#f97316" strokeWidth={2.5} />
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#374151', marginLeft: 4 }}>
                            25-35 min
                        </Text>
                    </View>

                    {/* Promo Badge (optional) */}
                    {item.stars >= 4.5 && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                backgroundColor: '#f97316',
                                borderRadius: 6,
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                            }}
                        >
                            <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>
                                TOP RATED
                            </Text>
                        </View>
                    )}
                </View>

                {/* Content Section */}
                <View className="px-4 py-3">
                    {/* Restaurant Name & Category */}
                    <View className="flex-row justify-between items-start mb-2">
                        <View style={{ flex: 1 }}>
                            <Text
                                className="text-lg font-bold text-gray-900"
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text className="text-xs text-gray-500 mt-0.5">
                                {item.category}
                            </Text>
                        </View>

                        {/* Rating Badge */}
                        <View
                            style={{
                                backgroundColor: '#fef3c7',
                                borderRadius: 8,
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Icon.Star fill="#f59e0b" color="#f59e0b" width={12} height={12} />
                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#92400e', marginLeft: 3 }}>
                                {item.stars}
                            </Text>
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={{ height: 1, backgroundColor: '#f3f4f6', marginVertical: 8 }} />

                    {/* Bottom Row: Location & Reviews */}
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center" style={{ flex: 1 }}>
                            <Icon.MapPin color="#9ca3af" width={14} height={14} />
                            <Text
                                className="text-gray-500 text-xs ml-1"
                                numberOfLines={1}
                                style={{ flex: 1 }}
                            >
                                {item.address || 'Nearby'}
                            </Text>
                        </View>

                        <View className="flex-row items-center ml-2">
                            <Icon.MessageCircle color="#9ca3af" width={12} height={12} />
                            <Text className="text-gray-400 text-xs ml-1">
                                {item.reviews}+ reviews
                            </Text>
                        </View>
                    </View>

                    {/* Delivery Info Row */}
                    <View
                        className="flex-row items-center mt-2 pt-2"
                        style={{ borderTopWidth: 1, borderTopColor: '#f9fafb' }}
                    >
                        <View
                            style={{
                                backgroundColor: '#ecfdf5',
                                borderRadius: 4,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                            }}
                        >
                            <Text style={{ fontSize: 10, fontWeight: '600', color: '#059669' }}>
                                Free Delivery
                            </Text>
                        </View>
                        <Text className="text-gray-400 text-xs mx-2">•</Text>
                        <Text className="text-gray-500 text-xs">
                            Min. $15
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
