import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ variable: "--f-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const manrope = Manrope({ variable: "--f-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Wasem Khalifa | Software Developer",
  description:
    "CIS student and software developer in Damascus, building Flutter, web, and backend applications.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
  ],
  colorScheme: "dark light",
};

// Runs before paint: applies the saved/system theme and arms the intro once per session.
const bootScript = `try{var d=document.documentElement;d.dataset.theme=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");if(!sessionStorage.getItem("intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro=""}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${manrope.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
