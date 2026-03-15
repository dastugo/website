'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface ContentToggleProps {
  active: 'projects' | 'blogs'
}

export default function ContentToggle({ active }: ContentToggleProps) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('toggle')

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-secondary border border-border gap-1">
      <button
        onClick={() => router.push(`/${locale}/projects`)}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
          active === 'projects'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {t('projects')}
      </button>
      <button
        onClick={() => router.push(`/${locale}/blogs`)}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
          active === 'blogs'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {t('blogs')}
      </button>
    </div>
  )
}
