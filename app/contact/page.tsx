import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Connect your real-world services</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Add hospitals, hotels, transport providers, pharmacies, or internal service teams to make recommendations more useful.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              { icon: Mail, label: 'support@lastminutelife.local' },
              { icon: Phone, label: '+91 00000 00000' },
              { icon: MapPin, label: 'Built for urgent local decisions' }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <Icon className="text-signal" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 outline-none focus:border-ember dark:border-zinc-800 dark:bg-zinc-900" placeholder="Name" />
            <input className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 outline-none focus:border-ember dark:border-zinc-800 dark:bg-zinc-900" placeholder="Email" />
          </div>
          <input className="mt-4 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 outline-none focus:border-ember dark:border-zinc-800 dark:bg-zinc-900" placeholder="Subject" />
          <textarea className="mt-4 h-40 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 outline-none focus:border-ember dark:border-zinc-800 dark:bg-zinc-900" placeholder="How can Last Minute Life help?" />
          <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-ember dark:bg-white dark:text-ink">
            <MessageSquare size={18} /> Send message
          </button>
        </form>
      </div>
    </section>
  );
}
