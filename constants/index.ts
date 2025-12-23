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

// Featured section 1: Hot and Spicy
export const featuredHotSpicy = {
    id: 1,
    title: 'Hot and Spicy 🔥',
    description: 'Craving something with a kick? Try these favorites!',
    restaurants: [
        {
            id: 1,
            name: "Habesha Kitchen",
            image: require("../assets/restaurants/n7yx-hero (1).jpg"),
            description: 'Authentic Ethiopian cuisine with traditional spices',
            lng: 38.7578,
            lat: 9.0054,
            address: 'Bole Road, Addis Ababa',
            stars: 4.8,
            reviews: 234,
            category: 'Ethiopian',
            deliveryTime: '25-35 min',
            deliveryFee: 0,
            minOrder: 15,
            dishes: [
                {
                    id: 1,
                    name: 'Doro Wot',
                    description: "Spicy chicken stew with berbere sauce",
                    price: 18,
                    image: require("../assets/dishes/download (1) (1).jpeg")
                },
                {
                    id: 2,
                    name: 'Kitfo',
                    description: "Ethiopian beef tartare with mitmita",
                    price: 22,
                    image: require("../assets/dishes/download (2) (1).jpeg")
                },
                {
                    id: 3,
                    name: 'Tibs',
                    description: "Sautéed beef with peppers and onions",
                    price: 16,
                    image: require("../assets/dishes/download (3) (1).jpeg")
                },
                {
                    id: 4,
                    name: 'Injera Combo',
                    description: "Assorted dishes served on injera bread",
                    price: 25,
                    image: require("../assets/dishes/download (4) (1).jpeg")
                }
            ]
        },
        {
            id: 2,
            name: "Burger Palace",
            image: require("../assets/restaurants/disadvantages-of-fast-food (1).webp"),
            description: 'Gourmet burgers grilled to perfection',
            lng: 38.7612,
            lat: 9.0123,
            address: 'Kazanchis, Addis Ababa',
            stars: 4.5,
            reviews: 512,
            category: 'Fast Food',
            deliveryTime: '15-25 min',
            deliveryFee: 0,
            minOrder: 10,
            dishes: [
                {
                    id: 5,
                    name: 'Classic Smash Burger',
                    description: "Double patty with cheese and special sauce",
                    price: 14,
                    image: require("../assets/dishes/download (5) (1).jpeg")
                },
                {
                    id: 6,
                    name: 'Spicy Jalapeño Burger',
                    description: "Loaded with jalapeños and pepper jack",
                    price: 16,
                    image: require("../assets/dishes/download (6) (1).jpeg")
                },
                {
                    id: 7,
                    name: 'BBQ Bacon Burger',
                    description: "Smoky BBQ sauce with crispy bacon",
                    price: 17,
                    image: require("../assets/dishes/Pizza.jpeg")
                }
            ]
        },
    ],
}

