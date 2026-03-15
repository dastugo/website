import { client } from '@/lib/sanity/client'
import { allProjectSlugsQuery, allBlogSlugsQuery } from '@/lib/sanity/queries'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://dastugo.com'
const LOCALES = ['tr', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, blogSlugs]: [{ slug: string }[], { slug: string }[]] = await Promise.all([
    client.fetch(allProjectSlugsQuery),
    client.fetch(allBlogSlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}`])),
      },
    },
    {
      url: `${BASE_URL}/${locale}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/projects`])),
      },
    },
    {
      url: `${BASE_URL}/${locale}/blogs`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/blogs`])),
      },
    },
    {
      url: `${BASE_URL}/${locale}/gallery`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/gallery`])),
      },
    },
  ])

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.flatMap(({ slug }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/project/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/project/${slug}`])),
      },
    }))
  )

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.flatMap(({ slug }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])),
      },
    }))
  )

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
