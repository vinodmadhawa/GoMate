import { Destination } from '../types';

// Mock destinations data - 8 destinations as specified
// Note: Images would typically use require() for local assets
// For now using placeholder URLs that can be replaced with actual images

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    location: 'Dambulla, Central Province',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', // Sri Lankan landmark
    rating: 4.8,
    category: 'Cultural',
    description: 'Ancient rock fortress and palace ruins with stunning frescoes',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 500', duration: '4 hours' },
      { type: 'bus', from: 'Kandy', price: 'LKR 200', duration: '2 hours' },
      { type: 'taxi', from: 'Dambulla', price: 'LKR 1500', duration: '30 mins' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'December to April',
    fullDescription: 'Sigiriya is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres high.',
  },
  {
    id: '2',
    name: 'Ella Rock',
    location: 'Ella, Badulla District',
    image: 'https://images.unsplash.com/photo-1564048041669-12e5c97fbaa3?w=800',
    rating: 4.7,
    category: 'Nature',
    description: 'Scenic hiking trail with breathtaking mountain views',
    transport: [
      { type: 'train', from: 'Kandy', price: 'LKR 300', duration: '6 hours' },
      { type: 'bus', from: 'Nuwara Eliya', price: 'LKR 150', duration: '3 hours' },
      { type: 'tuk-tuk', from: 'Ella Town', price: 'LKR 500', duration: '15 mins' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'January to March',
    fullDescription: 'Ella Rock is a popular hiking destination in Sri Lanka, offering panoramic views of the surrounding valleys and mountains. The trek takes approximately 2-3 hours and is suitable for moderately fit hikers.',
  },
  {
    id: '3',
    name: 'Galle Fort',
    location: 'Galle, Southern Province',
    image: 'https://images.unsplash.com/photo-1552055568-a7ef597f3ab1?w=800',
    rating: 4.6,
    category: 'Historical',
    description: 'Historic fort and UNESCO World Heritage Site',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 400', duration: '3 hours' },
      { type: 'bus', from: 'Colombo', price: 'LKR 250', duration: '2.5 hours' },
      { type: 'taxi', from: 'Colombo', price: 'LKR 8000', duration: '2 hours' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'November to April',
    fullDescription: 'Galle Fort is a historical, archaeological and architectural heritage monument, which even after more than 432 years maintains a polished appearance, due to extensive reconstruction work done by Archaeological Department of Sri Lanka.',
  },
  {
    id: '4',
    name: 'Yala National Park',
    location: 'Hambantota & Monaragala Districts',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    rating: 4.9,
    category: 'Nature',
    description: 'Wildlife safari destination with leopards and elephants',
    transport: [
      { type: 'bus', from: 'Colombo', price: 'LKR 600', duration: '6 hours' },
      { type: 'taxi', from: 'Tissamaharama', price: 'LKR 2000', duration: '30 mins' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'February to July',
    fullDescription: 'Yala National Park is the most visited and second largest national park in Sri Lanka, bordering the Indian Ocean. The park consists of five blocks, two of which are now open to the public.',
  },
  {
    id: '5',
    name: 'Mirissa Beach',
    location: 'Mirissa, Southern Province',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    rating: 4.5,
    category: 'Beach',
    description: 'Beautiful beach perfect for whale watching',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 450', duration: '3.5 hours' },
      { type: 'bus', from: 'Galle', price: 'LKR 100', duration: '1 hour' },
      { type: 'taxi', from: 'Matara', price: 'LKR 1500', duration: '30 mins' },
    ],
    status: 'Trending',
    bestTimeToVisit: 'November to April',
    fullDescription: 'Mirissa is a small town on the south coast of Sri Lanka, located in the Matara District of the Southern Province. It is approximately 150 km south of Colombo and is situated at an elevation of 4 metres above sea level.',
  },
  {
    id: '6',
    name: 'Temple of the Tooth',
    location: 'Kandy, Central Province',
    image: 'https://images.unsplash.com/photo-1580909367332-cf6ca6cd9b45?w=800',
    rating: 4.8,
    category: 'Cultural',
    description: 'Sacred Buddhist temple housing relic of Buddha',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 300', duration: '3 hours' },
      { type: 'bus', from: 'Colombo', price: 'LKR 200', duration: '3.5 hours' },
      { type: 'tuk-tuk', from: 'Kandy City', price: 'LKR 300', duration: '10 mins' },
    ],
    status: 'Must Visit',
    bestTimeToVisit: 'Year-round, August for Perahera festival',
    fullDescription: 'The Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha.',
  },
  {
    id: '7',
    name: "Adam's Peak",
    location: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=800',
    rating: 4.7,
    category: 'Adventure',
    description: 'Sacred mountain with challenging pilgrimage climb',
    transport: [
      { type: 'bus', from: 'Colombo', price: 'LKR 400', duration: '4 hours' },
      { type: 'taxi', from: 'Hatton', price: 'LKR 2000', duration: '1 hour' },
    ],
    status: 'Popular',
    bestTimeToVisit: 'December to May (pilgrimage season)',
    fullDescription: "Adam's Peak is a 2,243 m tall conical sacred mountain located in central Sri Lanka. It is well known for the Sri Pada, a rock formation near the summit, whose name is also used for the mountain itself.",
  },
  {
    id: '8',
    name: 'Nuwara Eliya',
    location: 'Central Province',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800',
    rating: 4.6,
    category: 'Nature',
    description: 'Hill country town with tea plantations and cool climate',
    transport: [
      { type: 'train', from: 'Colombo', price: 'LKR 350', duration: '7 hours' },
      { type: 'bus', from: 'Kandy', price: 'LKR 200', duration: '3 hours' },
      { type: 'taxi', from: 'Kandy', price: 'LKR 6000', duration: '2.5 hours' },
    ],
    status: 'Trending',
    bestTimeToVisit: 'March to May, August to September',
    fullDescription: 'Nuwara Eliya is a city in the tea country hills of central Sri Lanka. The naturally landscaped Hakgala Botanical Gardens displays roses and tree ferns, and shelters monkeys and blue magpies.',
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
