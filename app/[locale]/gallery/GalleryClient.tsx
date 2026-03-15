'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/lib/types'

interface Props {
  images: GalleryImage[]
  label: string
  heading: string
  subheading: string
}

export default function GalleryClient({ images, label, heading, subheading }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))
  const nextImage = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))

  return (
    <>
      <div className="pt-8 mb-14 text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{label}</p>
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance mb-4">{heading}</h1>
        <p className="text-muted-foreground max-w-md mx-auto">{subheading}</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, i) => (
          <div key={image.id} className="group relative break-inside-avoid rounded-2xl overflow-hidden border border-border cursor-pointer"
            onClick={() => setLightboxIndex(i)}>
            <Image src={image.src} alt={image.alt} width={800} height={600}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-foreground/60 to-transparent px-4 py-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}>
          <button className="absolute top-5 right-5 p-2.5 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-white"
            onClick={closeLightbox} aria-label="Close lightbox">
            <X size={20} />
          </button>
          <button className="absolute left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-white"
            onClick={(e) => { e.stopPropagation(); prevImage() }} aria-label="Previous image">
            <ChevronLeft size={20} />
          </button>
          <button className="absolute right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-white"
            onClick={(e) => { e.stopPropagation(); nextImage() }} aria-label="Next image">
            <ChevronRight size={20} />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full mx-10" onClick={(e) => e.stopPropagation()}>
            <Image src={images[lightboxIndex].src} alt={images[lightboxIndex].alt}
              width={1200} height={900} className="object-contain rounded-xl max-h-[80vh] w-auto mx-auto"
              sizes="(max-width: 768px) 100vw, 80vw" />
            {images[lightboxIndex].caption && (
              <p className="text-center text-sm text-white/80 mt-4">{images[lightboxIndex].caption}</p>
            )}
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((img, i) => (
              <button key={img.id} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                className={cn('relative w-10 h-10 rounded-md overflow-hidden border-2 transition-all',
                  i === lightboxIndex ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-90')}
                aria-label={`Go to image ${i + 1}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="40px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
