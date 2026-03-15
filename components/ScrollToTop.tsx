'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e: Event) => setSidebarOpen((e as CustomEvent).detail.open)
    window.addEventListener('sidebarchange', handler)
    return () => window.removeEventListener('sidebarchange', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:opacity-90 hover:scale-105',
        visible && !sidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}
