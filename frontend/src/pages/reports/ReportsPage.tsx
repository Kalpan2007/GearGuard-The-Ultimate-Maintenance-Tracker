import { useState, useEffect } from 'react';
import { getReportingSummary } from '../../api/requests';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

export default function ReportsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await getReportingSummary();
            setData(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading reports...</div>;
    if (!data) return <div className="p-8 text-center text-destructive">Failed to load reports.</div>;

    // Transform Data for Charts
    const statusData = data.byStatus.map((item: any) => ({
        name: item.status,
        value: item._count.id
    }));

    const categoryData = data.byCategory.map((item: any) => ({
        name: item.category,
        count: item._count.id
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Request Status Distribution */}
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Requests by Status</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Requests by Category */}
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Requests by Category</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={10} angle={-30} textAnchor="end" height={60} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
