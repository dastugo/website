'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSocial } from '@/context/SocialContext'

export default function Footer() {
  const locale = useLocale()
  const social = useSocial()
  const t = useTranslations('footer')

  const footerLinks = {
    [t('company')]: [
      { label: t('about'), href: `/${locale}/#about` },
      { label: t('services'), href: `/${locale}/#services` },
      { label: t('contact'), href: `/${locale}/#contact` },
    ],
    [t('resources')]: [
      { label: t('projects'), href: `/${locale}/#projects-preview` },
      { label: t('blog'), href: `/${locale}/#blogs-preview` },
      { label: t('gallery'), href: `/${locale}/#gallery-preview` },
    ],
    [t('team')]: [
      { label: 'Serap Ogut', href: 'https://oykuserap.github.io/' },
      { label: 'Dogan Ogut', href: 'https://ogutdgn.com' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: social.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: social.linkedinUrl, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${social.email}`, label: 'Email' },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="inline-block group">
              <span className="font-serif font-bold text-2xl">
                <span className="text-primary">das</span><span className="text-foreground group-hover:text-primary transition-colors">tugo</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={s.label}>
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-4 text-foreground">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dastugo. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
