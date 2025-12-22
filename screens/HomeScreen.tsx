import Categories from '@/components/categories'
import FeaturedRow from '@/components/featuredRow'
import { featured } from '@/constants'
import { themeColors } from '@/theme'
import { ScrollView, StatusBar, Text, TextInput, View } from 'react-native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomeScreen = () => {
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar  />

            {/* Search Bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2 mt-2'>
                <View className='flex-row flex-1 items-center p-3 rounded-full border border-gray-300'>
                    <Icon.Search width={25} height={25} color="gray" />
                    <TextInput placeholder='Restaurants' className='flex-1 ml-2 text-gray-700' />

                    <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-3 border-l-gray-300'>
                        <Icon.MapPin width={20} height={20} color="gray" />
                        <Text className='text-gray-600 ml-3' >Dire Dawa, ET</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: themeColors.bgColor(1) }} className='p-3 rounded-full'>
                    <Icon.Sliders width={20} height={20} strokeWidth={2.5} color="white" />
                </View>
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Categories */}
                <Categories />

                {/* Featured Section */}
                <View className='mt-5'>
                    {
                        [featured, featured, featured].map((item, index) => {
                            return (
                                <FeaturedRow
                                    key={index}
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
