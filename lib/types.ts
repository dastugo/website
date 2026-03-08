export interface Project {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  imageUrl: string
  featured: boolean
  date: string
  githubUrl?: string
  liveUrl?: string
  content?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: 'Serap Ogut' | 'Dogan Ogut'
  date: string
  readTime: string
  tags: string[]
  imageUrl: string
  featured: boolean
  content?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface TeamMember {
  name: string
  role: string
  location: string
  education: string
  imageUrl: string
  websiteUrl: string
  bio: string
}
