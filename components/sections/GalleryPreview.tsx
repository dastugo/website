'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export interface SanityGalleryImage { id: string; src: string; alt: string; caption?: string }

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

export default function GalleryPreview({ galleryImages }: { galleryImages: SanityGalleryImage[] }) {
  const t = useTranslations('sections.gallery')
  const headingRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const locale = useLocale()
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  if (!galleryImages.length) return null
  const prev = () => setActive((a) => (a - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setActive((a) => (a + 1) % galleryImages.length)

  return (
    <section id="gallery-preview" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{t('label')}</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight">{t('heading')}</h2>
          </div>
          <Link href={`/${locale}/gallery`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline shrink-0">
            {t('viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {galleryImages.map((image, i) => (
              <div key={image.id} className={cn('absolute inset-0 transition-opacity duration-700', i === active ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 90vw" priority={i === 0} />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent px-6 py-6">
                    <p className="text-primary-foreground text-base md:text-lg font-semibold drop-shadow-md">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors cursor-pointer" aria-label="Previous image">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors cursor-pointer" aria-label="Next image">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {galleryImages.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={cn('rounded-full transition-all duration-300 cursor-pointer', i === active ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-primary-foreground/60 hover:bg-primary-foreground')}
                aria-label={`Go to image ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
