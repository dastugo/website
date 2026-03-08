import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
          Page Not Found
        </p>
        <h1 className="font-serif font-bold text-[clamp(6rem,20vw,14rem)] leading-none tracking-tight text-foreground mb-6 select-none">
          404
        </h1>
        <p className="text-muted-foreground max-w-sm leading-relaxed mb-10 text-balance">
          Looks like this page took a wrong turn. It happens — even to us.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </Link>
      </main>
      <Footer />
    </>
  )
}
