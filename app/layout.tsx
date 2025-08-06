import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'First Aluminum Technology - B2B Food Packaging Solutions',
  description: 'Leading supplier of disposable food containers, chopsticks, and aluminum foil packaging for B2B wholesale.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}