import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('gam_dashboard');

// GET: Dashboard overview data
export async function GET(request) {
    try {
        await connectMongoDB();

        // Get summary statistics
        const totalServices = await db.collection('service_accounts').countDocuments();
        const totalNetworks = await db.collection('gam_networks').countDocuments();
        const connectedNetworks = await db.collection('gam_networks').countDocuments({
            access_status: 'connected'
        });
        const disconnectedNetworks = await db.collection('gam_networks').countDocuments({
            access_status: 'disconnected'
        });

        // Get recent activity
        const recentLogs = await db.collection('monitoring_logs')
            .find({})
            .sort({ check_time: -1 })
            .limit(20)
            .toArray();

        // Get service breakdown
        const serviceBreakdown = await db.collection('gam_networks').aggregate([
            {
                $group: {
                    _id: "$service_email",
                    total_networks: { $sum: 1 },
                    connected: {
                        $sum: {
                            $cond: [{ $eq: ["$access_status", "connected"] }, 1, 0]
                        }
                    },
                    disconnected: {
                        $sum: {
                            $cond: [{ $eq: ["$access_status", "disconnected"] }, 1, 0]
                        }
                    }
                }
            }
        ]).toArray();

        return NextResponse.json({
            summary: {
                total_services: totalServices,
                total_networks: totalNetworks,
                connected_networks: connectedNetworks,
                disconnected_networks: disconnectedNetworks,
                connection_rate: totalNetworks > 0 ? ((connectedNetworks / totalNetworks) * 100).toFixed(1) : 0
            },
            service_breakdown: serviceBreakdown,
            recent_activity: recentLogs,
            last_updated: new Date()
        });

    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json(
            { error: 'Failed to get dashboard data', details: error.message },
            { status: 500 }
        );
    }
}

async function connectMongoDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
}