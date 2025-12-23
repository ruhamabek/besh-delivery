import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    StatusBar,
    Text,
    View,
} from 'react-native';
import * as Icon from 'react-native-feather';

interface OrderStep {
    id: number;
    title: string;
    subtitle: string;
    icon: keyof typeof Icon;
}

const orderSteps: OrderStep[] = [
    { id: 1, title: 'Order Confirmed', subtitle: 'Your order has been received', icon: 'CheckCircle' },
    { id: 2, title: 'Preparing Food', subtitle: 'Chef is cooking your meal', icon: 'Coffee' },
    { id: 3, title: 'Ready for Pickup', subtitle: 'Rider is on the way to pick up', icon: 'Package' },
    { id: 4, title: 'On the Way', subtitle: 'Your food is coming!', icon: 'Truck' },
];

export default function OrderPreparingScreen() {
    const navigation = useNavigation<any>();
    const [currentStep, setCurrentStep] = useState(1);

    // Animation values
    const spinValue = useRef(new Animated.Value(0)).current;
    const bounceValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const fadeValue = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Spin animation for the circle
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Bounce animation for the delivery icon
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: -15,
                    duration: 500,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.1,
                    duration: 800,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Step through order status
        const stepIntervals = [1000, 2000, 3000, 4000];
        stepIntervals.forEach((delay, index) => {
            setTimeout(() => {
                setCurrentStep(index + 1);
                Animated.timing(progressAnim, {
                    toValue: (index + 1) / orderSteps.length,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }, delay);
        });

        // Navigate to Delivery screen after 5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Delivery');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const renderStep = (step: OrderStep, index: number) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const IconComponent = Icon[step.icon] as any;

        return (
            <View key={step.id} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                {/* Step indicator */}
                <View style={{ alignItems: 'center', marginRight: 12 }}>
                    <View
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: isCompleted || isCurrent ? 'white' : 'rgba(255,255,255,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isCompleted ? (
                            <Icon.Check width={20} height={20} color={themeColors.bgColor(1)} strokeWidth={3} />
                        ) : (
                            <IconComponent
                                width={18}
                                height={18}
                                color={isCurrent ? themeColors.bgColor(1) : 'white'}
                                strokeWidth={2}
                            />
                        )}
                    </View>
                    {index < orderSteps.length - 1 && (
                        <View
                            style={{
                                width: 2,
                                height: 24,
                                backgroundColor: isCompleted ? 'white' : 'rgba(255,255,255,0.2)',
                                marginTop: 4,
                            }}
                        />
                    )}
                </View>

                {/* Step content */}
                <View style={{ flex: 1, paddingTop: 6 }}>
                    <Text
                        style={{
                            color: isCompleted || isCurrent ? 'white' : 'rgba(255,255,255,0.5)',
                            fontSize: 15,
                            fontWeight: isCurrent ? '700' : '600',
                        }}
                    >
                        {step.title}
                    </Text>
                    <Text
                        style={{
                            color: isCompleted || isCurrent ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                            fontSize: 12,
                            marginTop: 2,
                        }}
                    >
                        {step.subtitle}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="flex-1"
        >
            <StatusBar barStyle="light-content" />

            <Animated.View style={{ opacity: fadeValue, flex: 1, paddingTop: 60 }}>
                {/* Animated spinning ring */}
                <View className="items-center justify-center mb-8">
                    <Animated.View
                        style={{
                            transform: [{ rotate: spin }],
                            width: 140,
                            height: 140,
                            borderRadius: 70,
                            borderWidth: 4,
                            borderColor: 'rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            position: 'absolute',
                        }}
                    />

                    {/* Bouncing delivery icon container */}
                    <Animated.View
                        style={{
                            transform: [
                                { translateY: bounceValue },
                                { scale: scaleValue },
                            ],
                        }}
                        className="w-32 h-32 rounded-full bg-white/20 items-center justify-center"
                    >
                        <Icon.Truck width={56} height={56} stroke="white" strokeWidth={1.5} />
                    </Animated.View>
                </View>

                {/* Text content */}
                <View className="items-center mt-4 mb-8">
                    <Text className="text-white text-2xl font-bold mb-2">
                        {orderSteps.find(s => s.id === currentStep)?.title || 'Preparing...'}
                    </Text>
                    <Text className="text-white/80 text-base text-center px-8">
                        Your delicious food is being prepared with love! 🍕
                    </Text>
                </View>

                {/* Progress bar */}
                <View style={{ marginHorizontal: 32, marginBottom: 24 }}>
                    <View style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3 }}>
                        <Animated.View
                            style={{
                                width: progressWidth,
                                height: '100%',
                                backgroundColor: 'white',
                                borderRadius: 3,
                            }}
                        />
                    </View>
                </View>

                {/* Order Steps */}
                <View style={{ paddingHorizontal: 32 }}>
                    {orderSteps.map(renderStep)}
                </View>

                {/* Loading dots */}
                <View className="flex-row justify-center mt-6 space-x-2">
                    {[0, 1, 2].map((index) => (
                        <LoadingDot key={index} delay={index * 200} />
                    ))}
                </View>
            </Animated.View>
        </View>
    );
}

// Animated loading dot component
const LoadingDot = ({ delay }: { delay: number }) => {
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(animValue, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(animValue, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, []);

    const scale = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    return (
        <Animated.View
            style={{
                transform: [{ scale }],
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'white',
                marginHorizontal: 4,
            }}
        />
    );
};