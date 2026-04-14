import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import Providers from './providers'
import { inter } from './fonts'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'

export const metadata: Metadata = {
    title: 'DineWise - Restaurant Ordering Platform',
    description: 'Order food easily and experience luxury dining.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen bg-background antialiased`} suppressHydrationWarning>
                <Providers>
                    <AuthProvider>
                        {children}
                        <Toaster position="bottom-right" richColors />
                    </AuthProvider>
                </Providers>
            </body>
        </html>
    )
}
