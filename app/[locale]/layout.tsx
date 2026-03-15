import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { routing } from '@/i18n/routing'
import { client } from '@/lib/sanity/client'
import { socialQuery } from '@/lib/sanity/queries'
import { SocialProvider } from '@/context/SocialContext'
import Chat from '@/components/Chat'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'dastugo',
  description: 'Two siblings building AI solutions, custom software, and automation systems between Turkey and the United States.',
  keywords: ['AI consulting', 'full-stack development', 'mobile app development', 'chatbot services', 'AI automation', 'dastugo'],
  authors: [{ name: 'dastugo' }],
  metadataBase: new URL('https://dastugo.com'),
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [messages, socialRaw] = await Promise.all([
    getMessages(),
    client.fetch(socialQuery),
  ])

  const social = {
    email: socialRaw?.email ?? 'doganogut06@gmail.com',
    githubUrl: socialRaw?.githubUrl ?? 'https://github.com/dastugo',
    linkedinUrl: socialRaw?.linkedinUrl ?? 'https://www.linkedin.com/company/81340574',
  }

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SocialProvider value={social}>
            {children}
            <Chat />
            <Analytics />
          </SocialProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
