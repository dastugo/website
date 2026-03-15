import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { client } from '@/lib/sanity/client'
import { projectBySlugQuery, allProjectSlugsQuery, allProjectsQuery } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const BASE_URL = 'https://dastugo.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = await client.fetch(projectBySlugQuery(locale), { slug })
  if (!project) return {}
  return {
    title: `${project.title} | dastugo`,
    description: project.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/project/${slug}`,
      languages: {
        tr: `${BASE_URL}/tr/project/${slug}`,
        en: `${BASE_URL}/en/project/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} | dastugo`,
      description: project.description,
      url: `${BASE_URL}/${locale}/project/${slug}`,
      siteName: 'dastugo',
      type: 'article',
      ...(project.imageUrl ? { images: [{ url: project.imageUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | dastugo`,
      description: project.description,
      ...(project.imageUrl ? { images: [project.imageUrl] } : {}),
    },
  }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allProjectSlugsQuery)
  return ['tr', 'en'].flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug }))
  )
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('projects')
  const project = await client.fetch(projectBySlugQuery(locale), { slug })

  if (!project) notFound()

  const allProjects = await client.fetch(allProjectsQuery(locale))
  const related = allProjects
    .filter((p: { slug: string; category: string }) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 min-h-screen">
        <div className="relative h-72 md:h-96 w-full">
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <Link href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 -mt-2">
            <ArrowLeft size={15} />{t('back')}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{project.category}</span>
            {project.featured && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary text-primary-foreground">{t('featured')}</span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
              <Calendar size={12} />
              {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4 text-balance">{project.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
            ))}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-3 mb-10">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary hover:text-primary text-sm font-medium transition-colors">
                  <Github size={16} />{t('viewGithub')}
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  <ExternalLink size={16} />{t('liveDemo')}
                </a>
              )}
            </div>
          )}

          <div className="prose prose-sm max-w-none mb-16 border-t border-border pt-10">
            <p className="text-base text-muted-foreground leading-relaxed">{project.content}</p>
          </div>

          {related.length > 0 && (
            <div className="border-t border-border pt-10">
              <h2 className="font-serif font-bold text-2xl text-foreground mb-6">{t('related')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p: { slug: string; title: string; imageUrl: string }) => (
                  <Link key={p.slug} href={`/${locale}/project/${p.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all">
                    <div className="relative aspect-video">
                      <Image src={p.imageUrl} alt={p.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
