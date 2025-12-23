import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";

interface QuickActionItem {
    id: number;
    title: string;
    icon: keyof typeof Icon;
    color: string;
    bgColor: string;
}

const quickActions: QuickActionItem[] = [
    {
        id: 1,
        title: 'Offers',
        icon: 'Gift',
        color: '#f97316',
        bgColor: '#fff7ed',
    },
    {
        id: 2,
        title: 'Top Rated',
        icon: 'Star',
        color: '#eab308',
        bgColor: '#fefce8',
    },
    {
        id: 3,
        title: 'Fast',
        icon: 'Zap',
        color: '#22c55e',
        bgColor: '#f0fdf4',
    },
    {
        id: 4,
        title: 'Budget',
        icon: 'DollarSign',
        color: '#3b82f6',
        bgColor: '#eff6ff',
    },
    {
        id: 5,
        title: 'Near You',
        icon: 'MapPin',
        color: '#ec4899',
        bgColor: '#fdf2f8',
    },
];

interface QuickActionsProps {
    onActionPress?: (actionId: number) => void;
}

export default function QuickActions({ onActionPress }: QuickActionsProps) {
    const renderAction = (item: QuickActionItem) => {
        const IconComponent = Icon[item.icon] as any;

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => onActionPress?.(item.id)}
                activeOpacity={0.7}
                style={{
                    alignItems: 'center',
                    marginRight: 16,
                }}
            >
                <View
                    style={{
                        backgroundColor: item.bgColor,
                        borderRadius: 18,
                        padding: 14,
                        marginBottom: 8,
                        shadowColor: item.color,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: `${item.color}20`,
                    }}
                >
                    <IconComponent
                        width={24}
                        height={24}
                        color={item.color}
                        strokeWidth={2.5}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#374151',
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
