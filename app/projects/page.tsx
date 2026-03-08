import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContentToggle from '@/components/ContentToggle'
import { projects } from '@/lib/data'
import { Github, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Dastugo',
  description: 'Explore all projects built by Dastugo — AI systems, web apps, mobile apps and automation tools.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Toggle */}
          <div className="flex flex-col items-center gap-4 mb-14 pt-8">
            <ContentToggle active="projects" />
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-center text-balance">
              All Projects
            </h1>
            <p className="text-muted-foreground text-center max-w-lg">
              A collection of work we&apos;re proud of — from open source tools to client solutions.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <Link href={`/project/${project.slug}`} className="block relative aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/90 text-foreground">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      Featured
                    </span>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/project/${project.slug}`}>
                    <h2 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground flex-1">
                      {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="View on GitHub"
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="View live site"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
