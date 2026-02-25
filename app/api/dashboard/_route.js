import { networkController } from "../controllers/networkController";


export async function GET() {
    try {
        const accounts = await networkController.getAllAccounts();

        // Calculate summary metrics
        const summary = {
            totalAccounts: accounts.data.length,
            connectedAccounts: accounts.connected,
            disconnectedAccounts: accounts.disconnected,
            totalRevenue: {
                today: 0,
                thisWeek: 0,
                thisMonth: 0
            },
            totalImpressions: 0,
            averageECPM: 0,
            averageCTR: 0
        };

        // Calculate totals from latest performance data
        let totalRevenue = 0;
        let totalImpressions = 0;
        let totalECPM = 0;
        let totalCTR = 0;
        let accountsWithData = 0;

        accounts.data.forEach(account => {
            if (account.performance) {
                totalRevenue += account.performance.revenue || 0;
                totalImpressions += account.performance.impressions || 0;
                totalECPM += account.performance.eCPM || 0;
                totalCTR += account.performance.ctr || 0;
                accountsWithData++;
            }
        });

        summary.totalRevenue.today = totalRevenue;
        summary.totalRevenue.thisWeek = totalRevenue * 7; // Simulated
        summary.totalRevenue.thisMonth = totalRevenue * 30; // Simulated
        summary.totalImpressions = totalImpressions;
        summary.averageECPM = accountsWithData > 0 ? totalECPM / accountsWithData : 0;
        summary.averageCTR = accountsWithData > 0 ? totalCTR / accountsWithData : 0;

        return new Response(
            JSON.stringify({
                success: true,
                data: summary,
                lastUpdated: new Date().toISOString()
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
