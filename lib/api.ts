import type { RecommendationResponse, ServiceItem } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function getServices(): Promise<ServiceItem[]> {
  const response = await fetch(`${API_BASE_URL}/assistant/services`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load services');
  const data = await response.json();
  return data.items;
}

export async function getRecommendations(query: string): Promise<RecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/assistant/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Unable to get recommendations');
  }

  return response.json();
}
