import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { client } from '@/lib/sanity/client'
import { blogBySlugQuery, allBlogSlugsQuery, allBlogPostsQuery } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const BASE_URL = 'https://dastugo.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await client.fetch(blogBySlugQuery(locale), { slug })
  if (!post) return {}
  return {
    title: `${post.title} | dastugo`,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        tr: `${BASE_URL}/tr/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | dastugo`,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: 'dastugo',
      type: 'article',
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | dastugo`,
      description: post.excerpt,
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allBlogSlugsQuery)
  return ['tr', 'en'].flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug }))
  )
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('blogs')
  const post = await client.fetch(blogBySlugQuery(locale), { slug })

  if (!post) notFound()

  const allPosts = await client.fetch(allBlogPostsQuery(locale))
  const related = allPosts
    .filter((p: { slug: string; author: string }) => p.slug !== post.slug && p.author === post.author)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 min-h-screen">
        <div className="relative h-64 md:h-96 w-full">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <Link href={`/${locale}/blogs`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 -mt-2">
            <ArrowLeft size={15} />{t('back')}
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
            ))}
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-5 text-balance">{post.title}</h1>

          <div className="flex items-center gap-5 pb-8 border-b border-border mb-10 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />{post.readTime}
            </span>
          </div>

          <div className="text-base text-muted-foreground leading-relaxed space-y-5 mb-16">
            <p>{post.excerpt}</p>
            <p>{post.content}</p>
          </div>

          {related.length > 0 && (
            <div className="border-t border-border pt-10">
              <h2 className="font-serif font-bold text-2xl text-foreground mb-6">{t('moreBy')} {post.author}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p: { slug: string; title: string; imageUrl: string; readTime: string }) => (
                  <Link key={p.slug} href={`/${locale}/blog/${p.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all">
                    <div className="relative aspect-video">
                      <Image src={p.imageUrl} alt={p.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{p.readTime}</p>
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
