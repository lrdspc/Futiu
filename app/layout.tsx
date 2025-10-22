import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { SyncStatus } from "@/components/sync-status"
import { NotificationPrompt } from "@/components/notification-prompt"
import { ServiceWorkerRegister } from "./sw-register"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Personal & Aluno - Fitness Training Platform",
    template: "%s | Personal & Aluno",
  },
  description: "Plataforma completa para personal trainers e alunos com treinos personalizados, evolução em tempo real e comunicação direta",
  applicationName: "Personal & Aluno",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  keywords: ["fitness", "treino", "personal trainer", "academia", "workout", "saúde"],
  authors: [{ name: "Personal & Aluno" }],
  creator: "Personal & Aluno",
  publisher: "Personal & Aluno",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Personal & Aluno",
    startupImage: [
      {
        url: "/icon-512.jpg",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://personal-aluno.app",
    siteName: "Personal & Aluno",
    title: "Personal & Aluno - Fitness Training Platform",
    description: "Plataforma completa para personal trainers e alunos",
    images: [
      {
        url: "/icon-512.jpg",
        width: 512,
        height: 512,
        alt: "Personal & Aluno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal & Aluno",
    description: "Plataforma completa para personal trainers e alunos",
    images: ["/icon-512.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
      { url: "/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
    apple: [
      { url: "/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22d3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

/**
 * The root layout for the application.
 *
 * This component sets up the basic HTML structure, including the `html` and `body` tags,
 * and applies the primary font. It also includes the `Toaster` for displaying notifications
 * and the `Analytics` component for tracking.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Personal & Aluno" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ServiceWorkerRegister />
        {children}
        <Toaster />
        <SyncStatus />
        <NotificationPrompt />
        <PWAInstallPrompt />
        <Analytics />
      </body>
    </html>
  )
}
