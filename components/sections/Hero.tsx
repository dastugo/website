'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Instagram, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Mail, href: 'mailto:hello@dastugo.com', label: 'Email' },
]

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Title entrance animation
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Soft radial background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.90 0.04 10 / 0.28) 0%, transparent 70%)',
        }}
      />

      {/* Ticker marquee */}
      <div className="absolute bottom-24 left-0 right-0 overflow-hidden select-none" aria-hidden="true">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {['AI Consulting', 'Full-Stack Dev', 'Mobile Apps', 'AI Automation', 'Chatbot Services', 'AI Agents', 'Web Development'].map((item) => (
                <span key={item} className="text-xs font-medium tracking-widest uppercase text-muted-foreground opacity-50">
                  {item} &nbsp;&nbsp;/
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-6 opacity-0 animate-[fadeInUp_0.6s_ease_0.2s_forwards]">
          Turkey &nbsp;&middot;&nbsp; United States
        </p>

        <h1
          ref={titleRef}
          className="font-serif font-bold text-[clamp(4rem,12vw,9rem)] leading-none tracking-tight text-foreground"
        >
          dastugo
        </h1>

        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.6s_ease_0.5s_forwards]"
        >
          Once upon a time, we argued about who broke the iPad.
          <br className="hidden md:block" />
          <span className="text-foreground font-medium"> Now we build solutions together.</span>
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.7s_forwards]"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            View Our Work
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-primary hover:text-primary font-medium transition-colors text-foreground"
          >
            Contact Us
          </Link>
        </div>

        {/* Social Links */}
        <div
          className="mt-10 flex items-center justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.9s_forwards]"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
