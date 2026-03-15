import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/tr/projects', permanent: true },
      { source: '/project/:slug', destination: '/tr/project/:slug', permanent: true },
      { source: '/blogs', destination: '/tr/blogs', permanent: true },
      { source: '/blog/:slug', destination: '/tr/blog/:slug', permanent: true },
      { source: '/gallery', destination: '/tr/gallery', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
