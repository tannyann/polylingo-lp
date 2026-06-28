import { Resend } from 'resend';
import ConfirmationEmail from '@/emails/ConfirmationEmail';

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (resend) return resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend = new Resend(apiKey);
  return resend;
}

type SendConfirmationParams = {
  email: string;
  motherTongue: string;
};

export async function sendConfirmationEmail({
  email,
  motherTongue,
}: SendConfirmationParams): Promise<{ ok: boolean; error?: string }> {
  const client = getResend();
  if (!client) {
    return { ok: false, error: 'Resend が未設定です' };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'PolyLingo <onboarding@resend.dev>';

  const { error } = await client.emails.send({
    from,
    to: email,
    subject: '[PolyLingo] 事前登録ありがとうございます',
    react: ConfirmationEmail({ email, motherTongue }),
  });

  if (error) {
    console.error('Resend error:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
