import Link from 'next/link';
import type { PageCopy } from '@/lib/copy';

type FooterProps = {
  footer: PageCopy['footer'];
};

function FooterLink({ href, label }: { href: string; label: string }) {
  const className =
    'inline-flex min-h-[44px] items-center text-sm text-text-muted transition hover:text-navy focus-visible:ring-navy';
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="border-t border-border bg-white px-6 py-12 md:px-8">
      <div className="container-content">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xl font-bold text-navy">PolyLingo</p>
            <p className="mt-1 text-sm text-text-muted">{footer.tagline}</p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted md:text-left">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
