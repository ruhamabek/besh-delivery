import { allRestaurants } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchScreen() {
    const navigation = useNavigation<any>();
    const { theme, isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = [
        "Pizza", "Burger", "Italian", "Chinese", "Dessert", "Healthy", "Sushi", "Ethiopian"
    ];

    // Filter Logic
    const filteredRestaurants = useMemo(() => {
        let results = allRestaurants;

        // Filter by Query (Name or Dish)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(restaurant => {
                const nameMatch = restaurant.name.toLowerCase().includes(query);
                const dishMatch = restaurant.dishes?.some((dish: any) =>
                    dish.name.toLowerCase().includes(query)
                );
                return nameMatch || dishMatch;
            });
        }

        // Filter by Category
        if (activeCategory) {
            results = results.filter(restaurant =>
                restaurant.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        // Deduplicate results just in case (e.g. from constants)
        return Array.from(new Set(results.map(r => r.id)))
            .map(id => results.find(r => r.id === id)!);

    }, [searchQuery, activeCategory]);

    // Show popular if no search is active
    const showPopular = !searchQuery && !activeCategory;
    const displayList = showPopular ? allRestaurants.slice(0, 3) : filteredRestaurants;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View className='p-4 flex-1'>
                <Text style={{ color: theme.colors.text }} className='text-2xl font-bold mb-4'>Search</Text>

                {/* Search Input */}
                <View
                    style={{ backgroundColor: theme.colors.input }}
                    className='flex-row items-center p-3 rounded-2xl mb-6'
                >
                    <Icon.Search width={22} height={22} color={theme.colors.textSecondary} />
                    <TextInput
                        placeholder="Restaurants, dishes, cuisine..."
                        placeholderTextColor={theme.colors.textSecondary}
                        style={{ flex: 1, marginLeft: 12, fontSize: 16, color: theme.colors.text }}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={false}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Icon.X width={20} height={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Categories */}
                <View>
                    <Text style={{ color: theme.colors.text }} className='text-lg font-bold mb-3'>Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveCategory(activeCategory === cat ? null : cat)}
                                style={{
                                    backgroundColor: activeCategory === cat ? theme.colors.primary : theme.colors.input,
                                    borderWidth: 1,
                                    borderColor: activeCategory === cat ? theme.colors.primary : theme.colors.border
                                }}
                                className='px-4 py-2 rounded-full mr-2'
                            >
                                <Text style={{
                                    color: activeCategory === cat ? '#fff' : theme.colors.textSecondary,
                                    fontWeight: activeCategory === cat ? '600' : '400'
                                }}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Results List */}
                <Text style={{ color: theme.colors.text }} className='text-lg font-bold mb-3'>
                    {showPopular ? 'Popular Restaurants' : `Results (${displayList.length})`}
                </Text>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    {displayList.length > 0 ? (
                        displayList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('Restaurant', { ...item })}
                                activeOpacity={0.7}
                                style={{
                                    backgroundColor: theme.colors.surface,
                                    borderColor: theme.colors.border,
                                    borderWidth: isDark ? 1 : 0
                                }}
                                className='flex-row mb-4 rounded-2xl shadow-sm p-3'
                            >
                                <Image
                                    source={item.image}
                                    className='w-20 h-20 rounded-xl bg-gray-200'
                                    resizeMode="cover"
                                />
                                <View className='flex-1 ml-3 bg-transparent justify-center'>
                                    <Text style={{ color: theme.colors.text }} className='text-lg font-bold'>{item.name}</Text>
                                    <Text style={{ color: theme.colors.textSecondary }} className='text-xs mt-1'>
                                        {item.category} • {item.address}
                                    </Text>
                                    <View className='flex-row items-center mt-2'>
                                        <Icon.Star width={14} height={14} fill="#f59e0b" color="#f59e0b" />
                                        <Text style={{ color: theme.colors.textSecondary }} className='text-xs ml-1'>
                                            {item.stars} ({item.reviews} reviews)
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className='items-center justify-center py-10'>
                            <Icon.Search width={48} height={48} color={theme.colors.textSecondary} />
                            <Text style={{ color: theme.colors.textSecondary }} className='mt-4 text-center'>
                                No restaurants found matching "{searchQuery}"
                            </Text>
                            {(searchQuery || activeCategory) && (
                                <TouchableOpacity
                                    onPress={() => { setSearchQuery(''); setActiveCategory(null); }}
                                    style={{ marginTop: 20 }}
                                >
                                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Clear Filters</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
