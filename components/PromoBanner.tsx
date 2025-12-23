import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from "react-native-feather";

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

interface PromoBannerItem {
    id: number;
    title: string;
    subtitle: string;
    discount: string;
    gradient: [string, string];
    icon: keyof typeof Icon;
}

const promoItems: PromoBannerItem[] = [
    {
        id: 1,
        title: 'First Order Special',
        subtitle: 'Get amazing discounts on your first order',
        discount: '50% OFF',
        gradient: ['#f97316', '#ea580c'],
        icon: 'Gift',
    },
    {
        id: 2,
        title: 'Free Delivery',
        subtitle: 'On orders above $15 today only',
        discount: 'FREE',
        gradient: ['#10b981', '#059669'],
        icon: 'Truck',
    },
    {
        id: 3,
        title: 'Weekend Special',
        subtitle: 'Extra savings this weekend',
        discount: '30% OFF',
        gradient: ['#8b5cf6', '#7c3aed'],
        icon: 'Star',
    },
];

export default function PromoBanner() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % promoItems.length;

            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0.8,
                duration: 150,
                useNativeDriver: true,
            }).start(() => {
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * (BANNER_WIDTH + 16),
                    animated: true,
                });
                setActiveIndex(nextIndex);

                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }).start();
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, fadeAnim]);

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (BANNER_WIDTH + 16));
        if (index !== activeIndex && index >= 0 && index < promoItems.length) {
            setActiveIndex(index);
        }
    };

    const renderBanner = (item: PromoBannerItem) => {
        const IconComponent = Icon[item.icon] as any;

        return (
            <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                style={{
                    width: BANNER_WIDTH,
                    marginRight: 16,
                }}
            >
                <View
                    style={{
                        backgroundColor: item.gradient[0],
                        borderRadius: 20,
                        padding: 20,
                        height: 140,
                        overflow: 'hidden',
                        shadowColor: item.gradient[1],
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 12,
                        elevation: 8,
                    }}
                >
                    {/* Background Pattern */}
                    <View
                        style={{
                            position: 'absolute',
                            right: -30,
                            top: -30,
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            right: 20,
                            bottom: -40,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                    />

                    {/* Content */}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.25)',
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    alignSelf: 'flex-start',
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>
                                    {item.discount}
                                </Text>
                            </View>
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18, marginBottom: 4 }}>
                                {item.title}
                            </Text>
                            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 18 }}>
                                {item.subtitle}
                            </Text>
                        </View>

                        <View
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                borderRadius: 16,
                                padding: 12,
                            }}
                        >
                            <IconComponent width={28} height={28} color="#fff" strokeWidth={2} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginTop: 16 }}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    snapToInterval={BANNER_WIDTH + 16}
                    decelerationRate="fast"
                >
                    {promoItems.map(renderBanner)}
                </ScrollView>
            </Animated.View>

            {/* Dot Indicators */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                {promoItems.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: activeIndex === index ? 20 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: activeIndex === index ? '#f97316' : '#e5e7eb',
                            marginHorizontal: 4,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
