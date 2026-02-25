'use client'
import SessionProvider from "../components/providers/sessionProvider"
import StoreProvider from "../components/providers/StoreProvider"

export default function RootLayout({ children }) {

   

    return (
        <div lang="en" className="bg-white text-black">
            <SessionProvider>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </SessionProvider>
        </div>
    )
}
