'use client';

import { Bot, Bookmark, Loader2, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { getRecommendations } from '@/lib/api';
import type { Recommendation, RecommendationResponse, RecentSearch } from '@/lib/types';

const examples = ['I need a nearby hospital right now', 'Find the cheapest hotel available tonight', 'I need medicine delivered quickly'];

export default function AssistantPage() {
  const [query, setQuery] = useState(examples[0]);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const saveSearch = (value: string) => {
    const searches: RecentSearch[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    localStorage.setItem('recentSearches', JSON.stringify([{ query: value, createdAt: new Date().toISOString() }, ...searches].slice(0, 6)));
  };

  const saveRecommendation = (recommendation: Recommendation) => {
    const saved: Recommendation[] = JSON.parse(localStorage.getItem('savedRecommendations') || '[]');
    const next = [recommendation, ...saved.filter((item) => item.id !== recommendation.id)].slice(0, 8);
    localStorage.setItem('savedRecommendations', JSON.stringify(next));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await getRecommendations(query);
      setResult(data);
      saveSearch(query);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-ember/10 px-4 py-2 text-sm font-semibold text-ember">
            <Bot size={16} /> AI Assistant
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Tell it what happened. Get ranked next moves.</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            The assistant scores each option using price, distance, rating, and availability, then explains the best fit.
          </p>

          <form onSubmit={onSubmit} className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={6}
              className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-4 outline-none transition focus:border-ember dark:border-zinc-800 dark:bg-zinc-900"
              placeholder="Describe your situation..."
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="rounded-full border border-zinc-200 px-3 py-2 text-xs hover:border-ember dark:border-zinc-800"
                >
                  {example}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-ink"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {loading ? 'Comparing options...' : 'Get AI recommendations'}
            </button>
          </form>
          {error && <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600">{error}</p>}
        </div>

        <div className="grid gap-4">
          {!result && (
            <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-zinc-300 bg-white/60 p-8 text-center dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <Bot className="mx-auto animate-float text-signal" size={44} />
                <h2 className="mt-4 text-2xl font-semibold">Recommendations will appear here</h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300">Use one prompt to compare multiple options automatically.</p>
              </div>
            </div>
          )}

          {result && (
            <>
              <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{result.mode} mode</p>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">{result.summary}</p>
              </div>
              {result.recommendations.map((recommendation, index) => (
                <article
                  key={recommendation.id}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">Rank #{index + 1}</p>
                      <h3 className="mt-1 text-xl font-semibold">{recommendation.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-ink">AI Score {recommendation.aiScore}</span>
                      <button
                        onClick={() => saveRecommendation(recommendation)}
                        className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 hover:border-ember dark:border-zinc-800"
                        aria-label={`Save ${recommendation.name}`}
                      >
                        <Bookmark size={17} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{recommendation.reason}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <span>${recommendation.price}</span>
                    <span>{recommendation.distanceKm} km</span>
                    <span>{recommendation.rating}/5 rating</span>
                    <span>{Math.round(recommendation.availability * 100)}% available</span>
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
