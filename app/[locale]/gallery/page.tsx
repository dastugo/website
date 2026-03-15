import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GalleryClient from './GalleryClient'
import { client } from '@/lib/sanity/client'
import { galleryQuery } from '@/lib/sanity/queries'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ locale: string }>
}

const BASE_URL = 'https://dastugo.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('gallery')
  return {
    title: `${t('heading')} | dastugo`,
    description: t('subheading'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/gallery`,
      languages: {
        tr: `${BASE_URL}/tr/gallery`,
        en: `${BASE_URL}/en/gallery`,
      },
    },
    openGraph: {
      title: `${t('heading')} | dastugo`,
      description: t('subheading'),
      url: `${BASE_URL}/${locale}/gallery`,
      siteName: 'dastugo',
      type: 'website',
    },
  }
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('gallery')
  const raw = await client.fetch(galleryQuery(locale))

  const images = raw.map((img: { _id: string; imageUrl: string; alt: string; caption?: string }) => ({
    id: img._id,
    src: img.imageUrl,
    alt: img.alt ?? '',
    caption: img.caption,
  }))

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <GalleryClient
            images={images}
            label={t('label')}
            heading={t('heading')}
            subheading={t('subheading')}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
