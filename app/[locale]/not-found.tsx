import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          {t('label')}
        </p>
        <h1 className="font-serif font-bold text-[clamp(6rem,20vw,14rem)] leading-none tracking-tight text-foreground mb-6 select-none">
          {t('heading')}
        </h1>
        <p className="text-muted-foreground max-w-sm leading-relaxed mb-10 text-balance">
          {t('body')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} />
          {t('back')}
        </Link>
      </main>
      <Footer />
    </>
  )
}
