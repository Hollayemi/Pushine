import { useState, useCallback } from 'react'
import {
    useGetAllNetworkAccountsQuery,
    useGetDashboardSummaryQuery,
    useCreateNetworkAccountMutation,
    useUpdateAccountStatusMutation,
    useDeleteNetworkAccountMutation,
    useSeedDemoAccountsMutation,
    useGenerateDemoDataMutation,
} from '../redux/states/gamApi'

export const useGamData = () => {
    const [toast, setToast] = useState({ show: false, message: '', type: '' })

    // Queries
    const {
        data: accounts = [],
        isLoading: accountsLoading,
        error: accountsError,
        refetch: refetchAccounts,
    } = useGetAllNetworkAccountsQuery(undefined, {
        pollingInterval: 60000, // Poll every minute
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    const {
        data: summary,
        isLoading: summaryLoading,
        error: summaryError,
        refetch: refetchSummary,
    } = useGetDashboardSummaryQuery(undefined, {
        pollingInterval: 300000, // Poll every 5 minutes
    })

    // Mutations
    const [createAccount, { isLoading: createLoading }] = useCreateNetworkAccountMutation()
    const [updateStatus, { isLoading: updateLoading }] = useUpdateAccountStatusMutation()
    const [deleteAccount, { isLoading: deleteLoading }] = useDeleteNetworkAccountMutation()
    const [seedDemo, { isLoading: seedLoading }] = useSeedDemoAccountsMutation()
    const [generateDemo, { isLoading: generateLoading }] = useGenerateDemoDataMutation()

    // Helper function to show toast notifications
    const showToast = useCallback((message, type = 'success') => {
        setToast({ show: true, message, type })
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000)
    }, [])

    // Create new network account
    const handleCreateAccount = useCallback(async (accountData) => {
        try {
            await createAccount(accountData).unwrap()
            showToast('Network account created successfully!')
            return { success: true }
        } catch (error) {
            const message = error?.data?.message || 'Failed to create account'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [createAccount, showToast])

    // Update account status
    const handleUpdateStatus = useCallback(async (networkId, status) => {
        try {
            await updateStatus({ networkId, status }).unwrap()
            showToast(`Account status updated to ${status}`)
            return { success: true }
        } catch (error) {
            const message = error?.data?.message || 'Failed to update status'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [updateStatus, showToast])

    // Delete account
    const handleDeleteAccount = useCallback(async (id) => {
        try {
            await deleteAccount(id).unwrap()
            showToast('Account deleted successfully!')
            return { success: true }
        } catch (error) {
            const message = error?.data?.message || 'Failed to delete account'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [deleteAccount, showToast])

    // Seed demo accounts
    const handleSeedDemo = useCallback(async () => {
        try {
            const result = await seedDemo().unwrap()
            const createdCount = result.filter(r => r.action === 'created').length
            showToast(`Created ${createdCount} demo accounts!`)
            return { success: true, result }
        } catch (error) {
            const message = error?.data?.message || 'Failed to seed demo data'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [seedDemo, showToast])

    // Generate demo performance data
    const handleGenerateDemo = useCallback(async (networkId) => {
        try {
            await generateDemo(networkId).unwrap()
            showToast('Demo performance data generated!')
            return { success: true }
        } catch (error) {
            const message = error?.data?.message || 'Failed to generate demo data'
            showToast(message, 'error')
            return { success: false, error: message }
        }
    }, [generateDemo, showToast])

    // Manual refresh all data
    const refreshAllData = useCallback(async () => {
        await Promise.all([refetchAccounts(), refetchSummary()])
        showToast('Data refreshed!')
    }, [refetchAccounts, refetchSummary, showToast])

    return {
        // Data
        accounts,
        summary,

        // Loading states
        loading: {
            accounts: accountsLoading,
            summary: summaryLoading,
            create: createLoading,
            update: updateLoading,
            delete: deleteLoading,
            seed: seedLoading,
            generate: generateLoading,
        },

        // Errors
        errors: {
            accounts: accountsError,
            summary: summaryError,
        },

        // Actions
        actions: {
            createAccount: handleCreateAccount,
            updateStatus: handleUpdateStatus,
            deleteAccount: handleDeleteAccount,
            seedDemo: handleSeedDemo,
            generateDemo: handleGenerateDemo,
            refreshAll: refreshAllData,
        },

        // UI state
        toast,
        setToast,
    }
}
