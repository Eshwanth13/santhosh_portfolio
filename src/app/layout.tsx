import type { Metadata } from 'next';
import { Orbitron, Rajdhani, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lks.dev'),
  title: 'Lukka Koushik Santhosh | Game Developer Portfolio',
  description:
    'AAA Game Developer & Technical Artist. Crafting worlds, writing systems, shipping games. Specializing in Unreal Engine 5, Unity, and C++.',
  keywords: [
    'game developer',
    'Unity',
    'Unreal Engine',
    'C++',
    'C#',
    'shaders',
    'technical artist',
    'game portfolio',
  ],
  openGraph: {
    title: 'Lukka Koushik Santhosh | Game Developer Portfolio',
    description: 'Crafting worlds. Writing systems. Shipping games.',
    url: 'https://lks.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@LKSanthosh',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
