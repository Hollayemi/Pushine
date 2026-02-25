import {
    useDiscoverNetworksMutation,
    useGetStoredNetworksQuery,
    useCheckPendingInvitationsQuery,
    useAcceptInvitationMutation
} from '../redux/states/gamMonitoringApi';

export function useNetworkDiscovery(serviceEmail) {
    // Queries
    const storedNetworksQuery = useGetStoredNetworksQuery(
        { serviceEmail, includeInactive: true },
        { skip: !serviceEmail }
    );

    const pendingQuery = useCheckPendingInvitationsQuery(serviceEmail, {
        skip: !serviceEmail,
        pollingInterval: 60000 // Check every minute
    });

    // Mutations
    const [discoverNetworks, discoveryMutation] = useDiscoverNetworksMutation();
    const [acceptInvitation, acceptMutation] = useAcceptInvitationMutation();

    // Helper functions
    const handleDiscover = async (discoverNew = true) => {
        if (!serviceEmail) return { success: false, error: 'Service email required' };

        try {
            const result = await discoverNetworks({ serviceEmail, discoverNew }).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const handleAcceptInvitation = async (networkId, invitationId) => {
        if (!serviceEmail || !networkId) {
            return { success: false, error: 'Service email and network ID required' };
        }

        try {
            const result = await acceptInvitation({
                serviceEmail,
                networkId,
                invitationId
            }).unwrap();

            // Refresh data after successful acceptance
            if (result.success) {
                await handleDiscover(true);
                storedNetworksQuery.refetch();
                pendingQuery.refetch();
            }

            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return {
        // Data
        storedNetworks: storedNetworksQuery.data,
        pendingStatus: pendingQuery.data,
        discoveryResult: discoveryMutation.data,

        // Loading states
        isLoadingStored: storedNetworksQuery.isLoading,
        isCheckingPending: pendingQuery.isLoading,
        isDiscovering: discoveryMutation.isLoading,
        isAccepting: acceptMutation.isLoading,

        // Actions
        discover: handleDiscover,
        acceptInvitation: handleAcceptInvitation,

        // Refresh functions
        refreshStored: storedNetworksQuery.refetch,
        refreshPending: pendingQuery.refetch,
    };
}
