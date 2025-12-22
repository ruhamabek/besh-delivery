export const categories = [
    {
        id: 1,
        name: "Pizza",
        image: require("../assets/categories/Pizza.png")
    },
    {
        id: 2,
        name: "Burger",
        image: require("../assets/categories/icons8-hamburger-96.png")
    },
    {
        id: 3,
        name: "Italian",
        image: require("../assets/categories/icons8-spaghetti-96.png")
    },
    {
        id: 4,
        name: "Chinese",
        image: require("../assets/categories/icons8-takeout-box-96.png")
    },
    {
        id: 5,
        name: "Drinks",
        image: require("../assets/categories/icons8-tropical-drink-96.png")
    },
    {
        id: 6,
        name: "Sweets",
        image: require("../assets/categories/icons8-cupcake-emoji-96.png")
    },
    {
        id: 7,
        name: "Fish",
        image: require("../assets/categories/icons8-tropical-fish-96.png")
    },
]

export const featured = {
    id: 1,
    title: 'Hot and Spicy',
    description: 'soft drinks, desserts, and more',
    restaurants: [
        {
            id: 1,
            name: "Papa Johns",
            image: require("../assets/restaurants/n7yx-hero (1).jpg"),
            description: 'Hot and spicy pizzas',
            lng: 38.2145602,
            lat: -85.5324269,
            address: '434 second street',
            stars: 4,
            reviews: "4.4x",
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'Pizza',
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/Pizza.jpeg")
                },
                {
                    id: 2,
                    name: 'Pizza',
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/Pizza.jpeg")
                },
                {
                    id: 3,
                    name: 'Pizza',
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/Pizza.jpeg")
                }
            ]
        },
        {
            id: 1,
            name: "Papa Johns",
            image: require("../assets/restaurants/n7yx-hero (1).jpg"),
            description: 'Hot and spicy pizzas',
            lng: 38.2145602,
            lat: -85.5324269,
            address: '434 second street',
            stars: 4,
            reviews: "4.4x",
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'pizza',
                    description: "cheery garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/Pizza.jpeg")
                }
            ]
        },
        {
            id: 1,
            name: "Papa Johns",
            image: require("../assets/restaurants/n7yx-hero (1).jpg"),
            description: 'Hot and spicy pizzas',
            lng: 38.2145602,
            lat: -85.5324269,
            address: '434 second street',
            stars: 4,
            reviews: "4.4x",
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'pizza',
                    description: "cheery garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/Pizza.jpeg")
                }
            ]
        }
    ],

}