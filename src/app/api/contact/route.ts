import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

// Simple in-memory rate limiter (MVP — use Upstash for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    // Parse & validate body
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Send email via Resend (if API key configured)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (apiKey && toEmail) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: 'noreply@alexryker.dev',
        to: toEmail,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: monospace; background: #020617; color: #e2e8f0; padding: 32px; border-radius: 8px;">
            <h2 style="color: #00f0ff;">New Contact from Portfolio</h2>
            <table>
              <tr><td style="color: #64748b; padding-right: 16px;">From:</td><td>${name} &lt;${email}&gt;</td></tr>
              <tr><td style="color: #64748b; padding-right: 16px;">Subject:</td><td>${subject}</td></tr>
            </table>
            <hr style="border-color: rgba(0,240,255,0.2); margin: 16px 0;" />
            <p style="line-height: 1.8; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact API] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
