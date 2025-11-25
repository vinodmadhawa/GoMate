// Gradient definitions for LinearGradient component
export const gradients = {
  // Primary gradient: Emerald to Ocean Blue (135deg)
  primary: {
    colors: ['#34D399', '#0EA5E9'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Sunset gradient: Orange to Yellow (135deg)
  sunset: {
    colors: ['#F97316', '#FACC15'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Hero gradient: Primary with transparency (180deg, vertical)
  hero: {
    colors: ['rgba(52, 211, 153, 0.1)', 'transparent'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  // Image overlay gradient: Black transparency (bottom to top)
  imageOverlay: {
    colors: ['rgba(0, 0, 0, 0.6)', 'transparent'],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
  },
};

export type GradientConfig = {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
};
