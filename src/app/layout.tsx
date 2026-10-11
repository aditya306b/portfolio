import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/data";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CircuitTrace } from "@/components/CircuitTrace";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { getNotes } from "@/lib/notes";
import { terminalData } from "@/lib/terminal-data";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description: profile.stance,
};

// Runs before paint so the saved or system theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var a=localStorage.getItem("accent");if(a)document.documentElement.dataset.accent=a}catch(e){}})()`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const data = terminalData(await getNotes());
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grid-paper flex min-h-full flex-col">
        <CircuitTrace />
        <TerminalOverlay data={data} />
        <SiteHeader />
        <main className="flex-1 pt-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
