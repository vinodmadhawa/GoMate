export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: any;
  rating: number;
  category: 'Cultural' | 'Nature' | 'Adventure' | 'Beach' | 'Historical';
  description: string;
  transport: Transport[];
  status: 'Popular' | 'Trending' | 'Must Visit';
  bestTimeToVisit: string;
  fullDescription: string;
  highlights?: string[];
}

export interface Transport {
  type: 'train' | 'bus' | 'taxi' | 'tuk-tuk';
  from: string;
  price: string;
  duration: string;
  schedule?: string;
  frequency?: string;
  availability?: string;
}

export type Category = 'all' | 'Cultural' | 'Nature' | 'Adventure' | 'Beach' | 'Historical';
