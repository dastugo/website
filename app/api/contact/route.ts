import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: { name: string; email: string; service: string; message: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, service, message } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email?.trim() || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'dastugo Contact <onboarding@resend.dev>',
      to: 'doganogut06@gmail.com',
      replyTo: email,
      subject: `New Contact: ${name}${service ? ` — ${service}` : ''}`,
      html: `
        <h2>New message from dastugo contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 503 })
  }
}
