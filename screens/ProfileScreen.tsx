import { themeColors } from '@/theme';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingItemProps {
    icon: keyof typeof Icon;
    title: string;
    subtitle?: string;
    showChevron?: boolean;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    color?: string;
}

const SettingItem = ({ icon, title, subtitle, showChevron = true, rightElement, onPress, color = '#6b7280' }: SettingItemProps) => {
    const IconComponent = Icon[icon] as any;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 16,
                backgroundColor: '#fff',
            }}
        >
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: `${color}15`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                }}
            >
                <IconComponent width={20} height={20} color={color} strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
                        {subtitle}
                    </Text>
                )}
            </View>
            {rightElement || (showChevron && (
                <Icon.ChevronRight width={20} height={20} color="#d1d5db" />
            ))}
        </TouchableOpacity>
    );
};

export default function ProfileScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <StatusBar barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: '#1f2937' }}>
                        Profile
                    </Text>
                </View>

                {/* User Card */}
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 16,
                        marginVertical: 16,
                        borderRadius: 20,
                        padding: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.08,
                        shadowRadius: 12,
                        elevation: 4,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 36,
                                backgroundColor: themeColors.bgColor(0.15),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Icon.User width={36} height={36} color={themeColors.bgColor(1)} strokeWidth={1.5} />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937' }}>
                                John Doe
                            </Text>
                            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                                john.doe@email.com
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                <View
                                    style={{
                                        backgroundColor: '#ecfdf5',
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        borderRadius: 12,
                                    }}
                                >
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#059669' }}>
                                        Premium Member
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: themeColors.bgColor(0.1),
                                borderRadius: 12,
                                padding: 10,
                            }}
                        >
                            <Icon.Edit2 width={18} height={18} color={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                    </View>

                    {/* Stats */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 24,
                            paddingTop: 20,
                            borderTopWidth: 1,
                            borderTopColor: '#f3f4f6',
                        }}
                    >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '800', color: themeColors.bgColor(1) }}>
                                24
                            </Text>
                            <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
                                Orders
                            </Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#f3f4f6' }} />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '800', color: themeColors.bgColor(1) }}>
                                5
                            </Text>
                            <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
                                Favorites
                            </Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#f3f4f6' }} />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '800', color: themeColors.bgColor(1) }}>
                                $156
                            </Text>
                            <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
                                Saved
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Settings Sections */}
                <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#9ca3af', marginLeft: 20, marginBottom: 8 }}>
                        ACCOUNT
                    </Text>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem icon="MapPin" title="Delivery Addresses" subtitle="Home, Work, Other" color="#3b82f6" />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="CreditCard" title="Payment Methods" subtitle="Visa •••• 4242" color="#8b5cf6" />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="Gift" title="Promo Codes" subtitle="2 available" color="#f97316" />
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#9ca3af', marginLeft: 20, marginBottom: 8 }}>
                        PREFERENCES
                    </Text>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem
                            icon="Bell"
                            title="Notifications"
                            showChevron={false}
                            color="#22c55e"
                            rightElement={
                                <Switch
                                    value={notifications}
                                    onValueChange={setNotifications}
                                    trackColor={{ false: '#e5e7eb', true: themeColors.bgColor(0.3) }}
                                    thumbColor={notifications ? themeColors.bgColor(1) : '#fff'}
                                />
                            }
                        />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem
                            icon="Moon"
                            title="Dark Mode"
                            showChevron={false}
                            color="#6366f1"
                            rightElement={
                                <Switch
                                    value={darkMode}
                                    onValueChange={setDarkMode}
                                    trackColor={{ false: '#e5e7eb', true: themeColors.bgColor(0.3) }}
                                    thumbColor={darkMode ? themeColors.bgColor(1) : '#fff'}
                                />
                            }
                        />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="Globe" title="Language" subtitle="English" color="#06b6d4" />
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#9ca3af', marginLeft: 20, marginBottom: 8 }}>
                        DIETARY
                    </Text>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem icon="User" title="Dietary Preferences" subtitle="Vegetarian, No Nuts" color="#10b981" />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="AlertCircle" title="Allergies" subtitle="Peanuts, Shellfish" color="#ef4444" />
                    </View>
                </View>

                <View style={{ marginTop: 24, marginBottom: 100 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#9ca3af', marginLeft: 20, marginBottom: 8 }}>
                        SUPPORT
                    </Text>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem icon="HelpCircle" title="Help Center" color="#6b7280" />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="MessageCircle" title="Contact Us" color="#6b7280" />
                        <View style={{ height: 1, backgroundColor: '#f3f4f6', marginLeft: 70 }} />
                        <SettingItem icon="LogOut" title="Sign Out" showChevron={false} color="#ef4444" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
