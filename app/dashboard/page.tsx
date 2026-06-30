'use client';

import { Bookmark, Clock, Heart, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Recommendation, RecentSearch } from '@/lib/types';

const favoriteServices = ['RapidCare Emergency Hospital', 'CityRest Express Hotel', 'NightLine Cab Assist'];

export default function DashboardPage() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [savedRecommendations, setSavedRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    setRecentSearches(JSON.parse(localStorage.getItem('recentSearches') || '[]'));
    setSavedRecommendations(JSON.parse(localStorage.getItem('savedRecommendations') || '[]'));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your decision workspace</h1>
        </div>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-300">
          Saved recommendations and recent prompts show how AI reduces repeated work and keeps decisions moving.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { icon: Search, label: 'Recent searches', value: recentSearches.length },
          { icon: Bookmark, label: 'Saved recommendations', value: savedRecommendations.length },
          { icon: Heart, label: 'Favorite services', value: favoriteServices.length }
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <Icon className="text-signal" />
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            <p className="text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Clock size={20} /> Recent searches
          </h2>
          <div className="mt-4 grid gap-3">
            {(recentSearches.length ? recentSearches : [{ query: 'Find the cheapest hotel available tonight', createdAt: new Date().toISOString() }]).map(
              (search) => (
                <div key={`${search.query}-${search.createdAt}`} className="rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
                  <p>{search.query}</p>
                  <p className="mt-1 text-xs text-zinc-500">{new Date(search.createdAt).toLocaleString()}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Bookmark size={20} /> Saved recommendations
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(savedRecommendations.length ? savedRecommendations : []).map((item) => (
              <div key={item.id} className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{item.name}</p>
                  <span className="rounded-full bg-mint px-2 py-1 text-xs font-bold text-ink">{item.aiScore}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.reason}</p>
              </div>
            ))}
            {!savedRecommendations.length && (
              <p className="rounded-lg bg-zinc-100 p-4 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                Save recommendations from the AI Assistant to keep your best options here.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Heart size={20} /> Favorite services
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {favoriteServices.map((service) => (
            <span key={service} className="rounded-full bg-ember/10 px-4 py-2 text-sm font-medium text-ember">
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
