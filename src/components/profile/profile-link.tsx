'use client';

import { Link as LinkType } from '@/lib/db/schema';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface ProfileLinkProps {
  link: LinkType;
  variant?: 'compact' | 'featured' | 'standard';
}

export function ProfileLink({ link, variant = 'standard' }: ProfileLinkProps) {
  const handleClick = () => {
    if (navigator.sendBeacon) {
      const blob = new Blob(
        [JSON.stringify({ linkId: link.id })],
        { type: 'application/json' }
      );
      navigator.sendBeacon('/api/track-click', blob);
    } else {
      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId: link.id }),
        keepalive: true,
      }).catch(() => {});
    }
  };

  const hostname = (() => {
    try {
      return new URL(link.url).hostname.replace('www.', '');
    } catch {
      return link.url;
    }
  })();

  // Featured variant - spans 2 columns
  if (variant === 'featured') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group block"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-tight p-6 sm:p-8 hover-lift-subtle border-focus shadow-hover transition-all">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold heading-tight mb-1 sm:mb-2 group-hover:tracking-tight transition-all">
                {link.title}
              </h3>
              <p className="text-xs sm:text-sm mono-meta text-neutral-500 dark:text-neutral-500 truncate">
                {hostname}
              </p>
            </div>
            <ArrowUpRight 
              size={20} 
              className="sm:w-6 sm:h-6 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 arrow-slide transition-colors flex-shrink-0" 
              strokeWidth={1.5}
            />
          </div>
        </div>
      </a>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group block"
      >
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-tight p-4 hover-lift-subtle border-focus shadow-hover transition-all">
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium text-sm truncate tracking-precise">
              {link.title}
            </span>
            <ExternalLink 
              size={16} 
              className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors shrink-0" 
              strokeWidth={1.5}
            />
          </div>
        </div>
      </a>
    );
  }

  // Standard variant
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group block"
    >
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-tight p-4 sm:p-5 hover-lift-subtle border-focus shadow-hover transition-all">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 truncate tracking-precise">
              {link.title}
            </h3>
            <p className="text-xs mono-meta text-neutral-500 dark:text-neutral-500 truncate">
              {hostname}
            </p>
          </div>
          <ArrowUpRight 
            size={18} 
            className="sm:w-5 sm:h-5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 arrow-slide transition-colors shrink-0" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </a>
  );
}
