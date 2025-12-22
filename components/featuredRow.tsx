import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { themeColors } from '../theme'
import RestaurantCard from './restaurantCard'

export default function FeaturedRow({ title, description, restaurants }: { title: string, description: string, restaurants: any[] }) {
    return (
        <View>
            <View className="flex-row justify-between items-center px-4">
                <View>
                    <Text className="font-bold text-xl">{title}</Text>
                    <Text className="text-gray-500 text-xs">
                        {description}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.bgColor(1) }} className="font-semibold">See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                className="overflow-visible py-5"
            >
                {
                    restaurants.map((restaurant, index) => {
                        return (
                            <RestaurantCard
                                item={restaurant}
                                key={index}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}