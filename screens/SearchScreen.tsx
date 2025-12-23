import { allRestaurants } from '@/constants';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

const filterChips = [
    { id: 'all', label: 'All', icon: 'Grid' },
    { id: 'ethiopian', label: 'Ethiopian', icon: 'Coffee' },
    { id: 'fast-food', label: 'Fast Food', icon: 'Zap' },
    { id: 'chinese', label: 'Chinese', icon: 'Box' },
    { id: 'italian', label: 'Italian', icon: 'Disc' },
];

const recentSearches = ['Pizza', 'Burger', 'Habesha', 'Chinese'];
const popularSearches = ['Doro Wot', 'Pasta', 'Fried Rice', 'Coffee'];

export default function SearchScreen() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredRestaurants = allRestaurants.filter(restaurant => {
        const matchesSearch = searchQuery === '' ||
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'all' ||
            restaurant.category.toLowerCase().includes(activeFilter.replace('-', ' '));

        return matchesSearch && matchesFilter;
    });

    const renderSearchSuggestion = (item: string, isRecent: boolean) => (
        <TouchableOpacity
            key={item}
            onPress={() => setSearchQuery(item)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
            }}
        >
            {isRecent ? (
                <Icon.Clock width={18} height={18} color="#9ca3af" />
            ) : (
                <Icon.TrendingUp width={18} height={18} color="#f97316" />
            )}
            <Text style={{ marginLeft: 12, fontSize: 15, color: '#374151' }}>
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderRestaurant = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Restaurant', { ...item })}
            activeOpacity={0.9}
            style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 16,
                marginHorizontal: 16,
                marginBottom: 12,
                padding: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            <Image
                source={item.image}
                style={{ width: 80, height: 80, borderRadius: 12 }}
                resizeMode="cover"
            />
            <View style={{ flex: 1, marginLeft: 14, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                    {item.name}
                </Text>
                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                    {item.category}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Icon.Star fill="#f59e0b" color="#f59e0b" width={13} height={13} />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#92400e', marginLeft: 4 }}>
                        {item.stars}
                    </Text>
                    <Text style={{ color: '#d1d5db', marginHorizontal: 6 }}>•</Text>
                    <Text style={{ fontSize: 13, color: '#6b7280' }}>
                        {item.deliveryTime || '25-35 min'}
                    </Text>
                </View>
            </View>
            <Icon.ChevronRight width={20} height={20} color="#d1d5db" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: '#1f2937' }}>
                    Search
                </Text>
            </View>

            {/* Search Input */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    marginHorizontal: 16,
                    marginVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                <Icon.Search width={20} height={20} color="#9ca3af" />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search restaurants, cuisines..."
                    placeholderTextColor="#9ca3af"
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 12,
                        fontSize: 16,
                        color: '#1f2937',
                    }}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Icon.X width={20} height={20} color="#9ca3af" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Filter Chips */}
            <View style={{ paddingVertical: 8 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filterChips}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => {
                        const isActive = activeFilter === item.id;
                        const IconComponent = Icon[item.icon as keyof typeof Icon] as any;
                        return (
                            <TouchableOpacity
                                onPress={() => setActiveFilter(item.id)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    borderRadius: 24,
                                    marginRight: 10,
                                    backgroundColor: isActive ? themeColors.bgColor(1) : '#fff',
                                    borderWidth: 1,
                                    borderColor: isActive ? themeColors.bgColor(1) : '#e5e7eb',
                                }}
                            >
                                <IconComponent
                                    width={16}
                                    height={16}
                                    color={isActive ? '#fff' : '#6b7280'}
                                    strokeWidth={2}
                                />
                                <Text
                                    style={{
                                        marginLeft: 6,
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: isActive ? '#fff' : '#374151',
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            {/* Content */}
            {searchQuery === '' ? (
                <View style={{ flex: 1 }}>
                    {/* Recent Searches */}
                    <View style={{ marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                                Recent Searches
                            </Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 14, color: themeColors.bgColor(1), fontWeight: '600' }}>
                                    Clear
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16 }}>
                            {recentSearches.map(item => renderSearchSuggestion(item, true))}
                        </View>
                    </View>

                    {/* Popular Searches */}
                    <View style={{ marginTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937', paddingHorizontal: 16, marginBottom: 8 }}>
                            Popular Right Now 🔥
                        </Text>
                        <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16 }}>
                            {popularSearches.map(item => renderSearchSuggestion(item, false))}
                        </View>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={filteredRestaurants}
                    renderItem={renderRestaurant}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center', paddingTop: 60 }}>
                            <Icon.Search width={48} height={48} color="#d1d5db" />
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#6b7280', marginTop: 16 }}>
                                No results found
                            </Text>
                            <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 8 }}>
                                Try a different search term
                            </Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
