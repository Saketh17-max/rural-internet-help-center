import type { Metadata } from "next";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a6b3a" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <DatabaseProvider>
              <AuthProvider>
                <Navbar />
                <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
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
                      borderRadius: '12px',
                      fontFamily: 'Noto Sans, sans-serif',
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
