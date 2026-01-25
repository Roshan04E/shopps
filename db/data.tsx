import { hashSync } from "bcrypt-ts-edge";

export const products = [
  {
    name: "Fresh Potato",
    slug: "fresh-potato",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg"],
    brand: "Local Farm",
    description:
      "Freshly harvested potatoes sourced directly from local farms.\nNaturally rich in carbohydrates and fiber.\nPerfect for curries, fries, and daily cooking.\nCleaned and carefully sorted for quality.",
    stock: 120,
    price: 25,
    rating: 4.5,
    numReviews: 20,
    isFeatured: true,
    banner: null,
  },
  {
    name: "Fresh Tomato",
    slug: "fresh-tomato",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/196643/pexels-photo-196643.jpeg"],
    brand: "Local Farm",
    description:
      "Bright red tomatoes with a juicy and tangy flavor.\nIdeal for salads, gravies, and sauces.\nRich in vitamins and antioxidants.\nHandpicked to ensure freshness.",
    stock: 140,
    price: 30,
    rating: 4.6,
    numReviews: 28,
    isFeatured: true,
    banner: null,
  },
  {
    name: "Fresh Ginger",
    slug: "fresh-ginger",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/10112135/pexels-photo-10112135.jpeg"],
    brand: "Organic Growers",
    description:
      "Aromatic ginger roots grown using natural methods.\nAdds strong flavor and health benefits to food.\nWidely used in Indian cooking and herbal drinks.\nCarefully packed to retain freshness.",
    stock: 70,
    price: 80,
    rating: 4.4,
    numReviews: 16,
    isFeatured: false,
    banner: null,
  },
  {
    name: "Fresh Garlic",
    slug: "fresh-garlic",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/1638522/pexels-photo-1638522.jpeg"],
    brand: "Organic Growers",
    description:
      "High-quality garlic bulbs with strong aroma.\nEssential ingredient for daily cooking.\nKnown for immunity-boosting properties.\nNaturally dried and stored for longer life.",
    stock: 90,
    price: 90,
    rating: 4.5,
    numReviews: 19,
    isFeatured: false,
    banner: null,
  },
  {
    name: "Green Peas",
    slug: "green-peas",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/20010803/pexels-photo-20010803.jpeg"],
    brand: "Local Farm",
    description:
      "Fresh green peas with natural sweetness.\nRich source of protein and fiber.\nGreat for curries, pulao, and snacks.\nQuickly packed after harvest to lock freshness.",
    stock: 60,
    price: 60,
    rating: 4.3,
    numReviews: 11,
    isFeatured: false,
    banner: null,
  },
  {
    name: "Fresh Beans",
    slug: "fresh-beans",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/4983086/pexels-photo-4983086.jpeg"],
    brand: "Local Farm",
    description:
      "Tender green beans freshly harvested from farms.\nLow in calories and rich in nutrients.\nPerfect for stir-fries and side dishes.\nSorted to ensure uniform size and quality.",
    stock: 65,
    price: 50,
    rating: 4.2,
    numReviews: 10,
    isFeatured: false,
    banner: null,
  },
  {
    name: "Fresh Coriander",
    slug: "fresh-coriander",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/10048317/pexels-photo-10048317.jpeg"],
    brand: "Organic Growers",
    description:
      "Fragrant coriander leaves with vibrant green color.\nEnhances taste and aroma of dishes.\nWidely used as garnish and chutney base.\nWashed and bundled for convenience.",
    stock: 50,
    price: 20,
    rating: 4.7,
    numReviews: 32,
    isFeatured: true,
    banner: null,
  },
  {
    name: "Fresh Spinach",
    slug: "fresh-spinach",
    category: "Vegetables",
    images: ["https://images.pexels.com/photos/8845078/pexels-photo-8845078.jpeg"],
    brand: "Organic Growers",
    description:
      "Nutritious spinach leaves grown organically.\nRich in iron, vitamins, and minerals.\nIdeal for curries, soups, and smoothies.\nCarefully packed to maintain leaf freshness.",
    stock: 55,
    price: 35,
    rating: 4.6,
    numReviews: 24,
    isFeatured: true,
    banner: null,
  },
  {
    name: "The Family Weekend Box",
    slug: "family-box-001",
    category: "Groceries",
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800"],
    brand: "Organic Growers",
    description:
      "Everything you need for a healthy weekend.",
    stock: 1,
    price: 999,
    rating: 4.6,
    numReviews: 24,
    isFeatured: true,
    banner: null,
  }
];


export const users = [
  {
    name: "roshan",
    email: "9696roshankumar@gmail.com",
    password: hashSync("mommo", 10),
    role: "admin",
  },
  {
    name: "daron",
    email: "daron@gmail.com",
    password: hashSync( "daron", 10),
    address: [{
  fullName: "Roshan Kumar",
  streetAddress: "221B MG Road",
  city: "Bengaluru",
  postalCode: "560001",
  country: "India",
  lat: 12.9716,
  lng: 77.5946,
}]

  }
]