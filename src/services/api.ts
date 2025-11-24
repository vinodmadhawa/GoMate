import { User } from '../types';
import { sriLankanPlaces } from '../data/places';

// Mock API for authentication
export const mockAuthAPI = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6) {
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            username: email.split('@')[0],
            token: 'mock-jwt-token-' + Date.now(),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            username: email.split('@')[0],
            token: 'mock-jwt-token-' + Date.now(),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  },
};

// Mock API for places
export const mockPlacesAPI = {
  getAllPlaces: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sriLankanPlaces);
      }, 800);
    });
  },

  getPlaceById: async (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const place = sriLankanPlaces.find(p => p.id === id);
        if (place) {
          resolve(place);
        } else {
          reject(new Error('Place not found'));
        }
      }, 500);
    });
  },

  searchPlaces: async (query: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = sriLankanPlaces.filter(place =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.description.toLowerCase().includes(query.toLowerCase()) ||
          place.category.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 600);
    });
  },
};
