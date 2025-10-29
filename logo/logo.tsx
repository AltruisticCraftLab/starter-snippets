'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BRAND } from '@/config/index';
import { cn } from '@/lib/utils';

// ========================================
// TYPES AND INTERFACES
// ========================================

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  hideTextOnMobile?: boolean;
  priority?: boolean;
  href?: string;
}

// ========================================
// CONSTANTS
// ========================================

const sizes = {
  sm: {
    icon: 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8',
    text: 'text-base sm:text-lg md:text-xl font-semibold',
    imageSizes: '(max-width: 640px) 24px, (max-width: 768px) 28px, 32px',
  },
  md: {
    icon: 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10',
    text: 'text-lg sm:text-xl md:text-2xl font-bold',
    imageSizes: '(max-width: 640px) 32px, (max-width: 768px) 36px, 40px',
  },
  lg: {
    icon: 'h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12',
    text: 'text-xl sm:text-2xl md:text-3xl font-bold',
    imageSizes: '(max-width: 640px) 40px, (max-width: 768px) 44px, 48px',
  },
};

// ========================================
// HELPER COMPONENTS
// ========================================

const DefaultIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold',
      'text-xl sm:text-2xl md:text-3xl',
      className
    )}
  >
    {BRAND.name.charAt(0).toUpperCase()}
  </div>
);

// ---------------------- Logo Component ----------------------
/**
 * Logo component with automatic fallbacks and responsive design.
 * Falls back to brand initial if no logo image is provided or fails to load.
 * Optimized for SaaS applications with auth flows.
 */
export function Logo({
  className,
  size = 'md',
  showText = true,
  hideTextOnMobile = false,
  priority = false,
  href = '/',
}: LogoProps) {
  // ========================================
  // STATE AND HOOKS
  // ========================================

  const [imageError, setImageError] = useState(false);

  // ========================================
  // COMPUTED VALUES
  // ========================================

  const sizeConfig = sizes[size];

  // ========================================
  // EVENT HANDLERS
  // ========================================

  const handleImageError = () => {
    setImageError(true);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 rounded-sm transition-opacity hover:opacity-80 sm:gap-3',
        'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'min-h-11 touch-manipulation py-1',
        className
      )}
      aria-label={`${BRAND.name} home page`}
    >
      {/* Logo Icon/Image */}
      {BRAND.logoPath && !imageError ? (
        <div className={cn('relative shrink-0', sizeConfig.icon)}>
          <Image
            src={BRAND.logoPath}
            alt={`${BRAND.name} logo`}
            fill
            className="object-contain"
            sizes={sizeConfig.imageSizes}
            priority={priority}
            onError={handleImageError}
          />
        </div>
      ) : (
        <DefaultIcon className={cn('shrink-0', sizeConfig.icon)} />
      )}

      {/* Brand Text */}
      {showText && (
        <span
          className={cn(
            'text-foreground truncate leading-tight select-none',
            sizeConfig.text,
            hideTextOnMobile && 'hidden sm:inline'
          )}
        >
          {BRAND.name}
        </span>
      )}
    </Link>
  );
}
