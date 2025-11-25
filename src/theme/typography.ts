// Typography system
export const typography = {
  // Font Family (System fonts)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    semibold: 'System',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing Scale
export const spacing = {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
};

// Border Radius
export const borderRadius = {
  sm: 12,   // calc(1rem - 4px)
  md: 14,   // calc(1rem - 2px)
  lg: 16,   // 1rem (base --radius)
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  full: 9999,
};
