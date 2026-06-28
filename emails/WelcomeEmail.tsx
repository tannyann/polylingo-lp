import { Heading, Section, Text } from '@react-email/components';
import { EmailLayout } from './components/EmailLayout';

type WelcomeEmailProps = {
  name?: string;
};

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  const greeting = name ? `${name} さん` : 'あなた';

  return (
    <EmailLayout preview="なぜ私は PolyLingo を作るのか">
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
          なぜ私はこのアプリを作るのか
        </Heading>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '28px' }}>
          {greeting}、こんにちは。PolyLingo 創業者の koyo です。
        </Text>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '28px' }}>
          Duolingo で複数言語のストリークを3,500日超え続けながら、私は何度も
          「3年やっても話せない」壁にぶつかりました。単語は知っているのに、文が
          組み立てられない。8つのアプリを行き来して、頭の中で比較する日々。
        </Text>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '28px' }}>
          日常会話の8〜9割は、約30の構文パターンで構成される——この洞察が
          PolyLingo の出発点です。1つの構文を軸に8言語を横断比較する体験は、
          世界にまだありません。
        </Text>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '28px' }}>
          Duolingo の次のステージに進みたい、本気の学習者のために。
          一緒にこの旅を続けてください。
        </Text>

        <Text style={{ color: '#6B7280', fontSize: '14px', lineHeight: '24px' }}>
          — koyo, PolyLingo Founder
        </Text>
      </Section>
    </EmailLayout>
  );
}
