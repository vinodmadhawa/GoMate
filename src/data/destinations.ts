import { Destination } from '../types';

// Use require for images to work on both web and native
// TypeScript will complain but it works at runtime
export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    location: 'Dambulla, Central Province',
    image: require('../../assets/sigiriya.jpg'),
    rating: 4.9,
    category: 'Cultural',
    description: 'Ancient rock fortress and palace ruins with stunning frescoes',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 500-1500', duration: '4.5 hours', schedule: 'Daily: 6:00 AM, 10:30 AM, 2:00 PM', frequency: '3 trains daily' },
      { type: 'bus', from: 'Colombo', price: 'LKR 400-800', duration: '5 hours', frequency: 'Every 30 minutes', availability: 'Regular service' },
      { type: 'taxi', from: 'Colombo', price: 'LKR 12,000-15,000', duration: '3.5 hours', availability: 'Available 24/7' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'December to April',
    fullDescription: 'Ancient rock fortress and palace ruins, a UNESCO World Heritage Site with stunning frescoes and views.',
    highlights: ['Ancient frescoes', 'Mirror wall', '5th-century fortress', 'Water gardens'],
  },
  {
    id: '2',
    name: 'Ella',
    location: 'Badulla District, Uva Province',
    image: require('../../assets/ella.jpg'),
    rating: 4.9,
    category: 'Nature',
    description: 'Scenic hiking trail with breathtaking mountain views',
    transport: [
      { type: 'train', from: 'Kandy', price: 'LKR 600-1200', duration: '6 hours', schedule: 'Daily: 8:55 AM, 11:10 AM', frequency: '2 trains daily' },
      { type: 'bus', from: 'Nuwara Eliya', price: 'LKR 200-400', duration: '3 hours', frequency: 'Every hour', availability: 'Regular service' },
      { type: 'taxi', from: 'Ella Town', price: 'LKR 500-1000', duration: '15 mins', availability: 'Available 24/7' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'January to March',
    fullDescription: 'Scenic hiking destination offering panoramic views of the surrounding valleys and mountains.',
    highlights: ['Ella Rock hike', 'Nine Arch Bridge', 'Little Adam\'s Peak', 'Tea plantations'],
  },
  {
    id: '3',
    name: 'Galle Fort',
    location: 'Galle, Southern Province',
    image: require('../../assets/galle.jpg'),
    rating: 4.8,
    category: 'Historical',
    description: 'Historic fort and UNESCO World Heritage Site',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 300-800', duration: '3 hours', schedule: 'Daily: 7:00 AM, 9:35 AM, 3:30 PM', frequency: '4 trains daily' },
      { type: 'bus', from: 'Colombo', price: 'LKR 250-500', duration: '2.5 hours', frequency: 'Every 20 minutes', availability: 'Regular service' },
      { type: 'taxi', from: 'Colombo', price: 'LKR 8,000-10,000', duration: '2 hours', availability: 'Available 24/7' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'November to April',
    fullDescription: 'Historic fort and UNESCO World Heritage Site with colonial architecture and ocean views.',
    highlights: ['Dutch architecture', 'Lighthouse', 'Fort walls', 'Maritime museum'],
  },
  {
    id: '4',
    name: 'Yala National Park',
    location: 'Southern Province',
    image: require('../../assets/yala.jpg'),
    rating: 4.8,
    category: 'Nature',
    description: 'Wildlife safari destination with leopards and elephants',
    transport: [
      { type: 'bus', from: 'Colombo', price: 'LKR 800-1500', duration: '6 hours', frequency: 'Every 2 hours', availability: 'Regular service' },
      { type: 'taxi', from: 'Tissamaharama', price: 'LKR 2,000-3,000', duration: '30 mins', availability: 'Available 24/7' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'February to July',
    fullDescription: 'Wildlife safari destination, home to one of the highest densities of leopards in the world.',
    highlights: ['Leopard spotting', 'Elephant herds', 'Diverse wildlife', 'Scenic landscapes'],
  },
  {
    id: '5',
    name: 'Mirissa Beach',
    location: 'Matara District, Southern Province',
    image: require('../../assets/mirissa.jpg'),
    rating: 4.7,
    category: 'Beach',
    description: 'Beautiful beach perfect for whale watching',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 350-900', duration: '3.5 hours', schedule: 'Daily: 7:00 AM, 9:35 AM, 3:30 PM', frequency: '4 trains daily' },
      { type: 'bus', from: 'Galle', price: 'LKR 100-200', duration: '1 hour', frequency: 'Every 15 minutes', availability: 'Regular service' },
      { type: 'taxi', from: 'Matara', price: 'LKR 1,500-2,000', duration: '30 mins', availability: 'Available 24/7' },
    ],
    status: 'Trending',
    bestTimeToVisit: 'November to April',
    fullDescription: 'Beautiful beach town perfect for whale watching, surfing, and relaxation.',
    highlights: ['Whale watching', 'Blue whales', 'Beach activities', 'Sunset views'],
  },
  {
    id: '6',
    name: 'Temple of the Tooth',
    location: 'Kandy, Central Province',
    image: require('../../assets/temple-tooth.jpg'),
    rating: 4.9,
    category: 'Cultural',
    description: 'Sacred Buddhist temple housing relic of Buddha',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 250-750', duration: '3 hours', schedule: 'Daily: 5:55 AM, 7:00 AM, 10:00 AM', frequency: '6 trains daily' },
      { type: 'bus', from: 'Colombo', price: 'LKR 200-400', duration: '3.5 hours', frequency: 'Every 15 minutes', availability: 'Regular service' },
      { type: 'taxi', from: 'Kandy City', price: 'LKR 300-500', duration: '10 mins', availability: 'Available 24/7' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'Year-round, August for Perahera festival',
    fullDescription: 'Sacred Buddhist temple housing the relic of the tooth of Buddha, a UNESCO World Heritage Site.',
    highlights: ['Sacred tooth relic', 'Kandy Perahera', 'Buddhist rituals', 'Historic architecture'],
  },
  {
    id: '7',
    name: "Adam's Peak",
    location: 'Central Highlands',
    image: require('../../assets/adams-peak.jpg'),
    rating: 4.8,
    category: 'Adventure',
    description: 'Sacred mountain with challenging pilgrimage climb',
    transport: [
      { type: 'bus', from: 'Colombo', price: 'LKR 400-800', duration: '4 hours', frequency: 'Every 30 minutes', availability: 'Regular service' },
      { type: 'taxi', from: 'Hatton', price: 'LKR 2,000-3,000', duration: '1 hour', availability: 'Available 24/7' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'December to May (pilgrimage season)',
    fullDescription: 'Sacred mountain with a challenging climb to see the sunrise and the famous footprint.',
    highlights: ['Sunrise views', 'Sacred footprint', 'Pilgrimage trail', 'Mountain scenery'],
  },
  {
    id: '8',
    name: 'Nuwara Eliya',
    location: 'Central Province',
    image: require('../../assets/nuwara-eliya.jpg'),
    rating: 4.7,
    category: 'Nature',
    description: 'Hill country town with tea plantations and cool climate',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 600-1500', duration: '7 hours', schedule: 'Daily: 8:55 AM, 10:00 AM', frequency: '3 trains daily' },
      { type: 'bus', from: 'Kandy', price: 'LKR 200-400', duration: '3 hours', frequency: 'Every hour', availability: 'Regular service' },
      { type: 'taxi', from: 'Kandy', price: 'LKR 6,000-8,000', duration: '2.5 hours', availability: 'Available 24/7' },
    ],
    status: 'Trending',
    bestTimeToVisit: 'March to May, August to September',
    fullDescription: 'Hill country town known for tea plantations, cool climate, and colonial architecture.',
    highlights: ['Tea plantations', 'Gregory Lake', 'Cool climate', 'Victoria Park'],
  },
];

// Helper functions
export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((dest) => dest.id === id);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  if (category === 'all') return destinations;
  return destinations.filter((dest) => dest.category === category);
};

export const searchDestinations = (query: string): Destination[] => {
  const lowerQuery = query.toLowerCase();
  return destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(lowerQuery) ||
      dest.location.toLowerCase().includes(lowerQuery) ||
      dest.description.toLowerCase().includes(lowerQuery)
  );
};
