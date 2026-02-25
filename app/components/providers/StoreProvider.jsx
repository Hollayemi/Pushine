'use client'
import { store } from '@/app/redux/store'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({ children }) {
     const { data: session, status } = useSession()
      useEffect(() => {
             if (process.env.ADMIN_EMAIL != session?.user?.email) {
                 window.location.href = '/auth';
             }
         }, [session]);
    return <Provider store={store}>
        {status === 'loading' ? <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div> : children}
        </Provider>
}
