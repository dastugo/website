import { groq } from 'next-sanity'

// ─── Social ───────────────────────────────────────────────────────────────────

export const socialQuery = groq`
  *[_type == "social"][0] {
    email,
    githubUrl,
    linkedinUrl
  }
`

// ─── Projects ────────────────────────────────────────────────────────────────

export const allProjectsQuery = (locale: string) => groq`
  *[_type == "project"] | order(date desc) {
    "slug": slug.current,
    "title": title_${locale},
    "description": description_${locale},
    category, tags, featured, date, githubUrl, liveUrl,
    "imageUrl": image.asset->url
  }
`

export const projectBySlugQuery = (locale: string) => groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    "title": title_${locale},
    "description": description_${locale},
    "content": content_${locale},
    category, tags, featured, date, githubUrl, liveUrl,
    "imageUrl": image.asset->url
  }
`

export const allProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const allBlogPostsQuery = (locale: string) => groq`
  *[_type == "blogPost"] | order(date desc) {
    "slug": slug.current,
    "title": title_${locale},
    "excerpt": excerpt_${locale},
    author, date, readTime, tags, featured,
    "imageUrl": image.asset->url
  }
`

export const blogBySlugQuery = (locale: string) => groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "slug": slug.current,
    "title": title_${locale},
    "excerpt": excerpt_${locale},
    "content": content_${locale},
    author, date, readTime, tags, featured,
    "imageUrl": image.asset->url
  }
`

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`

// ─── Services ─────────────────────────────────────────────────────────────────

export const servicesQuery = (locale: string) => groq`
  *[_type == "service"] | order(order asc) {
    "title": title_${locale},
    "description": description_${locale},
    icon
  }
`

// ─── Team Members ─────────────────────────────────────────────────────────────

export const teamQuery = (locale: string) => groq`
  *[_type == "teamMember"] | order(order asc) {
    name,
    "role": role_${locale},
    "bio": bio_${locale},
    location, education, websiteUrl, linkedinUrl, githubUrl,
    "imageUrl": image.asset->url
  }
`

// ─── Image Pool ───────────────────────────────────────────────────────────────

export const storyImagesQuery = (locale: string) => groq`
  *[_type == "mediaAsset" && showInStory == true] | order(order asc) {
    "url": image.asset->url,
    "alt": alt_${locale}
  }
`

export const galleryQuery = (locale: string) => groq`
  *[_type == "mediaAsset" && showInGallery == true] | order(order asc) {
    _id,
    "imageUrl": image.asset->url,
    "alt": alt_${locale},
    "caption": caption_${locale}
  }
`
