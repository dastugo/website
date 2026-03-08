import { Project, BlogPost, GalleryImage, TeamMember } from './types'

export const teamMembers: TeamMember[] = [
  {
    name: 'Serap Ogut',
    role: 'AI Engineer',
    location: 'Dallas, Texas',
    education: 'SMU — Computer Science & Data Science',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7820.JPG-mnIv7Ik4CB5OUtSrx97VcAIaziV941.jpeg',
    websiteUrl: 'https://oykuserap.github.io/',
    bio: 'AI Engineer at Toyota Financial Services with expertise in machine learning, AI automation, and data-driven solutions.'
  },
  {
    name: 'Dogan Ogut',
    role: 'Full-Stack Developer',
    location: 'Arlington, Texas',
    education: 'University of Texas at Arlington — Computer Science',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dogito-kIHMvngKXncVB4oxIvon3yHIT6EPqP.png',
    websiteUrl: 'https://ogutdgn.com',
    bio: 'Sophomore Computer Science student specializing in full-stack web development, mobile applications, and modern web technologies.'
  }
]

export const projects: Project[] = [
  {
    slug: 'ai-powered-customer-service-chatbot',
    title: 'AI-Powered Customer Service Chatbot',
    description: 'Intelligent conversational AI system with natural language understanding for enterprise customer support.',
    category: 'AI & Automation',
    tags: ['AI', 'NLP', 'Chatbot', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    featured: true,
    date: '2024-02',
    githubUrl: 'https://github.com',
    content: 'Developed an advanced AI chatbot using natural language processing to handle customer inquiries with 95% accuracy. Integrated with multiple platforms and reduced support ticket volume by 40%.'
  },
  {
    slug: 'supply-chain-automation-platform',
    title: 'Supply Chain Automation Platform',
    description: 'End-to-end automation system for inventory management and predictive analytics.',
    category: 'Full-Stack Development',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    featured: true,
    date: '2024-01',
    liveUrl: 'https://example.com',
    content: 'Built a comprehensive supply chain platform with real-time tracking, automated reordering, and AI-powered demand forecasting.'
  },
  {
    slug: 'mobile-fitness-tracking-app',
    title: 'Mobile Fitness Tracking App',
    description: 'Cross-platform mobile application for personalized workout plans and progress tracking.',
    category: 'Mobile Development',
    tags: ['React Native', 'Firebase', 'ML', 'Mobile'],
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    featured: true,
    date: '2023-12',
    content: 'Created a mobile fitness app with AI-powered workout recommendations, progress tracking, and social features.'
  },
  {
    slug: 'company-task-automation-agent',
    title: 'Company Task Automation Agent',
    description: 'Custom AI agent that automates repetitive business tasks and workflows.',
    category: 'AI & Automation',
    tags: ['AI', 'Automation', 'Python', 'APIs'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    featured: false,
    date: '2023-11',
    content: 'Developed intelligent automation agents that handle routine tasks, schedule management, and data processing.'
  },
  {
    slug: 'real-time-analytics-dashboard',
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard for visualizing business metrics and KPIs with real-time data updates.',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'WebSocket'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    featured: false,
    date: '2023-10',
    content: 'Built a sophisticated analytics platform with real-time data visualization and customizable reporting.'
  },
  {
    slug: 'e-commerce-recommendation-engine',
    title: 'E-Commerce Recommendation Engine',
    description: 'Machine learning system that personalizes product recommendations based on user behavior.',
    category: 'AI & Automation',
    tags: ['Machine Learning', 'Python', 'TensorFlow', 'API'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    featured: false,
    date: '2023-09',
    content: 'Implemented collaborative filtering and deep learning models to boost conversion rates by 35%.'
  }
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai-in-enterprise',
    title: 'The Future of AI in Enterprise Software',
    excerpt: 'Exploring how artificial intelligence is transforming business operations and what companies need to prepare for.',
    author: 'Serap Ogut',
    date: '2024-02-15',
    readTime: '8 min read',
    tags: ['AI', 'Enterprise', 'Technology'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    featured: true,
    content: 'Artificial intelligence is rapidly reshaping how enterprises operate...'
  },
  {
    slug: 'building-scalable-web-applications',
    title: 'Building Scalable Web Applications in 2024',
    excerpt: 'Best practices and modern approaches to creating web applications that can handle millions of users.',
    author: 'Dogan Ogut',
    date: '2024-02-10',
    readTime: '6 min read',
    tags: ['Web Development', 'Architecture', 'Best Practices'],
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
    featured: true,
    content: 'Scalability is a crucial consideration when building modern web applications...'
  },
  {
    slug: 'ai-automation-small-business',
    title: 'AI Automation for Small Businesses',
    excerpt: 'How small and medium-sized businesses can leverage AI to compete with larger enterprises.',
    author: 'Serap Ogut',
    date: '2024-01-28',
    readTime: '5 min read',
    tags: ['AI', 'Automation', 'Business'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    featured: true,
    content: 'AI is no longer just for big tech companies...'
  },
  {
    slug: 'mobile-app-development-trends',
    title: 'Mobile App Development Trends for 2024',
    excerpt: 'The latest technologies and frameworks shaping the future of mobile development.',
    author: 'Dogan Ogut',
    date: '2024-01-20',
    readTime: '7 min read',
    tags: ['Mobile', 'Development', 'Trends'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    featured: false,
    content: 'Mobile development is evolving faster than ever...'
  },
  {
    slug: 'chatbot-best-practices',
    title: 'Chatbot Design: Best Practices',
    excerpt: 'Creating conversational interfaces that users actually want to interact with.',
    author: 'Serap Ogut',
    date: '2024-01-15',
    readTime: '6 min read',
    tags: ['Chatbot', 'UX', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop',
    featured: false,
    content: 'Chatbot design requires balancing user expectations with technical capabilities...'
  }
]

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7709-S40oxledAJXXuJesQHWd1Jo3JCPa7Q.jpg',
    alt: 'Serap and Dogan Ogut - Street photo',
    caption: 'Building solutions together'
  },
  {
    id: '2',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1503.JPG-nqcxRt1yrrjwpQ9qcsJDBeFWvVcBIK.jpeg',
    alt: 'Serap and Dogan as teenagers',
    caption: 'The journey began'
  },
  {
    id: '3',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-02%20at%208.58.39%E2%80%AFPM-2wsUpflKEDJQS5itCYKpOMmuC50Eew.png',
    alt: 'Childhood memories',
    caption: 'From arguments to algorithms'
  },
  {
    id: '4',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2023-01-15-15-25-20-Ka1jEg97oMOD5PzlBll5TTzykJCL2L.jpg',
    alt: 'Serap as a child with baby Dogan',
    caption: 'The beginning of our story'
  }
]
