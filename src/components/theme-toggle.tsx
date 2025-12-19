'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun size={18} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400 dark:hidden" />
      <Moon size={18} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400 hidden dark:inline" />
    </Button>
  );
}

