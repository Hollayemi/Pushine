"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLogin() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to unified auth page with dashboard callback
        router.replace('/auth?callbackUrl=/dashboard')
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <p className="text-white">Redirecting to login...</p>
            </div>
        </div>
    )
}