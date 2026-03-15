import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import ProjectsSlider from '@/components/sections/ProjectsSlider'
import BlogsSlider from '@/components/sections/BlogsSlider'
import GalleryPreview from '@/components/sections/GalleryPreview'
import Contact from '@/components/sections/Contact'
import { client } from '@/lib/sanity/client'
import {
  allProjectsQuery, allBlogPostsQuery, galleryQuery,
  servicesQuery, teamQuery, storyImagesQuery,
} from '@/lib/sanity/queries'
import type { Metadata } from 'next'

const BASE_URL = 'https://dastugo.com'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEN = locale === 'en'
  const title = isEN ? 'dastugo — Digital Product Studio' : 'dastugo — Dijital Ürün Stüdyosu'
  const description = isEN
    ? 'We design and develop digital products — web apps, mobile experiences, and AI-powered tools.'
    : 'Dijital ürünler tasarlıyor ve geliştiriyoruz — web uygulamaları, mobil deneyimler ve yapay zeka araçları.'
  return {
    title, description,
    alternates: { canonical: `${BASE_URL}/${locale}`, languages: { tr: `${BASE_URL}/tr`, en: `${BASE_URL}/en` } },
    openGraph: { title, description, url: `${BASE_URL}/${locale}`, siteName: 'dastugo', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  const [projects, blogPosts, galleryImages, services, teamMembers, storyImages] = await Promise.all([
    client.fetch(allProjectsQuery(locale)),
    client.fetch(allBlogPostsQuery(locale)),
    client.fetch(galleryQuery(locale)),
    client.fetch(servicesQuery(locale)),
    client.fetch(teamQuery(locale)),
    client.fetch(storyImagesQuery(locale)),
  ])

  const normalizedGallery = galleryImages.map((img: { _id: string; imageUrl: string; alt: string; caption?: string }) => ({
    id: img._id, src: img.imageUrl, alt: img.alt ?? '', caption: img.caption,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'dastugo',
    url: BASE_URL,
    sameAs: ['https://github.com/dastugo', 'https://www.linkedin.com/company/81340574'],
    founders: [{ '@type': 'Person', name: 'Serap Ogut' }, { '@type': 'Person', name: 'Dogan Ogut' }],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <Services services={services} />
        <About teamMembers={teamMembers} storyImages={storyImages} />
        <ProjectsSlider projects={projects} />
        <BlogsSlider blogPosts={blogPosts} />
        <GalleryPreview galleryImages={normalizedGallery} />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
