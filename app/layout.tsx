import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import Navbar from "@/components/Navbar";
import ChatbotWidget from "@/components/ChatbotWidget";
import VoiceAssistant from "@/components/VoiceAssistant";
import Footer from "@/components/Footer";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "RIHC — Rural Internet Help Center | ग्रामीण इंटरनेट सहायता केंद्र",
  description: "Bridging the digital divide in rural India. Access government services, find jobs, scholarships, and digital assistance in your language.",
  keywords: "rural India, government services, digital India, RIHC, MeeSeva, CSC, workers, farmers, scholarships",
  openGraph: {
    title: "Rural Internet Help Center (RIHC)",
    description: "Empowering rural India with digital services, jobs, and government access.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0F4C81" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <DatabaseProvider>
              <AuthProvider>
                <Navbar />
                <main className="flex-1 mt-[72px]">
                  {children}
                </main>
                <Footer />
                <ChatbotWidget />
                <VoiceAssistant />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--card)',
                      color: 'var(--text)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                    },
                  }}
                />
              </AuthProvider>
            </DatabaseProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
