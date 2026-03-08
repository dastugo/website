import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { blogPosts } from '@/lib/data'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Dastugo Blog`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.author === post.author).slice(0, 3)

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 min-h-screen">
        {/* Hero */}
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          {/* Back */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 -mt-2"
          >
            <ArrowLeft size={15} />
            All Posts
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-5 text-balance">
            {post.title}
          </h1>

          {/* Author / Meta */}
          <div className="flex items-center gap-5 pb-8 border-b border-border mb-10 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>

          {/* Content */}
          <div className="text-base text-muted-foreground leading-relaxed space-y-5 mb-16">
            <p>{post.excerpt}</p>
            <p>{post.content}</p>
            <p>
              This is placeholder content. Connect your CMS or markdown files to populate full blog post content here. The architecture is ready — just plug in your data source.
            </p>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="border-t border-border pt-10">
              <h2 className="font-serif font-bold text-2xl text-foreground mb-6">More by {post.author}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{p.readTime}</p>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h3>
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
