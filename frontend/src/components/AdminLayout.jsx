import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear auth token
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <p className="text-gray-400 text-sm">Gayathri Silks</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/upload" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                        <PlusCircle className="h-5 w-5 mr-3" />
                        Add Design
                    </Link>
                    <Link to="/admin/designs" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
                        <List className="h-5 w-5 mr-3" />
                        Manage Designs
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
