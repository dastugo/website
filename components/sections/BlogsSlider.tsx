'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export interface SanityBlogPost {
  slug: string; title: string; excerpt: string; author: string
  date: string; readTime: string; tags: string[]; imageUrl: string; featured: boolean
}

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

export default function BlogsSlider({ blogPosts }: { blogPosts: SanityBlogPost[] }) {
  const t = useTranslations('sections.blogs')
  const headingRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)
  if (!blogPosts.length) return null
  const doubled = [...blogPosts, ...blogPosts]

  return (
    <section id="blogs-preview" className="py-24 overflow-hidden bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{t('label')}</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight">{t('heading')}</h2>
          </div>
          <Link href={`/${locale}/blogs`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline shrink-0">
            {t('viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-5 animate-slider" style={{ width: 'max-content', animationDirection: 'reverse', animationDuration: '45s' }}>
          {doubled.map((post, i) => <BlogCard key={`${post.slug}-${i}`} post={post} locale={locale} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary/40 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/40 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

function BlogCard({ post, locale }: { post: SanityBlogPost; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`}
      className="group block w-72 shrink-0 rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image src={post.imageUrl} alt={post.title} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="288px" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{post.author}</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h3 className="font-semibold text-sm text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
