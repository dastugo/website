'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/data'
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

export default function ProjectsSlider() {
  const headingRef = useRef<HTMLDivElement>(null)
  useIntersectionAnimation(headingRef as React.RefObject<HTMLElement>)

  // Duplicate for seamless loop
  const doubled = [...projects, ...projects]

  return (
    <section id="projects-preview" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headingRef}
          className="opacity-0 translate-y-8 transition-all duration-700 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              Our Work
            </p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance leading-tight">
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline shrink-0"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative">
        <div className="flex gap-5 animate-slider" style={{ width: 'max-content' }}>
          {doubled.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="group block w-72 shrink-0 rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
        <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/90 text-foreground">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-sm text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
