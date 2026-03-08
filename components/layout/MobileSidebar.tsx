'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Github, Linkedin, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'EN', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'TR', label: 'Turkish', flag: 'https://flagcdn.com/w40/tr.png' },
]

interface NavLink {
  href: string
  label: string
}

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
  navLinks: NavLink[]
}

export default function MobileSidebar({ open, onClose, navLinks }: MobileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [currentLang, setCurrentLang] = useState(languages[0])

  // Close on outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-border shadow-xl',
          'flex flex-col transition-transform duration-300 ease-in-out md:hidden',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <span className="font-serif font-bold text-xl text-foreground">dastugo</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col px-6 py-8 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-base font-medium text-foreground hover:text-primary hover:bg-muted px-3 py-3 rounded-lg transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer of Sidebar */}
        <div className="px-6 py-6 border-t border-border space-y-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang)}
                className={cn(
                  'flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors font-medium cursor-pointer',
                  currentLang.code === lang.code
                    ? 'text-foreground bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={20}
                  height={14}
                  className="rounded-sm object-cover"
                />
                {lang.code}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Instagram size={18} />
            </a>
          </div>

          <Link
            href="/#contact"
            onClick={onClose}
            className="block w-full text-center px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </aside>
    </>
  )
}
