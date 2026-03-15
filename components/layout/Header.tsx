'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import MobileSidebar from './MobileSidebar'

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'tr', label: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')

  const currentLang = languages.find((l) => l.code === locale) ?? languages[1]

  const navLinks = [
    { href: `/${locale}/#services`, label: t('services') },
    { href: `/${locale}/#about`, label: t('about') },
    { href: `/${locale}/#projects-preview`, label: t('projects') },
    { href: `/${locale}/#blogs-preview`, label: t('blog') },
    { href: `/${locale}/#gallery-preview`, label: t('gallery') },
    { href: `/${locale}/#contact`, label: t('contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <span className="font-serif font-bold text-2xl tracking-tight">
              <span className="text-primary">das</span><span className="text-foreground group-hover:text-primary transition-colors">tugo</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative hidden md:block" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border hover:border-primary cursor-pointer"
                aria-label="Switch language"
                aria-expanded={langOpen}
              >
                <Image src={currentLang.flag} alt={currentLang.label} width={20} height={14} className="rounded-sm object-cover" />
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} className={cn('transition-transform', langOpen && 'rotate-180')} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-muted transition-colors cursor-pointer',
                        locale === lang.code ? 'text-primary bg-muted/50' : 'text-foreground'
                      )}
                    >
                      <Image src={lang.flag} alt={lang.label} width={20} height={14} className="rounded-sm object-cover" />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/#contact`}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('getInTouch')}
            </Link>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} navLinks={navLinks} locale={locale} />
    </>
  )
}
