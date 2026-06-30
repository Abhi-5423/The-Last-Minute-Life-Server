import Link from 'next/link';
import { ArrowRight, Bot, CheckCircle2, Clock3, Compass, Sparkles } from 'lucide-react';

const gains = [
  'Compares options automatically',
  'Ranks by price, distance, rating, and availability',
  'Turns stressful choices into quick next steps'
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-20 dark:opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=80')"
          }}
        />
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <Sparkles size={16} className="text-ember" />
              AI-powered help when time is short
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Last Minute Life Server
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Describe the situation once. The assistant compares nearby services, explains the tradeoffs, and helps you
              pick the best option faster.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/assistant"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ember dark:bg-white dark:text-ink"
              >
                Ask the AI Assistant <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-ember dark:border-zinc-700 dark:bg-zinc-950"
              >
                Browse services
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/60 bg-white/80 p-4 shadow-soft backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
            <div className="rounded-lg bg-ink p-5 text-white dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-300">Current request</p>
                  <h2 className="mt-1 text-2xl font-semibold">Find the cheapest hotel tonight</h2>
                </div>
                <Bot className="animate-pulseSoft text-mint" size={34} />
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  ['CityRest Express Hotel', 'AI Score 94', '$54', '3.2 km'],
                  ['QuickBite Late Kitchen', 'AI Score 86', '$13', '2.4 km'],
                  ['NightLine Cab Assist', 'AI Score 82', '$18', '0.9 km']
                ].map(([name, score, price, distance]) => (
                  <div key={name} className="rounded-lg border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{name}</p>
                      <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink">{score}</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-300">
                      {price} • {distance} • available now
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {gains.map((gain) => (
            <div key={gain} className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <CheckCircle2 className="text-mint" />
              <p className="mt-4 font-semibold">{gain}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: 'Save time', text: 'Skip opening ten tabs and comparing every detail manually.' },
            { icon: Compass, title: 'Make better decisions', text: 'See why an option ranks higher before you commit.' },
            { icon: Bot, title: 'Complete tasks', text: 'Move from panic to action with a ranked shortlist.' }
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
              <Icon className="text-ember" />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
