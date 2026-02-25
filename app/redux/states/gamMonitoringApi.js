// store/api/gamMonitoringApi.js - RTK Query API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamMonitoringApi = createApi({
    reducerPath: 'gamMonitoringApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/services/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Service', 'Network', 'Dashboard', 'MonitoringLog', 'PendingInvitation'],
    endpoints: (builder) => ({

        // Monitor specific service email
        monitorService: builder.mutation({
            query: ({ serviceEmail, networkIds }) => ({
                url: 'monitor',
                method: 'POST',
                body: { serviceEmail, networkIds },
            }),
            invalidatesTags: ['Service', 'Network', 'Dashboard', 'MonitoringLog'],
        }),

        // Get monitoring status for specific service email
        getServiceStatus: builder.query({
            query: (email) => `monitor?email=${email}`,
            providesTags: (result, error, email) => [
                { type: 'Service', id: email },
                'MonitoringLog'
            ],
        }),

        // Get all services
        getAllServices: builder.query({
            query: () => 'monitor',
            providesTags: ['Service'],
        }),

        // Run bulk check on all services
        runBulkCheck: builder.mutation({
            query: () => ({
                url: 'bulk-check',
                method: 'POST',
            }),
            invalidatesTags: ['Service', 'Network', 'Dashboard', 'MonitoringLog'],
        }),

        // Add new network to monitor
        addNetwork: builder.mutation({
            query: ({ serviceEmail, networkId, networkName }) => ({
                url: 'add-network',
                method: 'POST',
                body: { serviceEmail, networkId, networkName },
            }),
            invalidatesTags: ['Service', 'Network', 'Dashboard'],
        }),

        // Get dashboard overview
        getDashboard: builder.query({
            query: () => 'dashboard',
            providesTags: ['Dashboard'],
        }),



        // v2---------
        discoverNetworks: builder.mutation({
            query: ({ serviceEmail, discoverNew = true }) => ({
                url: 'list-networks',
                method: 'POST',
                body: { serviceEmail, discoverNew },
            }),
            invalidatesTags: ['Service', 'Network', 'Dashboard'],
        }),

        // Get stored networks for service account
        getStoredNetworks: builder.query({
            query: ({ serviceEmail, includeInactive = false }) =>
                `list-networks?email=${serviceEmail}&includeInactive=${includeInactive}`,
            providesTags: (result, error, { serviceEmail }) => [
                { type: 'Network', id: serviceEmail },
            ],
        }),

        // Get all services with network counts
        getAllServicesWithNetworks: builder.query({
            query: () => 'list-networks',
            providesTags: ['Service', 'Network'],
        }),

        // Accept GAM invitation
        acceptInvitation: builder.mutation({
            query: ({ serviceEmail, networkId, invitationId }) => ({
                url: 'accept-invitation',
                method: 'POST',
                body: { serviceEmail, networkId, invitationId },
            }),
            invalidatesTags: ['Service', 'Network', 'PendingInvitation'],
        }),

        // Check for pending invitations
        checkPendingInvitations: builder.query({
            query: (serviceEmail) => `check-pending?email=${serviceEmail}`,
            providesTags: (result, error, serviceEmail) => [
                { type: 'PendingInvitation', id: serviceEmail },
            ],
        }),

    }),
});

// Export hooks for usage in functional components
export const {
    useMonitorServiceMutation,
    useGetServiceStatusQuery,
    useGetAllServicesQuery,
    useRunBulkCheckMutation,
    useAddNetworkMutation,
    useGetDashboardQuery,

    // v2---------
    useDiscoverNetworksMutation,
    useGetStoredNetworksQuery,
    useGetAllServicesWithNetworksQuery,
    useAcceptInvitationMutation,
    useCheckPendingInvitationsQuery,
} = gamMonitoringApi;