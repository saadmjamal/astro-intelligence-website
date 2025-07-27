import type { Metadata } from "next";
import "./globals.css";
// import { ClerkProvider } from '@clerk/nextjs'; // TODO: Enable when Clerk keys are available
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Astro Intelligence Inc - Empowering Enterprises with Ethical AI",
  description: "Leading provider of AI-enhanced orchestration, DevOps, and cloud solutions. We build intelligent, scalable, and ethical technology solutions for modern enterprises.",
  keywords: "AI, DevOps, Cloud, Orchestration, Platform Engineering, Ethical AI",
  authors: [{ name: "Astro Intelligence Inc" }],
  openGraph: {
    title: "Astro Intelligence Inc",
    description: "Empowering Enterprises with Ethical AI and Cloud Innovation",
    url: "https://astrointelligence.com",
    siteName: "Astro Intelligence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astro Intelligence Inc",
    description: "Empowering Enterprises with Ethical AI and Cloud Innovation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-navy text-offwhite font-body min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
