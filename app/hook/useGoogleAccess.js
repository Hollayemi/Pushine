import { useState, useCallback, useEffect } from 'react'
import {
    useGetGoogleAuthUrlQuery,
    useExchangeOAuthCodeMutation,
    useCheckAllNetworkAccessMutation,
    useCheckSingleNetworkAccessMutation,
    useGetUserAccessInfoQuery,
    useRefreshGoogleTokenMutation,
} from '../redux/states/googleAccessApi'

// Token storage utilities (use secure storage in production)
const TokenStorage = {
    set: (tokens) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('google_tokens', JSON.stringify(tokens))
        }
    },
    get: () => {
        if (typeof window !== 'undefined') {
            const tokens = sessionStorage.getItem('google_tokens')
            return tokens ? JSON.parse(tokens) : null
        }
        return null
    },
    clear: () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('google_tokens')
        }
    }
}

export const useGoogleAccess = () => {
    const [tokens, setTokens] = useState(() => TokenStorage.get())
    const [toast, setToast] = useState({ show: false, message: '', type: '' })
    const [isAuthenticated, setIsAuthenticated] = useState(!!tokens?.accessToken)

    // Queries and Mutations
    const { data: authUrl, isLoading: authUrlLoading } = useGetGoogleAuthUrlQuery()

    const [exchangeCode, { isLoading: exchangeLoading }] = useExchangeOAuthCodeMutation()
    const [checkAllAccess, { isLoading: checkAllLoading }] = useCheckAllNetworkAccessMutation()
    const [checkSingleAccess, { isLoading: checkSingleLoading }] = useCheckSingleNetworkAccessMutation()
    const [refreshToken, { isLoading: refreshLoading }] = useRefreshGoogleTokenMutation()

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        refetch: refetchUserInfo,
    } = useGetUserAccessInfoQuery(
        {
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken
        },
        {
            skip: !tokens?.accessToken,
            pollingInterval: 600000, // Poll every 10 minutes
        }
    )

    // Toast helper
    const showToast = useCallback((message, type = 'success') => {
        setToast({ show: true, message, type })
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000)
    }, [])

    // Handle OAuth authentication
    const handleAuthentication = useCallback(async (code) => {
        try {
            const newTokens = await exchangeCode(code).unwrap()
            setTokens(newTokens)
            TokenStorage.set(newTokens)
            setIsAuthenticated(true)
            showToast('Successfully authenticated with Google!')
            return { success: true, tokens: newTokens }
        } catch (error) {
            const message = error?.data?.message || 'Authentication failed'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [exchangeCode, showToast])

    // Handle logout
    const handleLogout = useCallback(() => {
        setTokens(null)
        TokenStorage.clear()
        setIsAuthenticated(false)
        showToast('Logged out successfully')
    }, [showToast])

    // Check all network access
    const handleCheckAllAccess = useCallback(async () => {
        if (!tokens?.accessToken) {
            showToast('Please authenticate first', 'error')
            return { success: false, error: 'Not authenticated' }
        }

        try {
            const result = await checkAllAccess({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            }).unwrap()

            const { summary } = result
            showToast(
                `Access check complete: ${summary.connected} connected, ${summary.disconnected} disconnected`
            )
            console.log(result)
            return { success: true, result }

        } catch (error) {
            const message = error?.data?.message || 'Access check failed'
            showToast(message, 'error')

            // Handle token expiration
            if (error?.status === 401 && tokens?.refreshToken) {
                await handleRefreshToken()
            }

            return { success: false, error: message }
        }
    }, [tokens, checkAllAccess, showToast])

    // Check single network access
    const handleCheckSingleAccess = useCallback(async (networkId) => {
        if (!tokens?.accessToken) {
            showToast('Please authenticate first', 'error')
            return { success: false, error: 'Not authenticated' }
        }

        try {
            const result = await checkSingleAccess({
                networkId,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            }).unwrap()

            const status = result.hasAccess ? 'connected' : 'disconnected'
            showToast(`Network ${networkId} is ${status}`)
            return { success: true, result }
        } catch (error) {
            const message = error?.data?.message || 'Single access check failed'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [tokens, checkSingleAccess, showToast])

    // Refresh access token
    const handleRefreshToken = useCallback(async () => {
        if (!tokens?.refreshToken) {
            showToast('No refresh token available', 'error')
            handleLogout()
            return { success: false, error: 'No refresh token' }
        }

        try {
            const newTokens = await refreshToken(tokens.refreshToken).unwrap()
            const updatedTokens = { ...tokens, ...newTokens }
            setTokens(updatedTokens)
            TokenStorage.set(updatedTokens)
            showToast('Token refreshed successfully')
            return { success: true, tokens: updatedTokens }
        } catch (error) {
            const message = error?.data?.message || 'Token refresh failed'
            showToast(message, 'error')
            handleLogout() // Force re-authentication
            return { success: false, error: message }
        }
    }, [tokens, refreshToken, showToast, handleLogout])

    // Auto-refresh token before expiry
    useEffect(() => {
        if (tokens?.expiryDate) {
            const expiryTime = new Date(tokens.expiryDate).getTime()
            const currentTime = new Date().getTime()
            const timeUntilExpiry = expiryTime - currentTime

            // Refresh 5 minutes before expiry
            if (timeUntilExpiry > 0 && timeUntilExpiry < 300000) {
                handleRefreshToken()
            }

            // Set up auto-refresh
            if (timeUntilExpiry > 300000) {
                const refreshTimer = setTimeout(() => {
                    handleRefreshToken()
                }, timeUntilExpiry - 300000)

                return () => clearTimeout(refreshTimer)
            }
        }
    }, [tokens, handleRefreshToken])

    // Schedule automatic access checks
    const scheduleAccessCheck = useCallback((intervalMinutes = 30) => {
        if (!isAuthenticated) return null

        const interval = setInterval(() => {
            handleCheckAllAccess()
        }, intervalMinutes * 60 * 1000)

        return () => clearInterval(interval)
    }, [isAuthenticated, handleCheckAllAccess])

    return {
        // Authentication state
        isAuthenticated,
        tokens,
        authUrl,
        userInfo,

        // Loading states
        loading: {
            authUrl: authUrlLoading,
            exchange: exchangeLoading,
            checkAll: checkAllLoading,
            checkSingle: checkSingleLoading,
            userInfo: userInfoLoading,
            refresh: refreshLoading,
        },

        // Actions
        actions: {
            authenticate: handleAuthentication,
            logout: handleLogout,
            checkAllAccess: handleCheckAllAccess,
            checkSingleAccess: handleCheckSingleAccess,
            refreshToken: handleRefreshToken,
            scheduleAccessCheck,
            refetchUserInfo,
        },

        // UI state
        toast,
        setToast,
    }
}