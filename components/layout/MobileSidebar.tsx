'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { X, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useSocial } from '@/context/SocialContext'

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'tr', label: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png' },
]

interface NavLink { href: string; label: string }
interface MobileSidebarProps { open: boolean; onClose: () => void; navLinks: NavLink[]; locale: string }

export default function MobileSidebar({ open, onClose, navLinks, locale }: MobileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('nav')
  const social = useSocial()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    window.dispatchEvent(new CustomEvent('sidebarchange', { detail: { open } }))
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    onClose()
  }

  return (
    <>
      <div
        className={cn('fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}
        onClick={onClose} aria-hidden="true"
      />
      <aside
        ref={sidebarRef}
        className={cn('fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-border shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden',
          open ? 'translate-x-0' : 'translate-x-full')}
        aria-modal="true" role="dialog" aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <span className="font-serif font-bold text-xl">
            <span className="text-primary">das</span><span className="text-foreground">tugo</span>
          </span>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-6 py-8 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="text-base font-medium text-foreground hover:text-primary hover:bg-muted px-3 py-3 rounded-lg transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-border space-y-4">
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => switchLocale(lang.code)}
                className={cn('flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors font-medium cursor-pointer',
                  locale === lang.code ? 'text-foreground bg-primary/10' : 'text-muted-foreground hover:text-foreground')}>
                <Image src={lang.flag} alt={lang.label} width={20} height={14} className="rounded-sm object-cover" />
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={social.githubUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Github size={18} />
            </a>
            <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${social.email}`}
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Mail size={18} />
            </a>
          </div>

          <Link href={`/${locale}/#contact`} onClick={onClose}
            className="block w-full text-center px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            {t('getInTouch')}
          </Link>
        </div>
      </aside>
    </>
  )
}
