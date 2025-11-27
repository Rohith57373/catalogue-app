import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Users, MessageSquare, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { name: 'Total Designs', value: '0', icon: ShoppingBag, color: 'bg-blue-500' },
        { name: 'Categories', value: '0', icon: TrendingUp, color: 'bg-green-500' },
        { name: 'New Inquiries', value: '0', icon: MessageSquare, color: 'bg-yellow-500' },
        { name: 'Total Visits', value: '2.4k', icon: Users, color: 'bg-purple-500' }, // Mock for now
    ]);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [designsRes, categoriesRes, inquiriesRes] = await Promise.all([
                    axios.get('/api/designs'),
                    axios.get('/api/categories'),
                    axios.get('/api/inquiry')
                ]);

                setStats([
                    { name: 'Total Designs', value: designsRes.data.length, icon: ShoppingBag, color: 'bg-blue-500' },
                    { name: 'Categories', value: categoriesRes.data.length, icon: TrendingUp, color: 'bg-green-500' },
                    { name: 'New Inquiries', value: inquiriesRes.data.length, icon: MessageSquare, color: 'bg-yellow-500' },
                    { name: 'Total Visits', value: '2.4k', icon: Users, color: 'bg-purple-500' },
                ]);

                setRecentInquiries(inquiriesRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                        <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Recent Inquiries</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Design ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No inquiries found.</td>
                                </tr>
                            ) : (
                                recentInquiries.map((inquiry) => (
                                    <tr key={inquiry._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {inquiry.designId ? (
                                                <Link to={`/design/${inquiry.designId}`} target="_blank" className="text-blue-600 hover:underline">
                                                    {inquiry.designId}
                                                </Link>
                                            ) : 'General'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{inquiry.message}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {inquiry.image ? (
                                                <a href={inquiry.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                    <Eye className="h-4 w-4" />
                                                </a>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
