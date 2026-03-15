'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useSocial } from '@/context/SocialContext'

const marqueeItems = ['AI Consulting', 'Full-Stack Dev', 'Mobile Apps', 'AI Automation', 'Chatbot Services', 'AI Agents', 'Web Development']

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const social = useSocial()
  const titleRef = useRef<HTMLHeadingElement>(null)

  const socialLinks = [
    { icon: Github, href: social.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedinUrl, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${social.email}`, label: 'Email' },
  ]

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    const timer = setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.90 0.04 10 / 0.28) 0%, transparent 70%)' }} />

      {/* Ticker — lang="en" prevents CSS uppercase Turkish İ issue */}
      <div className="absolute bottom-24 left-0 right-0 overflow-hidden select-none" aria-hidden="true">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {marqueeItems.map((item) => (
                <span key={item} lang="en" className="text-xs font-medium tracking-widest uppercase text-muted-foreground opacity-50">
                  {item} &nbsp;&nbsp;/
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-6 opacity-0 animate-[fadeInUp_0.6s_ease_0.2s_forwards]">
          {t('location')}
        </p>

        <h1 ref={titleRef} className="font-serif font-bold text-[clamp(4rem,12vw,9rem)] leading-none tracking-tight text-foreground">
          dastugo
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.6s_ease_0.5s_forwards]">
          {t('tagline')}
          <br className="hidden md:block" />
          <span className="text-foreground font-medium"> {t('taglineStrong')}</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.7s_forwards]">
          <Link href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {t('viewWork')} <ArrowRight size={16} />
          </Link>
          <Link href={`/${locale}/#contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-primary hover:text-primary font-medium transition-colors text-foreground">
            {t('contact')}
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.9s_forwards]">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
              aria-label={s.label}>
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
