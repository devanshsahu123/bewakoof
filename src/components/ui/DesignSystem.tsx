/**
 * SIYAPAA Luxury Jewelry Design System
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: "#111111",      // Rich Charcoal/Black
    secondary: "#FAF7F2",    // Ivory White
    accent: "#D4AF7F",       // Champagne Gold
    warm: "#E8DCCB",         // Warm Beige
    text: "#222222",
  },
  transitions: {
    smooth: { type: "spring", stiffness: 80, damping: 20, mass: 1 },
    slow: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    luxury: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  }
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: DESIGN_TOKENS.transitions.slow,
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  goldShimmer: {
    initial: { backgroundPosition: "-200% 0" },
    animate: { backgroundPosition: "200% 0" },
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "linear" 
    },
  },
  imageZoom: {
    whileHover: { scale: 1.03 },
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  }
};
