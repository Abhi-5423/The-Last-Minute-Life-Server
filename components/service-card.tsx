import { Clock, MapPin, Star, Wallet } from 'lucide-react';
import type { ServiceItem } from '@/lib/types';

export function ServiceCard({ service, action }: { service: ServiceItem; action?: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{service.category}</p>
          <h3 className="mt-2 text-xl font-semibold">{service.name}</h3>
        </div>
        {action}
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{service.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Wallet size={16} /> ${service.price}
        </span>
        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <MapPin size={16} /> {service.distanceKm} km
        </span>
        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Star size={16} /> {service.rating}/5
        </span>
        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Clock size={16} /> {service.responseMinutes} min
        </span>
      </div>
    </article>
  );
}
