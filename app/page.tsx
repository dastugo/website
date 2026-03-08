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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <ProjectsSlider />
        <BlogsSlider />
        <GalleryPreview />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
