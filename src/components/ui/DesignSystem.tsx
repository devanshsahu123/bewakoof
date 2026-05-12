/**
 * Premium Design System Constants & Animation Variants
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: "#111111",
    secondary: "#F5F1EB",
    accent: "#C8A97E",
    text: "#222222",
    background: "#FFFFFF",
  },
  transitions: {
    smooth: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
    slow: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    fast: { duration: 0.3, ease: "easeInOut" },
  }
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: DESIGN_TOKENS.transitions.slow,
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  hoverScale: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  reveal: {
    initial: { clipPath: "inset(100% 0% 0% 0%)" },
    animate: { clipPath: "inset(0% 0% 0% 0%)" },
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  }
};
