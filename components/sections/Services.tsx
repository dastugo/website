'use client'

import { useEffect, useRef } from 'react'
import {
  Brain,
  Zap,
  Globe,
  Smartphone,
  MessageSquare,
  Bot,
  Code2,
  BarChart3
} from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI Consulting',
    description: 'Strategic guidance on integrating AI into your business processes. From feasibility to deployment.',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Automate repetitive workflows with intelligent agents that learn and adapt to your business.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Scalable, production-ready web applications built with modern frameworks and best practices.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile experiences for iOS and Android that users love.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Fast, accessible, and SEO-optimized websites tailored to your brand and audience.',
  },
  {
    icon: MessageSquare,
    title: 'Chatbot Services',
    description: 'Custom conversational AI that integrates with your platforms and speaks your brand voice.',
  },
  {
    icon: Bot,
    title: 'Company AI Agents',
    description: 'Bespoke AI agents built to handle your company-specific tasks, decisions, and workflows.',
  },
  {
    icon: BarChart3,
    title: 'Task Automation',
    description: 'Identify, design and implement automation pipelines that save hours of manual work each week.',
  },
]

function useIntersectionAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(ref as React.RefObject<HTMLElement>)

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-sm"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <service.icon size={20} className="text-primary" />
      </div>
      <h3 className="font-semibold text-base text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </div>
  )
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headingRef}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-14 max-w-xl"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            What We Do
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight mb-4">
            Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From AI strategy to shipping production apps — we cover the full spectrum so you can focus on your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
