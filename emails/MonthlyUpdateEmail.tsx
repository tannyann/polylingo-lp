import { Heading, Link, Section, Text } from '@react-email/components';
import { blue, EmailLayout } from './components/EmailLayout';

type MonthlyUpdateEmailProps = {
  month: string;
  highlights: string[];
};

export default function MonthlyUpdateEmail({
  month,
  highlights,
}: MonthlyUpdateEmailProps) {
  return (
    <EmailLayout preview={`PolyLingo ${month} の開発進捗`}>
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
          {month} の開発進捗
        </Heading>

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          いつも PolyLingo を応援いただきありがとうございます。
          {month} の開発進捗をお届けします。
        </Text>

        {highlights.map((item) => (
          <Text
            key={item}
            style={{
              color: '#1A1A2E',
              fontSize: '15px',
              lineHeight: '26px',
              paddingLeft: '8px',
              borderLeft: `3px solid ${blue}`,
              margin: '12px 0',
            }}
          >
            {item}
          </Text>
        ))}

        <Text style={{ color: '#1A1A2E', fontSize: '15px', lineHeight: '26px' }}>
          ベータテスター募集や新機能の先行体験は、事前登録者の方から優先的に
          ご案内します。
        </Text>

        <Link
          href="https://polylingo.app"
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
          LP を見る
        </Link>
      </Section>
    </EmailLayout>
  );
}
