import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2, Eye } from 'lucide-react';

const ManageDesigns = () => {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const { data } = await axios.get('/api/designs');
            setDesigns(data);
        } catch (error) {
            console.error('Error fetching designs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this design? This will also delete associated images.')) {
            try {
                await axios.delete(`/api/designs/${id}`);
                setDesigns(designs.filter(design => design._id !== id));
                alert('Design deleted successfully');
            } catch (error) {
                console.error('Error deleting design:', error);
                alert('Failed to delete design');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Manage Designs</h1>
                <Link to="/admin/upload" className="bg-red-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-900">
                    Add New Design
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {designs.map((design) => (
                                <tr key={design._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={design.images[0]} alt={design.title} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{design.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{design.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{design.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${design.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {design.featured ? 'Featured' : 'Standard'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/design/${design._id}`} target="_blank" className="text-blue-600 hover:text-blue-900 mr-4 inline-block"><Eye className="h-4 w-4" /></Link>
                                        <Link to={`/admin/designs/edit/${design._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 inline-block"><Edit className="h-4 w-4" /></Link>
                                        <button onClick={() => handleDelete(design._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageDesigns;
