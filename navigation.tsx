import { CartProvider } from '@/slices/cartSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import * as Icon from "react-native-feather";
import { CartScreen } from './screens/CartScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { HomeScreen } from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import ProfileScreen from './screens/ProfileScreen';
import { RestaurantScreen } from './screens/RestaurantScreen';
import SearchScreen from './screens/SearchScreen';

import { ThemeProvider, useTheme } from './context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopWidth: 0,
                    height: 85,
                    paddingTop: 10,
                    paddingBottom: 25,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 20,
                    borderTopColor: theme.colors.border,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon.Home
                                width={24}
                                height={24}
                                color={color}
                                fill={focused ? color : 'transparent'}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && (
                                <View style={{
                                    position: 'absolute',
                                    bottom: -8,
                                    width: 5,
                                    height: 5,
                                    borderRadius: 2.5,
                                    backgroundColor: theme.colors.primary,
                                }} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="SearchTab"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon.Search
                                width={24}
                                height={24}
                                color={color}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && (
                                <View style={{
                                    position: 'absolute',
                                    bottom: -8,
                                    width: 5,
                                    height: 5,
                                    borderRadius: 2.5,
                                    backgroundColor: theme.colors.primary,
                                }} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="FavoritesTab"
                component={FavoritesScreen}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon.Heart
                                width={24}
                                height={24}
                                color={color}
                                fill={focused ? color : 'transparent'}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && (
                                <View style={{
                                    position: 'absolute',
                                    bottom: -8,
                                    width: 5,
                                    height: 5,
                                    borderRadius: 2.5,
                                    backgroundColor: theme.colors.primary,
                                }} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon.User
                                width={24}
                                height={24}
                                color={color}
                                fill={focused ? color : 'transparent'}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && (
                                <View style={{
                                    position: 'absolute',
                                    bottom: -8,
                                    width: 5,
                                    height: 5,
                                    borderRadius: 2.5,
                                    backgroundColor: theme.colors.primary,
                                }} />
                            )}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <ThemeProvider>
            <CartProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeTabs} />
                    <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} options={{ presentation: 'fullScreenModal' }} />
                    <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ animation: 'fade' }} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ presentation: 'modal' }} />
                </Stack.Navigator>
            </CartProvider>
        </ThemeProvider>
    );
}
