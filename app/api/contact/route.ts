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
      to: ['contact@dastugo.com'],
      replyTo: [email],
      subject: `New Contact: ${name}${service ? ` — ${service}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:#09090b;padding:32px 40px;">
                    <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">dastugo</p>
                    <p style="margin:6px 0 0;font-size:13px;color:#71717a;">New message from contact form</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">

                    <!-- Name + Email -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td width="48%" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px 20px;vertical-align:top;">
                          <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">From</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#09090b;">${name}</p>
                        </td>
                        <td width="4%"></td>
                        <td width="48%" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px 20px;vertical-align:top;">
                          <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Email</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#09090b;">${email}</p>
                        </td>
                      </tr>
                    </table>

                    ${service ? `
                    <div style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
                      <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Service Requested</p>
                      <p style="margin:0;font-size:15px;font-weight:600;color:#09090b;">${service}</p>
                    </div>
                    ` : ''}

                    <!-- Message -->
                    <div style="border:1px solid #e4e4e7;border-radius:10px;padding:20px 24px;">
                      <p style="margin:0 0 12px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Message</p>
                      <p style="margin:0;font-size:15px;color:#18181b;line-height:1.7;white-space:pre-wrap;">${message}</p>
                    </div>

                    <!-- Reply CTA -->
                    <div style="margin-top:28px;text-align:center;">
                      <a href="mailto:${email}" style="display:inline-block;background:#09090b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:100px;">Reply to ${name}</a>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#fafafa;border-top:1px solid #e4e4e7;padding:20px 40px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#a1a1aa;">dastugo.com · Dallas, TX — Turkey & remote worldwide</p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 503 })
  }
}
