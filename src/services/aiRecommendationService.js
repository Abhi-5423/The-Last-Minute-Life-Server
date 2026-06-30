const services = require('../data/services.json');

const normalize = (value, min, max) => {
  if (max === min) return 1;
  return (value - min) / (max - min);
};

const intentBoost = (query, service) => {
  const text = query.toLowerCase();
  const haystack = [service.name, service.category, service.description, ...service.tags].join(' ').toLowerCase();
  const words = text.split(/\W+/).filter((word) => word.length > 2);
  const tagScore = service.tags.reduce((score, tag) => (text.includes(tag.toLowerCase()) ? score + 0.16 : score), 0);
  const wordScore = words.reduce((score, word) => (haystack.includes(word) ? score + 0.05 : score), 0);
  return tagScore + wordScore;
};

const scoreServices = (query) => {
  const prices = services.map((service) => service.price);
  const distances = services.map((service) => service.distanceKm);

  return services
    .map((service) => {
      // Lower price and distance are better, while rating and availability are better when higher.
      const priceScore = 1 - normalize(service.price, Math.min(...prices), Math.max(...prices));
      const distanceScore = 1 - normalize(service.distanceKm, Math.min(...distances), Math.max(...distances));
      const ratingScore = service.rating / 5;
      const availabilityScore = service.availability;
      const aiScore = Math.round(
        Math.min(
          100,
          (priceScore * 0.22 + distanceScore * 0.25 + ratingScore * 0.24 + availabilityScore * 0.29 + intentBoost(query, service)) *
            100
        )
      );

      return {
        ...service,
        aiScore,
        reason: `${service.name} balances ${service.distanceKm} km distance, ${service.rating}/5 rating, and ${Math.round(
          service.availability * 100
        )}% availability for this request.`
      };
    })
    .sort((a, b) => b.aiScore - a.aiScore);
};

const getAIRecommendation = async (query) => {
  if (!process.env.AI_API_KEY) {
    return {
      mode: 'simulated',
      summary: 'Simulated AI compared urgency, cost, distance, rating, and current availability to rank the best options.',
      recommendations: scoreServices(query)
    };
  }

  const response = await fetch(`${process.env.AI_BASE_URL || 'https://api.openai.com/v1'}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You rank urgent local-service recommendations. Return concise JSON with summary and ranked item ids only.'
        },
        {
          role: 'user',
          content: JSON.stringify({ query, services })
        }
      ],
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    return {
      mode: 'simulated',
      summary: 'AI API was unavailable, so the scoring engine used the local decision model.',
      recommendations: scoreServices(query)
    };
  }

  const data = await response.json();
  return {
    mode: 'api',
    summary: data.choices?.[0]?.message?.content || 'AI API returned a response.',
    recommendations: scoreServices(query)
  };
};

module.exports = { getAIRecommendation, scoreServices, services };
