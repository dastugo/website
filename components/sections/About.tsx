'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ExternalLink, MapPin, GraduationCap, Briefcase, Linkedin, Github } from 'lucide-react'
import type { TeamMember } from '@/lib/types'

interface StoryImage { url: string; alt?: string }

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
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

const FALLBACK_IMAGES: StoryImage[] = [
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7709-S40oxledAJXXuJesQHWd1Jo3JCPa7Q.jpg', alt: 'Serap and Dogan Ogut' },
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2023-01-15-15-25-20-Ka1jEg97oMOD5PzlBll5TTzykJCL2L.jpg', alt: 'Serap and baby Dogan' },
  { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-02%20at%208.58.39%E2%80%AFPM-2wsUpflKEDJQS5itCYKpOMmuC50Eew.png', alt: 'Sibling memories' },
]

export default function About({ teamMembers, storyImages }: { teamMembers: TeamMember[]; storyImages: StoryImage[] }) {
  const t = useTranslations('sections.about')
  const headingRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  useIntersectionAnimation(storyRef as React.RefObject<HTMLElement>)

  const images = storyImages.length >= 3 ? storyImages : FALLBACK_IMAGES

  return (
    <section id="about" className="py-24 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-16 max-w-xl">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{t('label')}</p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight mb-4">{t('heading')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
        </div>

        <div ref={storyRef} className="opacity-0 translate-y-8 transition-all duration-700 rounded-3xl bg-card border border-border p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{t('storyLabel')}</p>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-4 text-balance">
                &ldquo;{t('storyHeading')}&rdquo;
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('storyBody1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('storyBody2')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 h-72 md:h-80">
              <div className="relative rounded-2xl overflow-hidden">
                <Image src={images[0].url} alt={images[0].alt ?? ''} fill
                  className="object-cover object-[center_30%]" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image src={images[1].url} alt={images[1].alt ?? ''} fill
                    className="object-cover object-[center_40%]" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image src={images[2].url} alt={images[2].alt ?? ''} fill
                    className="object-cover object-[center_35%]" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(ref as React.RefObject<HTMLElement>)
  return (
    <div ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-3xl border border-border overflow-hidden flex flex-col md:flex-row"
      style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="relative w-full md:w-52 h-72 md:h-auto shrink-0">
        <Image src={member.imageUrl} alt={member.name} fill
          className="object-cover object-[center_25%] md:object-[center_20%]" sizes="(max-width: 768px) 100vw, 208px" />
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
            <MapPin size={12} className="mt-0.5 shrink-0" /><span>{member.location}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <GraduationCap size={12} className="mt-0.5 shrink-0" /><span>{member.education}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <Link href={member.websiteUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
              Personal Website <ExternalLink size={11} />
            </Link>
            <div className="flex items-center gap-1">
              {member.linkedinUrl && (
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={`${member.name} LinkedIn`}><Linkedin size={13} /></a>
              )}
              {member.githubUrl && (
                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={`${member.name} GitHub`}><Github size={13} /></a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
