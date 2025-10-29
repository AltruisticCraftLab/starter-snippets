'use client';

import { memo, useSyncExternalStore } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import MoonIcon from './moon-icon';
import SunIcon from './sun-icon';
import SystemIcon from './system-icon';
import { useTheme } from 'next-themes';

// ========================================
// CONSTANTS
// ========================================

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: SystemIcon },
] as const;

// ========================================
// TYPES
// ========================================

interface ThemeToggleProps {
  className?: string;
}

// ---------------------- ThemeToggle Component ----------------------
/**
 * Theme toggle dropdown with automatic icon switching.
 * SSR-safe with smooth transitions and smart icon detection.
 */
const ThemeToggle = memo<ThemeToggleProps>(({ className }) => {
  // ========================================
  // STATE AND HOOKS
  // ========================================

  const { theme, resolvedTheme, setTheme } = useTheme();

  // ========================================
  // EFFECTS
  // ========================================

  // SSR-safe mounted check
  const mounted = useSyncExternalStore(
    () => () => {}, // subscribe (no-op)
    () => true, // client value
    () => false // server value
  );

  // ========================================
  // LOADING STATE
  // ========================================

  if (!mounted) {
    return (
      <div
        className={cn('flex h-9 w-9 items-center justify-center', className)}
      >
        <div className="bg-secondary/50 dark:bg-secondary/50 h-5 w-5 animate-pulse rounded-full" />
      </div>
    );
  }

  // ========================================
  // COMPUTED VALUES
  // ========================================

  // Determine if dark theme should be shown
  const isDark =
    theme === 'system' ? resolvedTheme === 'dark' : theme === 'dark';

  // ========================================
  // RENDER
  // ========================================

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change theme"
          className={cn(
            'hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors',
            className
          )}
        >
          {isDark ? (
            <MoonIcon className="size-5" />
          ) : (
            <SunIcon className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-border min-w-[150px] rounded border"
        align="end"
        sideOffset={8}
      >
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            data-theme-selected={theme === value}
            className={cn(
              'cursor-pointer px-3 py-2',
              // Selected state
              'data-[theme-selected=true]:bg-primary/30 data-[theme-selected=true]:hover:bg-primary/30 data-[theme-selected=true]:dark:bg-primary/45 data-[theme-selected=true]:dark:hover:bg-primary/45 data-[theme-selected=true]:font-bold',
              // Non-selected state
              'data-[theme-selected=false]:hover:bg-primary/15 data-[theme-selected=false]:dark:hover:bg-primary/20 data-[theme-selected=false]:focus:bg-primary/15'
            )}
          >
            <Icon aria-hidden="true" />
            <span className="text-foreground">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;