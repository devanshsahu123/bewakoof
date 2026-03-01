// Mock product data for homepage sections

export interface Product {
    id: string;
    brand: string;
    name: string;
    price: number;
    mrp: number;
    rating: number;
    ratingCount?: number;
    image: string;
    tag?: string;
    href: string;
}

const DEMO_IMAGE = "https://images.bewakoof.com/uploads/grid/app/Desktop-T-shirt-Widgets-360x400-3--1772133771.jpg";

export const denimProducts: Product[] = [
    {
        id: "denim-1",
        brand: "Bewakoof®",
        name: "Men's Blue Washed Super Baggy Fit Distressed Jeans",
        price: 1499,
        mrp: 3299,
        rating: 4.4,
        ratingCount: 1823,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-blue-baggy-jeans",
    },
    {
        id: "denim-2",
        brand: "Bewakoof®",
        name: "Men's Grey Baggy Fit Washed Cargo Mid-Rise Jeans",
        price: 1499,
        mrp: 4099,
        rating: 4.4,
        ratingCount: 982,
        image: DEMO_IMAGE,
        tag: "BAGGY FIT",
        href: "/product/mens-grey-cargo-jeans",
    },
    {
        id: "denim-3",
        brand: "Bewakoof®",
        name: "Men's Brown Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3399,
        rating: 4.4,
        ratingCount: 1201,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-brown-baggy-jeans",
    },
    {
        id: "denim-4",
        brand: "Bewakoof®",
        name: "Men's Brown Washed Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3499,
        rating: 4.5,
        ratingCount: 2340,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-brown-washed-jeans",
    },
    {
        id: "denim-5",
        brand: "Bewakoof®",
        name: "Men's Beige Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3399,
        rating: 4.5,
        ratingCount: 876,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-beige-baggy-jeans",
    },
    {
        id: "denim-6",
        brand: "Bewakoof®",
        name: "Men's Black Super Baggy Fit Distressed Mid-Rise Jeans",
        price: 1499,
        mrp: 3299,
        rating: 4.3,
        ratingCount: 1455,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-black-distressed-jeans",
    },
    {
        id: "denim-7",
        brand: "Bewakoof®",
        name: "Men's Indigo Super Baggy Fit Washed Mid-Rise Jeans",
        price: 1499,
        mrp: 3499,
        rating: 4.4,
        ratingCount: 743,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-indigo-baggy-jeans",
    },
];
