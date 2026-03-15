'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Brain, Zap, Globe, Smartphone, MessageSquare, Bot, Code2, BarChart3, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = { Brain, Zap, Code2, Smartphone, Globe, MessageSquare, Bot, BarChart3 }

export interface SanityService { title: string; description: string; icon: string }

function useIntersectionAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('opacity-100', 'translate-y-0')
        el.classList.remove('opacity-0', 'translate-y-8')
        observer.unobserve(el)
      }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function ServiceCard({ service, index }: { service: SanityService; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(ref as React.RefObject<HTMLElement>)
  const Icon = iconMap[service.icon] ?? Brain
  return (
    <div ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-sm"
      style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon size={20} className="text-primary" />
      </div>
      <h3 className="font-semibold text-base text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </div>
  )
}

export default function Services({ services }: { services: SanityService[] }) {
  const t = useTranslations('sections.services')
  const headingRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  if (!services.length) return null

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 max-w-xl">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{t('label')}</p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight mb-4">{t('heading')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('subheading')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => <ServiceCard key={service.title} service={service} index={i} />)}
        </div>
      </div>
    </section>
  )
}
