import Categories from '@/components/categories'
import FeaturedRow from '@/components/featuredRow'
import FilterModal, { FilterState } from '@/components/FilterModal'
import PromoBanner from '@/components/PromoBanner'
import QuickActions from '@/components/QuickActions'
import { categories, featuredHotSpicy, featuredQuickBites, featuredTopRated } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'

// Map category IDs to category names for filtering
const categoryIdToName: { [key: number]: string } = {
    1: 'pizza',
    2: 'fast food',
    3: 'italian',
    4: 'chinese',
    5: 'drinks',
    6: 'sweets',
    7: 'fish',
};

// Map quick action IDs to filter logic
const quickActionFilters: { [key: string]: (restaurant: any) => boolean } = {
    'offers': () => true, // All restaurants have offers in this demo
    'top-rated': (r) => r.stars >= 4.5,
    'fast': (r) => {
        const time = r.deliveryTime || '25-35 min';
        const minTime = parseInt(time.split('-')[0]);
        return minTime <= 20;
    },
    'budget': (r) => {
        const avgPrice = r.dishes?.reduce((sum: number, d: any) => sum + d.price, 0) / (r.dishes?.length || 1);
        return avgPrice <= 15;
    },
    'near': () => true, // All restaurants considered nearby in this demo
};

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { theme, isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 1, 2, 3],
        rating: 0,
        distance: 15,
        dietary: [],
        sortBy: 'Recommended',
    });

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Filter restaurants based on all active filters
    const filterRestaurants = (restaurants: any[]) => {
        return restaurants.filter(restaurant => {
            // Category filter
            if (activeCategory !== null) {
                const categoryName = categoryIdToName[activeCategory]?.toLowerCase() || '';
                if (!restaurant.category.toLowerCase().includes(categoryName)) {
                    return false;
                }
            }

            // Quick action filter
            if (activeQuickFilter && quickActionFilters[activeQuickFilter]) {
                if (!quickActionFilters[activeQuickFilter](restaurant)) {
                    return false;
                }
            }

            // Rating filter from modal
            if (filters.rating > 0 && restaurant.stars < filters.rating) {
                return false;
            }

            return true;
        });
    };

    // Create filtered featured sections
    const filteredSections = useMemo(() => {
        return [
            { ...featuredHotSpicy, restaurants: filterRestaurants(featuredHotSpicy.restaurants) },
            { ...featuredQuickBites, restaurants: filterRestaurants(featuredQuickBites.restaurants) },
            { ...featuredTopRated, restaurants: filterRestaurants(featuredTopRated.restaurants) },
        ].filter(section => section.restaurants.length > 0);
    }, [activeCategory, activeQuickFilter, filters]);

    // Handle category press
    const handleCategoryPress = (categoryId: number | null) => {
        setActiveCategory(categoryId);
        setActiveQuickFilter(null); // Reset quick filter when category changes
    };

    // Handle quick action press
    const handleQuickActionPress = (actionId: string) => {
        setActiveQuickFilter(activeQuickFilter === actionId ? null : actionId);
        setActiveCategory(null); // Reset category when quick action changes
    };

    // Handle filter apply
    const handleApplyFilters = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    // Handle search focus - navigate to search screen
    const handleSearchFocus = () => {
        navigation.navigate('SearchTab');
    };

    // Count active filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.priceRange.length < 4) count++;
        if (filters.rating > 0) count++;
        if (filters.distance < 15) count++;
        if (filters.dietary.length > 0) count++;
        if (filters.sortBy !== 'Recommended') count++;
        return count;
    }, [filters]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Header with Greeting */}
            <View className='px-4 pt-2 pb-3'>
                <View className='flex-row justify-between items-center'>
                    <View>
                        <Text style={{ color: theme.colors.textSecondary }} className='text-sm'>{getGreeting()} 👋</Text>
                        <Text style={{ color: theme.colors.text }} className='text-2xl font-bold mt-1'>John Doe</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={{ backgroundColor: theme.colors.primary + '20' }}
                        className='w-12 h-12 rounded-full items-center justify-center'
                    >
                        <Icon.Bell width={22} height={22} color={theme.colors.primary} />
                        {/* Notification badge */}
                        <View className='absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2'>
                <TouchableOpacity
                    onPress={handleSearchFocus}
                    activeOpacity={0.8}
                    style={{ backgroundColor: theme.colors.input }}
                    className='flex-row flex-1 items-center p-3 rounded-2xl'
                >
                    <Icon.Search width={22} height={22} color={theme.colors.textSecondary} />
                    <Text style={{ color: theme.colors.textSecondary }} className='flex-1 ml-3'>Search restaurants, dishes...</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                    style={{ backgroundColor: theme.colors.primary }}
                    className='p-3 rounded-2xl relative'
                >
                    <Icon.Sliders width={22} height={22} strokeWidth={2.5} color="white" />
                    {activeFilterCount > 0 && (
                        <View
                            style={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                backgroundColor: '#ef4444',
                                borderRadius: 10,
                                minWidth: 20,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: theme.colors.surface,
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
                                {activeFilterCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Active Filter Chips */}
            {(activeCategory !== null || activeQuickFilter !== null) && (
                <View className='px-4 pb-2'>
                    <View className='flex-row items-center'>
                        <Text style={{ color: theme.colors.textSecondary }} className='text-sm mr-2'>Active filters:</Text>
                        {activeCategory !== null && (
                            <TouchableOpacity
                                onPress={() => setActiveCategory(null)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: theme.colors.primary + '20',
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    marginRight: 8,
                                }}
                            >
                                <Text style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 13 }}>
                                    {categories.find(c => c.id === activeCategory)?.name}
                                </Text>
                                <Icon.X width={14} height={14} color={theme.colors.primary} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        )}
                        {activeQuickFilter !== null && (
                            <TouchableOpacity
                                onPress={() => setActiveQuickFilter(null)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: theme.colors.primary + '20',
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 13 }}>
                                    {activeQuickFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Text>
                                <Icon.X width={14} height={14} color={theme.colors.primary} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Promo Banner Carousel */}
                <PromoBanner />

                {/* Quick Actions */}
                <QuickActions
                    activeFilter={activeQuickFilter}
                    onActionPress={handleQuickActionPress}
                />

                {/* Categories */}
                <View className='mt-4'>
                    <View className='flex-row justify-between items-center px-4 mb-2'>
                        <Text style={{ color: theme.colors.text }} className='font-bold text-lg'>Categories</Text>
                        <TouchableOpacity onPress={() => setActiveCategory(null)}>
                            <Text style={{ color: theme.colors.primary }} className='font-semibold text-sm'>
                                {activeCategory !== null ? 'Clear' : 'See All'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Categories
                        activeCategory={activeCategory}
                        onCategoryPress={handleCategoryPress}
                    />
                </View>

                {/* Featured Sections */}
                <View className='mt-5'>
                    {filteredSections.length > 0 ? (
                        filteredSections.map((item) => (
                            <FeaturedRow
                                key={item.id}
                                title={item.title}
                                restaurants={item.restaurants}
                                description={item.description}
                            />
                        ))
                    ) : (
                        <View className='items-center py-16 px-8'>
                            <Icon.Search width={48} height={48} color={theme.colors.textSecondary} />
                            <Text style={{ color: theme.colors.textSecondary }} className='text-lg font-semibold mt-4'>No restaurants found</Text>
                            <Text style={{ color: theme.colors.textSecondary }} className='text-center mt-2'>
                                Try adjusting your filters to see more options
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setActiveCategory(null);
                                    setActiveQuickFilter(null);
                                }}
                                style={{ backgroundColor: theme.colors.primary }}
                                className='mt-6 px-6 py-3 rounded-full'
                            >
                                <Text className='text-white font-semibold'>Clear Filters</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </ScrollView>

            {/* Filter Modal */}
            <FilterModal
                visible={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApply={handleApplyFilters}
                initialFilters={filters}
            />
        </SafeAreaView>
    )
}
