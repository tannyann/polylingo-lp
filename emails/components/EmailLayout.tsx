import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const navy = '#1F3864';
const blue = '#2E75B6';
const muted = '#6B7280';

type EmailLayoutProps = {
  preview: string;
  children: React.ReactNode;
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="ja">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: '#F8FAFD', fontFamily: 'sans-serif' }}>
        <Container
          style={{
            margin: '0 auto',
            padding: '32px 24px',
            maxWidth: '560px',
          }}
        >
          <Section
            style={{
              backgroundColor: navy,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <Heading
              style={{
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: 800,
                margin: 0,
              }}
            >
              PolyLingo
            </Heading>
            <Text style={{ color: '#DEEBF7', fontSize: '14px', margin: '8px 0 0' }}>
              30構文 × 8言語
            </Text>
          </Section>
          {children}
          <Hr style={{ borderColor: '#E5E9F0', margin: '32px 0' }} />
          <Text style={{ color: muted, fontSize: '12px', lineHeight: '20px' }}>
            © 2026 PolyLingo. All rights reserved.
            <br />
            <Link href="https://polylingo.app" style={{ color: blue }}>
              polylingo.app
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export { navy, blue, muted };
