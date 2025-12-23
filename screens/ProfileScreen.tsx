import { useTheme } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const navigation = useNavigation<any>();
    const { theme, isDark, toggleTheme } = useTheme();

    // State for toggles
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Mock functionality handlers
    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "This feature would open a profile editing form.");
    };

    const handleFeatureClick = (feature: string) => {
        Alert.alert("Coming Soon", `${feature} feature is under development.`);
    };

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Sign Out", style: "destructive", onPress: () => console.log("Signed out") }
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Profile Section */}
                <View style={{ backgroundColor: theme.colors.surface, padding: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 72,
                            height: 72,
                            borderRadius: 36,
                            backgroundColor: theme.colors.primary + '20',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon.User width={36} height={36} color={theme.colors.primary} strokeWidth={1.5} />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.text }}>John Doe</Text>
                            <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 }}>john.doe@email.com</Text>
                            <View style={{
                                marginTop: 8,
                                backgroundColor: isDark ? '#fef3c720' : '#fef3c7',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                borderRadius: 12
                            }}>
                                <Text style={{ fontSize: 11, fontWeight: '600', color: '#d97706' }}>PREMIUM MEMBER</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleEditProfile} style={{ padding: 8 }}>
                            <Icon.Edit2 width={20} height={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Dashboard */}
                    <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text }}>124</Text>
                            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>Orders</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: theme.colors.border }} />
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text }}>12</Text>
                            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>Favorites</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: theme.colors.border }} />
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text }}>$450</Text>
                            <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>Saved</Text>
                        </View>
                    </View>
                </View>

                {/* Account Settings */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginLeft: 20, marginBottom: 12, letterSpacing: 1 }}>
                        ACCOUNT
                    </Text>
                    <View style={{ backgroundColor: theme.colors.surface, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem
                            icon="MapPin"
                            title="Delivery Addresses"
                            subtitle="Home, Work, Other"
                            color="#3b82f6"
                            onPress={() => handleFeatureClick("Addresses")}
                        />
                        <View style={{ height: 1, backgroundColor: theme.colors.input, marginLeft: 60 }} />
                        <SettingItem
                            icon="CreditCard"
                            title="Payment Methods"
                            subtitle="Visa **42"
                            color="#8b5cf6"
                            onPress={() => handleFeatureClick("Payments")}
                        />
                        <View style={{ height: 1, backgroundColor: theme.colors.input, marginLeft: 60 }} />
                        <SettingItem
                            icon="Gift"
                            title="My Promos"
                            subtitle="2 Available"
                            color="#f97316"
                            onPress={() => handleFeatureClick("Promos")}
                        />
                    </View>
                </View>

                {/* App Preferences */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginLeft: 20, marginBottom: 12, letterSpacing: 1 }}>
                        PREFERENCES
                    </Text>
                    <View style={{ backgroundColor: theme.colors.surface, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem
                            icon="Bell"
                            title="Notifications"
                            showChevron={false}
                            color="#22c55e"
                            rightElement={
                                <Switch
                                    trackColor={{ false: theme.colors.input, true: theme.colors.primary + '50' }}
                                    thumbColor={notificationsEnabled ? theme.colors.primary : "#f4f3f4"}
                                    onValueChange={setNotificationsEnabled}
                                    value={notificationsEnabled}
                                />
                            }
                        />
                        <View style={{ height: 1, backgroundColor: theme.colors.input, marginLeft: 60 }} />
                        <SettingItem
                            icon="Moon"
                            title="Dark Mode"
                            showChevron={false}
                            color={theme.colors.text}
                            rightElement={
                                <Switch
                                    trackColor={{ false: theme.colors.input, true: theme.colors.primary + '50' }}
                                    thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
                                    onValueChange={toggleTheme}
                                    value={isDark}
                                />
                            }
                        />
                        <View style={{ height: 1, backgroundColor: theme.colors.input, marginLeft: 60 }} />
                        <SettingItem
                            icon="Globe"
                            title="Language"
                            subtitle="English (US)"
                            color="#0ea5e9"
                            onPress={() => handleFeatureClick("Language")}
                        />
                    </View>
                </View>

                {/* Dietary Profile */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginLeft: 20, marginBottom: 12, letterSpacing: 1 }}>
                        DIETARY
                    </Text>
                    <View style={{ backgroundColor: theme.colors.surface, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' }}>
                        <SettingItem
                            icon="User"
                            title="Dietary Preferences"
                            subtitle="Vegetarian, No Nuts"
                            color="#10b981"
                            onPress={() => handleFeatureClick("Dietary")}
                        />
                        <View style={{ height: 1, backgroundColor: theme.colors.input, marginLeft: 60 }} />
                        <SettingItem
                            icon="AlertCircle"
                            title="Allergies"
                            subtitle="Peanuts, Shellfish"
                            color="#ef4444"
                            onPress={() => handleFeatureClick("Allergies")}
                        />
                    </View>
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={{
                        marginHorizontal: 16,
                        marginBottom: 32,
                        backgroundColor: isDark ? '#7f1d1d' : '#fee2e2',
                        padding: 16,
                        borderRadius: 16,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: '#ef4444', fontWeight: '700', fontSize: 16 }}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Besh Delivery App v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Reusable Setting Item Component
interface SettingItemProps {
    icon: keyof typeof Icon;
    title: string;
    subtitle?: string;
    color: string;
    showChevron?: boolean;
    rightElement?: React.ReactNode;
    onPress?: () => void;
}

const SettingItem = ({
    icon,
    title,
    subtitle,
    color,
    showChevron = true,
    rightElement,
    onPress
}: SettingItemProps) => {
    const IconComponent = Icon[icon] as any;
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress && !rightElement}
            activeOpacity={0.7}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                backgroundColor: theme.colors.surface
            }}
        >
            <View style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: `${color}15`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14
            }}>
                <IconComponent width={20} height={20} color={color} strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: theme.colors.text }}>{title}</Text>
                {subtitle && (
                    <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginTop: 2 }}>{subtitle}</Text>
                )}
            </View>

            {rightElement}

            {showChevron && !rightElement && (
                <Icon.ChevronRight width={20} height={20} color={theme.colors.border} />
            )}
        </TouchableOpacity>
    );
};
