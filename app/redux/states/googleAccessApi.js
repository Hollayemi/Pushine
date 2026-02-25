import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const googleAccessApi = createApi({
    reducerPath: 'googleAccessApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['AccessStatus', 'UserInfo', 'OAuthToken'],
    endpoints: (builder) => ({
        // OAuth Authentication Endpoints
        getGoogleAuthUrl: builder.query({
            query: () => '/auth/google-oauth',
            providesTags: ['OAuthToken'],
            transformResponse: (response) => response.authUrl,
        }),

        exchangeOAuthCode: builder.mutation({
            query: (code) => ({
                url: '/auth/google-oauth',
                method: 'POST',
                body: { code },
            }),
            invalidatesTags: ['OAuthToken', 'UserInfo', 'AccessStatus'],
            transformResponse: (response) => response.tokens,
        }),

        // Access Checking Endpoints
        checkAllNetworkAccess: builder.mutation({
            query: ({ accessToken, refreshToken }) => ({
                url: '/access/check-all',
                method: 'POST',
                body: { accessToken, refreshToken },
            }),
            invalidatesTags: ['AccessStatus'],
            transformResponse: (response) => response,
            // Cache for 5 minutes since access checks are expensive
            keepCacheDataFor: 300,
        }),

        checkSingleNetworkAccess: builder.mutation({
            query: ({ networkId, accessToken, refreshToken }) => ({
                url: '/access/check-single',
                method: 'POST',
                body: { networkId, accessToken, refreshToken },
            }),
            invalidatesTags: (result, error, { networkId }) => [
                { type: 'AccessStatus', id: networkId }
            ],
            transformResponse: (response) => response,
            // Optimistic update for single network status
            onQueryStarted: async (
                { networkId, accessToken },
                { dispatch, queryFulfilled, getState }
            ) => {
                try {
                    const result = await queryFulfilled

                    // Update the network accounts cache with new status
                    dispatch(
                        googleAccessApi.util.updateQueryData(
                            'getAllNetworkAccounts',
                            undefined,
                            (draft) => {
                                const account = draft.find((acc) => acc.networkId === networkId)
                                if (account) {
                                    account.status = result.data.hasAccess ? 'connected' : 'disconnected'
                                    account.lastSyncAt = result.data.checkedAt
                                    account.updatedAt = result.data.checkedAt
                                }
                            }
                        )
                    )
                } catch (error) {
                    // Handle error silently, let the UI show the error
                }
            },
        }),

        getUserAccessInfo: builder.query({
            query: ({ accessToken, refreshToken }) => ({
                url: '/access/user-info',
                method: 'POST',
                body: { accessToken, refreshToken },
            }),
            providesTags: ['UserInfo'],
            transformResponse: (response) => response,
            // Cache user info for 10 minutes
            keepCacheDataFor: 600,
        }),

        // Batch access check with retry logic
        batchCheckNetworkAccess: builder.mutation({
            query: ({ networkIds, accessToken, refreshToken }) => ({
                url: '/access/batch-check',
                method: 'POST',
                body: { networkIds, accessToken, refreshToken },
            }),
            invalidatesTags: ['AccessStatus'],
            transformResponse: (response) => response,
        }),

        // Refresh access token
        refreshGoogleToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body: { refreshToken },
            }),
            invalidatesTags: ['OAuthToken'],
            transformResponse: (response) => response.tokens,
        }),
    }),
})

export const {
    // OAuth
    useGetGoogleAuthUrlQuery,
    useExchangeOAuthCodeMutation,
    useRefreshGoogleTokenMutation,

    // Access Checking
    useCheckAllNetworkAccessMutation,
    useCheckSingleNetworkAccessMutation,
    useGetUserAccessInfoQuery,
    useBatchCheckNetworkAccessMutation,

    // Lazy queries
    useLazyGetUserAccessInfoQuery,
    useLazyGetGoogleAuthUrlQuery,
} = googleAccessApi
