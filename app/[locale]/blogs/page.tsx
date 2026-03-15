import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContentToggle from '@/components/ContentToggle'
import { Calendar, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { client } from '@/lib/sanity/client'
import { allBlogPostsQuery } from '@/lib/sanity/queries'
import type { SanityBlogPost } from '@/components/sections/BlogsSlider'

interface Props {
  params: Promise<{ locale: string }>
}

const BASE_URL = 'https://dastugo.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('blogs')
  return {
    title: `${t('heading')} | dastugo`,
    description: t('subheading'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blogs`,
      languages: {
        tr: `${BASE_URL}/tr/blogs`,
        en: `${BASE_URL}/en/blogs`,
      },
    },
    openGraph: {
      title: `${t('heading')} | dastugo`,
      description: t('subheading'),
      url: `${BASE_URL}/${locale}/blogs`,
      siteName: 'dastugo',
      type: 'website',
    },
  }
}

export default async function BlogsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('blogs')
  const blogPosts: SanityBlogPost[] = await client.fetch(allBlogPostsQuery(locale))
  const featured = blogPosts.filter((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-14 pt-8">
            <ContentToggle active="blogs" />
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-center text-balance">
              {t('heading')}
            </h1>
            <p className="text-muted-foreground text-center max-w-lg">{t('subheading')}</p>
          </div>

          {featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-medium tracking-widest uppercase text-primary mb-6">{t('featured')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div>
              <h2 className="text-xs font-medium tracking-widest uppercase text-primary mb-6">{t('morePosts')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function BlogCard({ post, locale }: { post: SanityBlogPost; locale: string }) {
  return (
    <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col">
      <Link href={`/${locale}/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
        <Image src={post.imageUrl} alt={post.title} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
          ))}
        </div>
        <Link href={`/${locale}/blog/${post.slug}`} className="flex-1">
          <h2 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        </Link>
        <div className="flex items-center gap-4 pt-4 mt-4 border-t border-border text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  )
}
