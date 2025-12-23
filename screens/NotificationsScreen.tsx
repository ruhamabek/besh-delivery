import { useTheme } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'promo' | 'order' | 'system';
    read: boolean;
}

const initialNotifications: NotificationItem[] = [
    {
        id: '1',
        title: '50% OFF First Order!',
        message: 'Use code WELCOME50 to get 50% off your first order. Valid until Sunday!',
        time: '2 hours ago',
        type: 'promo',
        read: false,
    },
    {
        id: '2',
        title: 'Order Delivered',
        message: 'Your order from Burger Palace has been delivered. Enjoy your meal! 🍔',
        time: 'Yesterday',
        type: 'order',
        read: true,
    },
    {
        id: '3',
        title: 'New Restaurants Added',
        message: 'We have added 5 new restaurants in your area. Check them out now!',
        time: '2 days ago',
        type: 'system',
        read: true,
    },
    {
        id: '4',
        title: 'Free Delivery Weekend',
        message: 'Get free delivery on all orders over $20 this weekend.',
        time: '3 days ago',
        type: 'promo',
        read: true,
    },
];

export default function NotificationsScreen() {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();
    const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'promo': return { icon: 'Gift', color: '#f97316', bg: '#fff7ed' };
            case 'order': return { icon: 'ShoppingBag', color: '#22c55e', bg: '#f0fdf4' };
            case 'system': return { icon: 'Info', color: '#3b82f6', bg: '#eff6ff' };
            default: return { icon: 'Bell', color: '#6b7280', bg: '#f3f4f6' };
        }
    };

    const renderNotification = ({ item }: { item: NotificationItem }) => {
        const { icon, color, bg } = getIcon(item.type);
        const IconComponent = Icon[icon as keyof typeof Icon] as any;

        // Adjust background for dark mode if needed
        const iconBg = isDark ? theme.colors.surfaceHighlight : bg;

        return (
            <TouchableOpacity
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.7}
                style={{
                    backgroundColor: item.read ? theme.colors.surface : (isDark ? theme.colors.surface : '#fefce8'),
                    padding: 16,
                    marginHorizontal: 16,
                    marginBottom: 12,
                    borderRadius: 16,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: item.read ? 'transparent' : (isDark ? theme.colors.primary : '#fef08a')
                }}
            >
                <View style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: iconBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14
                }}>
                    <IconComponent width={22} height={22} color={color} strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ fontSize: 16, fontWeight: item.read ? '600' : '700', color: theme.colors.text }}>
                            {item.title}
                        </Text>
                        {!item.read && (
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.primary }} />
                        )}
                    </View>
                    <Text style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 }}>
                        {item.message}
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 8 }}>
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Header */}
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: theme.colors.surface,
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3
                    }}
                >
                    <Icon.ArrowLeft strokeWidth={2.5} stroke={theme.colors.primary} width={20} height={20} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.text }}>Notifications</Text>
                <TouchableOpacity onPress={markAllAsRead}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primary }}>Read All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100, paddingHorizontal: 32 }}>
                        <Icon.BellOff width={64} height={64} color={theme.colors.textSecondary} />
                        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.textSecondary, marginTop: 16 }}>No Notifications</Text>
                        <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 8 }}>
                            You're all caught up! Check back later for updates.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
