export interface Activity {
  time: string;
  title: string;
  description: string;
  cost: number;
  type: 'flight' | 'checkin' | 'food' | 'sightseeing' | 'relaxation' | 'entertainment' | 'transport' | 'shopping';
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'museum' | 'beach' | 'park' | 'shopping' | 'pharmacy' | 'hospital' | 'airport' | 'transport' | 'sightseeing';
  lat: number;
  lng: number;
  description: string;
  rating?: number;
  priceLevel?: string;
}

export interface FamousSpot {
  name: string;
  description: string;
  photoQuery: string;
}

export interface Guide {
  history: string;
  famousSpots: FamousSpot[];
  audioGuideIntro: string;
  audioGuideScript: string;
  facts: string[];
  bestTime: string;
  tips: string[];
  safeNeighborhoods: string[];
  dangerousNeighborhoods: string[];
  traditions: string[];
  cuisine: string[];
  mustTryDishes: string[];
  freeThings: string[];
  hiddenGems: string[];
}

export interface Budget {
  flight: number;
  hotel: number;
  food: number;
  transport: number;
  excursions: number;
  entertainment: number;
  shopping: number;
  currencyCode: string;
  conversionRateToUSD: number;
}

export interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  distanceToCenter: string;
  amenities: string[];
  reviews: string[];
  photoQuery: string;
}

export interface Restaurant {
  name: string;
  rating: number;
  cuisine: string;
  averageCheck: string;
  hours: string;
  photoQuery: string;
  description: string;
}

export interface WeatherDay {
  dayName: string;
  temp: number;
  description: string;
  icon: string;
}

export interface Weather {
  current: {
    temp: number;
    description: string;
  };
  forecast: WeatherDay[];
  clothingTips: string;
}

export interface TripPlan {
  id?: string;
  destination: string;
  from: string;
  startDate: string;
  durationDays: number;
  travelersCount: number;
  totalBudget: number;
  guide: Guide;
  mapPoints: MapPoint[];
  itinerary: ItineraryDay[];
  budget: Budget;
  hotels: Hotel[];
  restaurants: Restaurant[];
  weather: Weather;
  createdAt?: string;
}

export interface User {
  email: string;
  name: string;
  isPro: boolean;
}
