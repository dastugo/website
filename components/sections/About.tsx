'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, MapPin, GraduationCap, Briefcase } from 'lucide-react'
import { teamMembers } from '@/lib/data'

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

export default function About() {
  const headingRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  useIntersectionAnimation(storyRef as React.RefObject<HTMLElement>)

  return (
    <section id="about" className="py-24 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headingRef}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-16 max-w-xl"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            The Team
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight mb-4">
            Who We Are
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A sister and a brother, a few thousand miles apart, shipping things together.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Story Block */}
        <div
          ref={storyRef}
          className="opacity-0 translate-y-8 transition-all duration-700 rounded-3xl bg-card border border-border p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                Our Story
              </p>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-4 text-balance">
                &ldquo;Once upon a time, we argued about who broke the iPad. Now we build solutions together.&rdquo;
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We grew up in Turkey, moved to the United States to pursue our education, and somewhere along the way realized we were both building things — just separately. Dastugo is our answer to that.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We bring together Serap&apos;s deep expertise in AI and data science with Dogan&apos;s full-stack and mobile chops. The result is a small team with a wide range — from AI strategy to shipping production apps to automating workflows that actually save people time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 h-72 md:h-80">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7709-S40oxledAJXXuJesQHWd1Jo3JCPa7Q.jpg"
                  alt="Serap and Dogan Ogut"
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2023-01-15-15-25-20-Ka1jEg97oMOD5PzlBll5TTzykJCL2L.jpg"
                    alt="Serap and baby Dogan"
                    fill
                    className="object-cover object-[center_40%]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-02%20at%208.58.39%E2%80%AFPM-2wsUpflKEDJQS5itCYKpOMmuC50Eew.png"
                    alt="Sibling memories"
                    fill
                    className="object-cover object-[center_35%]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(ref as React.RefObject<HTMLElement>)

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-3xl border border-border overflow-hidden flex flex-col md:flex-row"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative w-full md:w-52 h-72 md:h-auto shrink-0">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover object-[center_25%] md:object-[center_20%]"
          sizes="(max-width: 768px) 100vw, 208px"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif font-bold text-xl text-foreground mb-1">{member.name}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            <Briefcase size={13} className="text-primary shrink-0" />
            <span className="text-sm text-primary font-medium">{member.role}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className="mt-0.5 shrink-0" />
            <span>{member.location}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <GraduationCap size={12} className="mt-0.5 shrink-0" />
            <span>{member.education}</span>
          </div>
          <Link
            href={member.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-1"
          >
            Personal Website
            <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </div>
  )
}
