import { allRestaurants } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

const FAVORITES_KEY = '@favorites';

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
    const { theme, isDark } = useTheme();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                const favoriteIds = JSON.parse(stored);
                // Filter allRestaurants to get the favorite objects
                // Note: In a real app we would fetch these from an API by ID
                const favoriteRestaurants = allRestaurants.filter(r =>
                    favoriteIds.includes(r.id)
                );
                setFavorites(favoriteRestaurants);
            } else {
                setFavorites([]);
            }
        } catch (error) {
            console.log('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (restaurantId: number) => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                const favoriteIds = JSON.parse(stored);
                const updated = favoriteIds.filter((id: number) => id !== restaurantId);
                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
                setFavorites(prev => prev.filter(r => r.id !== restaurantId));
            }
        } catch (error) {
            console.log('Error removing favorite:', error);
        }
    };

    const renderRestaurant = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Restaurant', { ...item })}
            activeOpacity={0.9}
            style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 16,
                marginHorizontal: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
                overflow: 'hidden',
                borderWidth: isDark ? 1 : 0,
                borderColor: theme.colors.border,
            }}
        >
            <Image
                source={item.image}
                style={{ width: '100%', height: 140 }}
                resizeMode="cover"
            />
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text }}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginTop: 4 }}>
                            {item.category} • {item.address}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => removeFavorite(item.id)}
                        style={{
                            backgroundColor: '#fef2f2',
                            borderRadius: 20,
                            padding: 8,
                        }}
                    >
                        <Icon.Heart
                            width={20}
                            height={20}
                            fill="#ef4444"
                            color="#ef4444"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Icon.Star fill="#f59e0b" color="#f59e0b" width={14} height={14} />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#92400e', marginLeft: 4 }}>
                        {item.stars}
                    </Text>
                    <Text style={{ color: theme.colors.textSecondary, marginHorizontal: 8 }}>•</Text>
                    <Icon.Clock width={14} height={14} color={theme.colors.textSecondary} />
                    <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginLeft: 4 }}>
                        {item.deliveryTime || '25-35 min'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const EmptyState = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <View
                style={{
                    backgroundColor: '#fef2f2',
                    borderRadius: 50,
                    padding: 24,
                    marginBottom: 24,
                }}
            >
                <Icon.Heart width={48} height={48} color="#f87171" strokeWidth={1.5} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 8 }}>
                No favorites yet
            </Text>
            <Text style={{ fontSize: 15, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
                Start exploring restaurants and tap the heart icon to save your favorites here!
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeTab')}
                style={{
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 32,
                    paddingVertical: 14,
                    borderRadius: 30,
                    marginTop: 32,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                    Explore Restaurants
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Header */}
            <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: theme.colors.text }}>
                    Favorites
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 }}>
                    {favorites.length} saved restaurants
                </Text>
            </View>

            {favorites.length === 0 && !loading ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderRestaurant}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
                />
            )}
        </SafeAreaView>
    );
}
