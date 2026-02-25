// File: /store/api/gamApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gamApi = createApi({
    reducerPath: 'gamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['NetworkAccount', 'DashboardSummary', 'PerformanceData'],
    endpoints: (builder) => ({
        // Network Accounts Endpoints
        getAllNetworkAccounts: builder.query({
            query: () => '/network-accounts',
            providesTags: ['NetworkAccount'],
            transformResponse: (response) => response.data,
        }),

        createNetworkAccount: builder.mutation({
            query: (accountData) => ({
                url: '/network-accounts',
                method: 'POST',
                body: accountData,
            }),
            invalidatesTags: ['NetworkAccount', 'DashboardSummary'],
            transformResponse: (response) => response.data,
        }),

        updateAccountStatus: builder.mutation({
            query: ({ networkId, status }) => ({
                url: `/network-accounts/${networkId}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['NetworkAccount', 'DashboardSummary'],
            // Optimistic update
            onQueryStarted: async ({ networkId, status }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    gamApi.util.updateQueryData('getAllNetworkAccounts', undefined, (draft) => {
                        const account = draft.find((acc) => acc.networkId === networkId)
                        if (account) {
                            account.status = status
                            account.lastSyncAt = new Date().toISOString()
                            account.updatedAt = new Date().toISOString()
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),

        deleteNetworkAccount: builder.mutation({
            query: (id) => ({
                url: `/network-accounts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['NetworkAccount', 'DashboardSummary'],
            // Optimistic update
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    gamApi.util.updateQueryData('getAllNetworkAccounts', undefined, (draft) => {
                        return draft.filter((account) => account._id !== id)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),

        // Dashboard Summary Endpoint
        getDashboardSummary: builder.query({
            query: () => '/dashboard',
            providesTags: ['DashboardSummary'],
            transformResponse: (response) => response.data,
            // Polling every 5 minutes for fresh data
            pollingInterval: 300000,
        }),

        // Demo Data Endpoints
        seedDemoAccounts: builder.mutation({
            query: () => ({
                url: '/demo/seed-accounts',
                method: 'POST',
            }),
            invalidatesTags: ['NetworkAccount', 'DashboardSummary'],
            transformResponse: (response) => response.results,
        }),

        generateDemoData: builder.mutation({
            query: (networkId) => ({
                url: '/demo/generate-data',
                method: 'POST',
                body: { networkId },
            }),
            invalidatesTags: ['PerformanceData', 'DashboardSummary'],
            transformResponse: (response) => response.data,
        }),

        // Performance Data Endpoint (for future use)
        getPerformanceData: builder.query({
            query: ({ networkId, days = 30 }) =>
                `/performance-data/${networkId}?days=${days}`,
            providesTags: (result, error, { networkId }) => [
                { type: 'PerformanceData', id: networkId }
            ],
        }),
    }),
})

export const {
    // Network Accounts
    useGetAllNetworkAccountsQuery,
    useCreateNetworkAccountMutation,
    useUpdateAccountStatusMutation,
    useDeleteNetworkAccountMutation,

    // Dashboard
    useGetDashboardSummaryQuery,

    // Demo Data
    useSeedDemoAccountsMutation,
    useGenerateDemoDataMutation,

    // Performance Data
    useGetPerformanceDataQuery,

    // Manual cache invalidation
    useLazyGetAllNetworkAccountsQuery,
    useLazyGetDashboardSummaryQuery,
} = gamApi
