import {
    useGetDashboardQuery,
    useRunBulkCheckMutation,
    useMonitorServiceMutation,
    useAddNetworkMutation
} from '../redux/states/gamMonitoringApi';

export function useGamMonitoring() {
    const dashboardQuery = useGetDashboardQuery(undefined, {
        pollingInterval: 60000, // Poll every minute
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const [runBulkCheck, bulkCheckMutation] = useRunBulkCheckMutation();
    const [monitorService, monitorMutation] = useMonitorServiceMutation();
    const [addNetwork, addNetworkMutation] = useAddNetworkMutation();

    const handleBulkCheck = async () => {
        try {
            const result = await runBulkCheck().unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const handleMonitorService = async (serviceEmail, networkIds) => {
        try {
            const result = await monitorService({ serviceEmail, networkIds }).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const handleAddNetwork = async (serviceEmail, networkId, networkName) => {
        try {
            const result = await addNetwork({ serviceEmail, networkId, networkName }).unwrap();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return {
        dashboard: dashboardQuery,
        bulkCheck: {
            trigger: handleBulkCheck,
            isLoading: bulkCheckMutation.isLoading,
        },
        monitorService: {
            trigger: handleMonitorService,
            isLoading: monitorMutation.isLoading,
        },
        addNetwork: {
            trigger: handleAddNetwork,
            isLoading: addNetworkMutation.isLoading,
        },
    };
}
