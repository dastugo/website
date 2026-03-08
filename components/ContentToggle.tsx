'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ContentToggleProps {
  active: 'projects' | 'blogs'
}

export default function ContentToggle({ active }: ContentToggleProps) {
  const router = useRouter()

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-secondary border border-border gap-1">
      <button
        onClick={() => router.push('/projects')}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
          active === 'projects'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Projects
      </button>
      <button
        onClick={() => router.push('/blogs')}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
          active === 'blogs'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Blog
      </button>
    </div>
  )
}
