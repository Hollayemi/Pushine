'use client'
import SessionProvider from '@/app/components/providers/sessionProvider'
import { Suspense } from 'react'

export default function BlogLayout({ children }) {
    return (
        <SessionProvider>
             <Suspense fallback={<div>Loading...</div>}>
            {children}
            </Suspense>
        </SessionProvider>
    )
}