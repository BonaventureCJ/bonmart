//src/data/mock-products.ts

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: {
    rate: number;
    count: number;
  };
  isEcoFriendly: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "bamboo-backpack-01",
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "Accessories",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 3.9, count: 120 },
    isEcoFriendly: true
  },
  {
    id: 2,
    slug: "slim-fit-eco-tee",
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve.",
    category: "Clothing",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 4.1, count: 259 },
    isEcoFriendly: false
  },
  {
    id: 3,
    slug: "cotton-jacket-windbreaker",
    name: "Mens Cotton Jacket - Sustainable Edition",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter.",
    category: "Clothing",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 4.7, count: 500 },
    isEcoFriendly: true
  },
  {
    id: 4,
    slug: "casual-slim-fit-v2",
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice.",
    category: "Clothing",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 2.1, count: 430 },
    isEcoFriendly: false
  },
  {
    id: 5,
    slug: "john-hardy-bracelet",
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From the Legends Collection, the Naga was inspired by the mythical water dragon.",
    category: "Jewelry",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 4.6, count: 400 },
    isEcoFriendly: false
  },
  {
    id: 6,
    slug: "solid-gold-petite-micropave",
    name: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "Jewelry",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 3.9, count: 70 },
    isEcoFriendly: false
  },
  {
    id: 7,
    slug: "white-gold-plated-princess",
    name: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Resistance Ring.",
    category: "Jewelry",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 3, count: 400 },
    isEcoFriendly: false
  },
  {
    id: 8,
    slug: "pierced-owl-earrings",
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double Flare Tunnel",
    price: 10.99,
    description: "Rose Gold Plated Double Flare Tunnel Plug Earrings. Made of 316L Stainless Steel.",
    category: "Jewelry",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 1.9, count: 100 },
    isEcoFriendly: false
  },
  {
    id: 9,
    slug: "wd-portable-hard-drive",
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers.",
    category: "Electronics",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 3.3, count: 203 },
    isEcoFriendly: true
  },
  {
    id: 10,
    slug: "san-disk-ssd",
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description: "Easy upgrade for faster boot up, shutdown, application load and response.",
    category: "Electronics",
    imageUrl: "https://fakestoreapi.com",
    rating: { rate: 2.9, count: 470 },
    isEcoFriendly: true
  }
];
