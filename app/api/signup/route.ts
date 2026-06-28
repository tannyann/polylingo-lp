import { NextResponse } from 'next/server';
import { signupSchema } from '@/lib/signup-schema';
import { getSupabase } from '@/lib/supabase';
import { sendConfirmationEmail } from '@/lib/resend';

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase が未設定です。環境変数を確認してください。' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'リクエスト形式が不正です' },
      { status: 400 },
    );
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ?? '入力内容を確認してください';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { email, mother_tongue, target_languages, message, source } =
    parsed.data;

  const userAgent = request.headers.get('user-agent') ?? undefined;

  const { error } = await supabase.from('signups').insert({
    email: email.toLowerCase().trim(),
    mother_tongue,
    target_languages,
    message: message?.trim() || null,
    source: source ?? null,
    user_agent: userAgent,
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 },
      );
    }
    console.error('Signup insert error:', error);
    return NextResponse.json(
      { error: '登録に失敗しました。しばらくしてからお試しください。' },
      { status: 500 },
    );
  }

  const emailResult = await sendConfirmationEmail({
    email: email.toLowerCase().trim(),
    motherTongue: mother_tongue,
  });

  if (!emailResult.ok) {
    console.warn('Confirmation email failed:', emailResult.error);
  }

  return NextResponse.json({ success: true, emailSent: emailResult.ok });
}
