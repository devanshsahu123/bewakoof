/* ========================================
   App-wide Constants
   ======================================== */

export const APP_NAME = "Bewakoof";
export const APP_TAGLINE = "Fashion that's boldly you.";

/* ---- Routes ---- */
export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    SHOP: "/shop",
    CART: "/cart",
    ACCOUNT: "/account",
    ADMIN: {
        ROOT: "/admin",
        LOGIN: "/admin/login",
        DASHBOARD: "/admin/dashboard",
        ORDERS: "/admin/orders",
        PRODUCTS: "/admin/products",
        USERS: "/admin/users",
        SETTINGS: "/admin/settings",
    },
} as const;

/* ---- Local-storage Keys ---- */
export const STORAGE_KEYS = {
    AUTH_TOKEN: "web_token",
    CART: "bewakoof_cart",
    THEME: "web_theme",
} as const;

/* ---- Pagination ---- */
export const DEFAULT_PAGE_SIZE = 20;

/* ---- Categories ---- */
export const CATEGORIES = ["Men", "Women", "Kids", "Accessories"] as const;
export type Category = (typeof CATEGORIES)[number];
