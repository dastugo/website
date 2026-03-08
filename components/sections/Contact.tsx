'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle2, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

const services = [
  'AI Consulting',
  'AI Automation',
  'Full-Stack Development',
  'Mobile App Development',
  'Web Development',
  'Chatbot Services',
  'Company AI Agents',
  'Other',
]

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  useIntersectionAnimation(formRef as React.RefObject<HTMLElement>)

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const serviceRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder — replace with real backend call
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div
            ref={headingRef}
            className="opacity-0 translate-y-8 transition-all duration-700"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              Let&apos;s Talk
            </p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight mb-6">
              Start a Project
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Have an idea? Need to automate something? Want to build an AI agent for your team? Drop us a message — we&apos;re fast to respond and love a good challenge.
            </p>
            <div className="space-y-4">
              <ContactDetail label="Email" value="hello@dastugo.com" href="mailto:hello@dastugo.com" />
              <ContactDetail label="Based in" value="Dallas, TX - United States" />
              <ContactDetail label="Also serving" value="Turkey & remote worldwide" />
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: '150ms' }}
          >
            {submitted ? (
              <div className="bg-card rounded-3xl border border-border p-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-primary" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-foreground">Message Sent</h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl border border-border p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <FormField
                  label="Company (optional)"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={handleChange}
                />
                <div className="space-y-1.5" ref={serviceRef}>
                  <label className="text-sm font-medium text-foreground">Service</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setServiceOpen(!serviceOpen)}
                      className={cn(
                        'w-full flex items-center justify-between rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm transition-all cursor-pointer',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                        form.service ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      <span>{form.service || 'Select a service...'}</span>
                      <ChevronDown size={16} className={cn('text-muted-foreground transition-transform', serviceOpen && 'rotate-180')} />
                    </button>
                    
                    {serviceOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setForm(prev => ({ ...prev, service: s }))
                              setServiceOpen(false)
                            }}
                            className={cn(
                              'w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors cursor-pointer',
                              'hover:bg-muted',
                              form.service === s ? 'text-primary bg-primary/5' : 'text-foreground'
                            )}
                          >
                            <span>{s}</span>
                            {form.service === s && <Check size={14} className="text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-opacity',
                    loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
                  )}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send size={15} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
      />
    </div>
  )
}

function ContactDetail({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
      {href ? (
        <a href={href} className="text-sm text-foreground hover:text-primary transition-colors">
          {value}
        </a>
      ) : (
        <span className="text-sm text-foreground">{value}</span>
      )}
    </div>
  )
}
