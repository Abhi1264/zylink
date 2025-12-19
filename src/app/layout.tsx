import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/lib/analytics/posthog";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';

const googleSans = Google_Sans({ variable: "--font-sans" });
const googleSansCode = Google_Sans_Code({ variable: "--font-code" });

export const metadata: Metadata = {
  title: "Solo Link - Your Link in Bio",
  description: "Create your personalized link in bio page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={googleSans.variable} suppressHydrationWarning>
      <body className={`${googleSans.variable} ${googleSansCode.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            {children}
            <Analytics />
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
