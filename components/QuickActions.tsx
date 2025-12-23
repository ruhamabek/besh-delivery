import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

interface QuickActionItem {
    id: string;
    title: string;
    icon: keyof typeof Icon;
    color: string;
    bgColor: string;
}

const quickActions: QuickActionItem[] = [
    {
        id: 'offers',
        title: 'Offers',
        icon: 'Gift',
        color: '#f97316',
        bgColor: '#fff7ed',
    },
    {
        id: 'top-rated',
        title: 'Top Rated',
        icon: 'Star',
        color: '#eab308',
        bgColor: '#fefce8',
    },
    {
        id: 'fast',
        title: 'Fast',
        icon: 'Zap',
        color: '#22c55e',
        bgColor: '#f0fdf4',
    },
    {
        id: 'budget',
        title: 'Budget',
        icon: 'DollarSign',
        color: '#3b82f6',
        bgColor: '#eff6ff',
    },
    {
        id: 'near',
        title: 'Near You',
        icon: 'MapPin',
        color: '#ec4899',
        bgColor: '#fdf2f8',
    },
];

interface QuickActionsProps {
    activeFilter: string | null;
    onActionPress: (actionId: string) => void;
}

export default function QuickActions({ activeFilter, onActionPress }: QuickActionsProps) {
    const renderAction = (item: QuickActionItem) => {
        const IconComponent = Icon[item.icon] as any;
        const isActive = activeFilter === item.id;

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => onActionPress(item.id)}
                activeOpacity={0.7}
                style={{
                    alignItems: 'center',
                    marginRight: 16,
                }}
            >
                <View
                    style={{
                        backgroundColor: isActive ? item.color : item.bgColor,
                        borderRadius: 18,
                        padding: 14,
                        marginBottom: 8,
                        shadowColor: item.color,
                        shadowOffset: { width: 0, height: isActive ? 6 : 4 },
                        shadowOpacity: isActive ? 0.3 : 0.15,
                        shadowRadius: isActive ? 10 : 8,
                        elevation: isActive ? 6 : 3,
                        borderWidth: 2,
                        borderColor: isActive ? item.color : 'transparent',
                        transform: [{ scale: isActive ? 1.05 : 1 }],
                    }}
                >
                    <IconComponent
                        width={24}
                        height={24}
                        color={isActive ? '#fff' : item.color}
                        strokeWidth={2.5}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: isActive ? '700' : '600',
                        color: isActive ? item.color : '#374151',
                    }}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginTop: 20, marginBottom: 8 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {quickActions.map(renderAction)}
            </ScrollView>
        </View>
    );
}
