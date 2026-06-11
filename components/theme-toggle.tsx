'use client'

import { useTheme } from '@/app/providers'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-sky-500/50 dark:hover:shadow-sky-500/30 text-slate-900 dark:text-slate-50 hover:bg-accent/10 dark:hover:bg-accent/20"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-slate-900" />
      ) : (
        <Sun className="w-5 h-5 text-slate-50" />
      )}
    </button>
  )
}
