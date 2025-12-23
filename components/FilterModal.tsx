import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Icon from 'react-native-feather';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
    initialFilters: FilterState;
}

export interface FilterState {
    priceRange: number[];
    rating: number;
    distance: number;
    dietary: string[];
    sortBy: string;
}

const priceOptions = ['$', '$$', '$$$', '$$$$'];
const ratingOptions = [3, 3.5, 4, 4.5, 5];
const distanceOptions = [1, 3, 5, 10, 15];
const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Dairy-Free'];
const sortOptions = ['Recommended', 'Rating', 'Delivery Time', 'Distance', 'Price'];

export default function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
    const { theme, isDark } = useTheme();
    // We maintain local state for filters inside the modal, only applying on save
    const [filters, setFilters] = React.useState<FilterState>(initialFilters);

    // Update local state when modal opens
    React.useEffect(() => {
        if (visible) {
            setFilters(initialFilters);
        }
    }, [visible, initialFilters]);

    const handleReset = () => {
        setFilters({
            priceRange: [0, 1, 2, 3],
            rating: 0,
            distance: 15,
            dietary: [],
            sortBy: 'Recommended',
        });
    };

    const togglePriceRange = (index: number) => {
        const newRange = filters.priceRange.includes(index)
            ? filters.priceRange.filter(i => i !== index)
            : [...filters.priceRange, index];
        setFilters({ ...filters, priceRange: newRange });
    };

    const toggleDietary = (option: string) => {
        const newDietary = filters.dietary.includes(option)
            ? filters.dietary.filter(d => d !== option)
            : [...filters.dietary, option];
        setFilters({ ...filters, dietary: newDietary });
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.border,
                    }}
                >
                    <TouchableOpacity onPress={onClose}>
                        <Icon.X width={24} height={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text }}>
                        Filters
                    </Text>
                    <TouchableOpacity onPress={handleReset}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: theme.colors.primary }}>
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Sort By */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 16 }}>
                            Sort By
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                            {sortOptions.map((option) => {
                                const isSelected = filters.sortBy === option;
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => setFilters({ ...filters, sortBy: option })}
                                        style={{
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            borderRadius: 24,
                                            backgroundColor: isSelected ? theme.colors.primary : theme.colors.input,
                                            borderWidth: 1,
                                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '600',
                                                color: isSelected ? '#fff' : theme.colors.textSecondary,
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Price Range */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 16 }}>
                            Price Range
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            {priceOptions.map((option, index) => {
                                const isSelected = filters.priceRange.includes(index);
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => togglePriceRange(index)}
                                        style={{
                                            flex: 1,
                                            paddingVertical: 14,
                                            borderRadius: 12,
                                            backgroundColor: isSelected ? theme.colors.primary + '20' : theme.colors.input,
                                            borderWidth: 2,
                                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '700',
                                                color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 16 }}>
                            Minimum Rating
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {ratingOptions.map((option) => {
                                const isSelected = filters.rating === option;
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => setFilters({ ...filters, rating: option })}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: 12,
                                            borderRadius: 12,
                                            backgroundColor: isSelected ? '#fef3c7' : theme.colors.input,
                                            borderWidth: 2,
                                            borderColor: isSelected ? '#f59e0b' : theme.colors.border,
                                        }}
                                    >
                                        <Icon.Star
                                            width={14}
                                            height={14}
                                            fill={isSelected ? '#f59e0b' : theme.colors.textSecondary}
                                            color={isSelected ? '#f59e0b' : theme.colors.textSecondary}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '600',
                                                color: isSelected ? '#92400e' : theme.colors.textSecondary,
                                                marginLeft: 4,
                                            }}
                                        >
                                            {option}+
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Distance */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 16 }}>
                            Maximum Distance
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {distanceOptions.map((option) => {
                                const isSelected = filters.distance === option;
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => setFilters({ ...filters, distance: option })}
                                        style={{
                                            flex: 1,
                                            paddingVertical: 12,
                                            borderRadius: 12,
                                            backgroundColor: isSelected ? theme.colors.primary + '20' : theme.colors.input,
                                            borderWidth: 2,
                                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '600',
                                                color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
                                            }}
                                        >
                                            {option} km
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Dietary Preferences */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 16 }}>
                            Dietary Preferences
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                            {dietaryOptions.map((option) => {
                                const isSelected = filters.dietary.includes(option);
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => toggleDietary(option)}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            borderRadius: 24,
                                            backgroundColor: isSelected ? '#ecfdf5' : theme.colors.input,
                                            borderWidth: 1,
                                            borderColor: isSelected ? '#10b981' : theme.colors.border,
                                        }}
                                    >
                                        {isSelected && (
                                            <Icon.Check width={14} height={14} color="#10b981" strokeWidth={3} style={{ marginRight: 6 }} />
                                        )}
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '600',
                                                color: isSelected ? '#059669' : theme.colors.textSecondary,
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>

                {/* Apply Button */}
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: theme.colors.surface,
                        borderTopWidth: 1,
                        borderTopColor: theme.colors.border,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            onApply(filters);
                            onClose();
                        }}
                        style={{
                            backgroundColor: theme.colors.primary,
                            paddingVertical: 16,
                            borderRadius: 16,
                            alignItems: 'center',
                            shadowColor: theme.colors.primary,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                            Apply Filters
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
