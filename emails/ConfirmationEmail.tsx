import { Heading, Link, Section, Text } from '@react-email/components';
import { blue, EmailLayout } from './components/EmailLayout';

type ConfirmationEmailProps = {
  email: string;
  motherTongue: string;
};

export default function ConfirmationEmail({
  email,
  motherTongue,
}: ConfirmationEmailProps) {
  return (
    <EmailLayout preview="PolyLingo 事前登録ありがとうございます">
      <Section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
        }}
      >
        <Heading
          style={{ color: '#1F3864', fontSize: '20px', fontWeight: 700 }}
        >
          事前登録ありがとうございます
        </Heading>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          PolyLingo への事前登録が完了しました。早期アクセス枠を確保しました。
        </Text>

        <Section
          style={{
            backgroundColor: '#DEEBF7',
            borderRadius: '8px',
            padding: '16px',
            margin: '16px 0',
          }}
        >
          <Text style={{ color: '#1A1A2E', fontSize: '14px', margin: '4px 0' }}>
            <strong>メール:</strong> {email}
          </Text>
          <Text style={{ color: '#1A1A2E', fontSize: '14px', margin: '4px 0' }}>
            <strong>母語:</strong> {motherTongue}
          </Text>
        </Section>

        <Heading
          as="h2"
          style={{ color: '#1F3864', fontSize: '16px', fontWeight: 700 }}
        >
          開発スケジュール
        </Heading>
        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          iOS 版のリリースは <strong>2026年12月</strong> を目標としています。
          事前登録の方には、開発進捗を月1回お届けします。
        </Text>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          リリース時には <strong>1ヶ月無料の Pro プラン</strong>{' '}
          をプレゼントします。
        </Text>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          開発の裏側や構文の豆知識は X (Twitter) でも発信しています。
          ぜひフォローしてください。
        </Text>

        <Link
          href="https://x.com/polylingo"
          style={{
            display: 'inline-block',
            backgroundColor: blue,
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
            marginTop: '8px',
          }}
        >
          @polylingo をフォロー
        </Link>
      </Section>
    </EmailLayout>
  );
}
