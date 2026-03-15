import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// In-memory rate limiting: IP → { count, resetAt }
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60_000

const SYSTEM_PROMPT = `You are the virtual assistant for dastugo, a digital product studio founded by Serap Ogut and Dogan Ogut. You help website visitors learn about dastugo's services, projects, and team.

dastugo specializes in:
- Web application development (Next.js, React, TypeScript)
- Mobile app development
- AI-powered tools and integrations
- UI/UX design and digital branding
- Full-stack product development

Team:
- Serap Ogut — co-founder, full-stack developer and designer
- Dogan Ogut — co-founder, full-stack developer with a focus on backend and AI

Guidelines:
- Be friendly, concise, and professional
- Answer questions about services, team, projects, and how to get in touch
- For project inquiries or detailed quotes, direct the user to the contact form on the website
- Do not make up specific pricing, timelines, or project details not mentioned here
- If you don't know something specific, say so honestly and suggest contacting the team directly
- Keep responses short — 2-4 sentences maximum
- Contact email: doganogut06@gmail.com`

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (entry) {
    if (now < entry.resetAt) {
      if (entry.count >= RATE_LIMIT) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
      }
      entry.count++
    } else {
      rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
  }

  // Parse and validate body
  let messages: { role: string; content: string }[]
  try {
    const body = await req.json()
    messages = body.messages
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }

  if (messages.length > 15) {
    return NextResponse.json({ error: 'Conversation limit reached' }, { status: 400 })
  }

  const lastMessage = messages[messages.length - 1]
  if (!lastMessage?.content || lastMessage.content.length > 500) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 300,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    })

    const message = completion.choices[0]?.message?.content ?? ''
    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 })
  }
}
