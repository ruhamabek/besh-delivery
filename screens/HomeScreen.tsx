import Categories from '@/components/categories'
import FeaturedRow from '@/components/featuredRow'
import PromoBanner from '@/components/PromoBanner'
import QuickActions from '@/components/QuickActions'
import { featuredHotSpicy, featuredQuickBites, featuredTopRated } from '@/constants'
import { themeColors } from '@/theme'
import { ScrollView, StatusBar, Text, TextInput, View } from 'react-native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomeScreen = () => {
    const featuredSections = [featuredHotSpicy, featuredQuickBites, featuredTopRated];

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar />

            {/* Header with Greeting */}
            <View className='px-4 pt-2 pb-3'>
                <View className='flex-row justify-between items-center'>
                    <View>
                        <Text className='text-gray-500 text-sm'>Good morning 👋</Text>
                        <Text className='text-2xl font-bold text-gray-900 mt-1'>John Doe</Text>
                    </View>
                    <View
                        style={{ backgroundColor: themeColors.bgColor(0.1) }}
                        className='w-12 h-12 rounded-full items-center justify-center'
                    >
                        <Icon.Bell width={22} height={22} color={themeColors.bgColor(1)} />
                        {/* Notification badge */}
                        <View className='absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>3</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Search Bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2'>
                <View className='flex-row flex-1 items-center p-3 rounded-2xl bg-gray-100'>
                    <Icon.Search width={22} height={22} color="gray" />
                    <TextInput placeholder='Search restaurants, dishes...' className='flex-1 ml-3 text-gray-700' placeholderTextColor="#9ca3af" />
                </View>

                <View style={{ backgroundColor: themeColors.bgColor(1) }} className='p-3 rounded-2xl'>
                    <Icon.Sliders width={22} height={22} strokeWidth={2.5} color="white" />
                </View>
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Promo Banner Carousel */}
                <PromoBanner />

                {/* Quick Actions */}
                <QuickActions />

                {/* Categories */}
                <View className='mt-4'>
                    <View className='flex-row justify-between items-center px-4 mb-2'>
                        <Text className='font-bold text-lg text-gray-900'>Categories</Text>
                        <Text style={{ color: themeColors.bgColor(1) }} className='font-semibold text-sm'>See All</Text>
                    </View>
                    <Categories />
                </View>

                {/* Featured Sections */}
                <View className='mt-5'>
                    {
                        featuredSections.map((item) => {
                            return (
                                <FeaturedRow
                                    key={item.id}
                                    title={item.title}
                                    restaurants={item.restaurants}
                                    description={item.description}
                                />
                            )
                        })
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
