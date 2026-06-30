export type ServiceItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  distanceKm: number;
  rating: number;
  availability: number;
  responseMinutes: number;
  tags: string[];
};

export type Recommendation = ServiceItem & {
  aiScore: number;
  reason: string;
};

export type RecommendationResponse = {
  mode: 'simulated' | 'api';
  summary: string;
  recommendations: Recommendation[];
};

export type RecentSearch = {
  query: string;
  createdAt: string;
};
