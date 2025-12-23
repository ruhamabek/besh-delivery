import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '../constants';
import { themeColors } from '../theme';

interface CategoriesProps {
    activeCategory: number | null;
    onCategoryPress: (categoryId: number | null) => void;
}

export default function Categories({ activeCategory, onCategoryPress }: CategoriesProps) {
    return (
        <View className="mt-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {/* All Categories option */}
                <View className="flex justify-center items-center mr-6">
                    <TouchableOpacity
                        onPress={() => onCategoryPress(null)}
                        style={{
                            padding: 8,
                            borderRadius: 50,
                            backgroundColor: activeCategory === null ? themeColors.bgColor(1) : '#e5e7eb',
                            shadowColor: activeCategory === null ? themeColors.bgColor(1) : '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <View style={{ width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24 }}>🍽️</Text>
                        </View>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 13,
                            paddingTop: 8,
                            fontWeight: activeCategory === null ? '700' : '500',
                            color: activeCategory === null ? themeColors.bgColor(1) : '#6b7280',
                        }}
                    >
                        All
                    </Text>
                </View>

                {categories.map((category) => {
                    const isActive = category.id === activeCategory;
                    return (
                        <View key={category.id} className="flex justify-center items-center mr-6">
                            <TouchableOpacity
                                onPress={() => onCategoryPress(category.id)}
                                style={{
                                    padding: 4,
                                    borderRadius: 50,
                                    backgroundColor: isActive ? themeColors.bgColor(1) : '#e5e7eb',
                                    shadowColor: isActive ? themeColors.bgColor(1) : '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 3,
                                    transform: [{ scale: isActive ? 1.1 : 1 }],
                                }}
                            >
                                <Image
                                    style={{
                                        width: 45,
                                        height: 45,
                                        tintColor: isActive ? '#fff' : undefined,
                                    }}
                                    source={category.image}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 13,
                                    paddingTop: 8,
                                    fontWeight: isActive ? '700' : '500',
                                    color: isActive ? themeColors.bgColor(1) : '#6b7280',
                                }}
                            >
                                {category.name}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
