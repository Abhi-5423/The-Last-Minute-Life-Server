'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Bot, LayoutDashboard, Menu, Phone, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/services', label: 'Services', icon: Activity },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contact', label: 'Contact', icon: Phone }
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white dark:bg-white dark:text-ink">
            <Sparkles size={20} />
          </span>
          <span className="leading-tight">
            Last Minute
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">Life Server</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-ink text-white dark:bg-white dark:text-ink'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="grid gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Icon size={17} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
