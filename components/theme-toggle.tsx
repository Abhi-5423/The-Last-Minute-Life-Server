'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-800" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      aria-label="Toggle color mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-ember dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