// Featured section 2: Quick Bites
export const featuredQuickBites = {
    id: 2,
    title: 'Quick Bites ⚡',
    description: 'Fast delivery under 20 minutes!',
    restaurants: [
        {
            id: 3,
            name: "Golden Dragon",
            image: require("../assets/restaurants/bdcd233971b7c81bf77e1fa4471280eb (1).webp"),
            description: 'Authentic Chinese flavors from the Far East',
            lng: 38.7534,
            lat: 9.0089,
            address: 'Meskel Square, Addis Ababa',
            stars: 4.6,
            reviews: 389,
            category: 'Chinese',
            deliveryTime: '15-20 min',
            deliveryFee: 0,
            minOrder: 12,
            dishes: [
                {
                    id: 8,
                    name: 'Kung Pao Chicken',
                    description: "Spicy stir-fry with peanuts and vegetables",
                    price: 15,
                    image: require("../assets/dishes/download (2) (2).jpeg")
                },
                {
                    id: 9,
                    name: 'Sweet & Sour Pork',
                    description: "Crispy pork in tangy pineapple sauce",
                    price: 16,
                    image: require("../assets/dishes/download (2) (3).jpeg")
                },
                {
                    id: 10,
                    name: 'Fried Rice Special',
                    description: "Wok-fried rice with shrimp and vegetables",
                    price: 12,
                    image: require("../assets/dishes/download (3) (2).jpeg")
                },
                {
                    id: 11,
                    name: 'Spring Rolls',
                    description: "Crispy vegetable spring rolls (6 pcs)",
                    price: 8,
                    image: require("../assets/dishes/download (3) (3).jpeg")
                }
            ]
        },
        {
            id: 5,
            name: "Quick Bites Cafe",
            image: require("../assets/restaurants/download (7).jpeg"),
            description: 'Coffee, snacks, and light meals',
            lng: 38.7601,
            lat: 9.0045,
            address: 'Sarbet, Addis Ababa',
            stars: 4.3,
            reviews: 156,
            category: 'Cafe',
            deliveryTime: '10-15 min',
            deliveryFee: 0,
            minOrder: 8,
            dishes: [
                {
                    id: 15,
                    name: 'Club Sandwich',
                    description: "Triple-decker with turkey, bacon, and avocado",
                    price: 12,
                    image: require("../assets/dishes/download (8).jpeg")
                },
                {
                    id: 16,
                    name: 'Caesar Salad',
                    description: "Crisp romaine with parmesan and croutons",
                    price: 10,
                    image: require("../assets/dishes/download (9).jpeg")
                },
                {
                    id: 17,
                    name: 'Cappuccino',
                    description: "Rich espresso with steamed milk foam",
                    price: 5,
                    image: require("../assets/dishes/images (1) (1).jpeg")
                }
            ]
        },
    ],
}

// Featured section 3: Top Rated
export const featuredTopRated = {
    id: 3,
    title: 'Top Rated ⭐',
    description: 'Highest rated restaurants in your area',
    restaurants: [
        {
            id: 4,
            name: "Pasta Paradise",
            image: require("../assets/restaurants/rawImage (1).jpg"),
            description: 'Fresh handmade pasta daily',
            lng: 38.7556,
            lat: 9.0112,
            address: 'Piassa, Addis Ababa',
            stars: 4.9,
            reviews: 678,
            category: 'Italian',
            deliveryTime: '30-40 min',
            deliveryFee: 0,
            minOrder: 20,
            dishes: [
                {
                    id: 12,
                    name: 'Spaghetti Carbonara',
                    description: "Creamy egg sauce with pancetta and parmesan",
                    price: 18,
                    image: require("../assets/dishes/images (3).jpeg")
                },
                {
                    id: 13,
                    name: 'Margherita Pizza',
                    description: "Fresh mozzarella, tomato, and basil",
                    price: 16,
                    image: require("../assets/dishes/Pizza.jpeg")
                },
                {
                    id: 14,
                    name: 'Lasagna Bolognese',
                    description: "Layers of pasta, meat sauce, and béchamel",
                    price: 20,
                    image: require("../assets/dishes/download (1) (1).jpeg")
                }
            ]
        },
        {
            id: 1,
            name: "Habesha Kitchen",
            image: require("../assets/restaurants/n7yx-hero (1).jpg"),
            description: 'Authentic Ethiopian cuisine with traditional spices',
            lng: 38.7578,
            lat: 9.0054,
            address: 'Bole Road, Addis Ababa',
            stars: 4.8,
            reviews: 234,
            category: 'Ethiopian',
            deliveryTime: '25-35 min',
            deliveryFee: 0,
            minOrder: 15,
            dishes: [
                {
                    id: 1,
                    name: 'Doro Wot',
                    description: "Spicy chicken stew with berbere sauce",
                    price: 18,
                    image: require("../assets/dishes/download (1) (1).jpeg")
                },
                {
                    id: 2,
                    name: 'Kitfo',
                    description: "Ethiopian beef tartare with mitmita",
                    price: 22,
                    image: require("../assets/dishes/download (2) (1).jpeg")
                },
            ]
        },
    ],
}

// Legacy export for backward compatibility
export const featured = featuredHotSpicy;

// All restaurants combined for search
export const allRestaurants = [
    ...featuredHotSpicy.restaurants,
    ...featuredQuickBites.restaurants,
    ...featuredTopRated.restaurants.filter(r => r.id === 4), // Pasta Paradise only (avoid duplicates)
];