import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Filter, Search, ChevronDown } from 'lucide-react';
import axios from 'axios';

const CategoryDesigns = () => {
    const { id } = useParams();
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchDesigns = async () => {
            try {
                const { data } = await axios.get(`/api/designs?category=${id}`);
                setDesigns(data);
            } catch (error) {
                console.error('Error fetching designs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDesigns();
    }, [id]);

    // Filter logic
    const filteredDesigns = designs.filter(design => {
        const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesPrice = true;
        if (priceRange === 'low') matchesPrice = design.price < 5000;
        if (priceRange === 'mid') matchesPrice = design.price >= 5000 && design.price <= 10000;
        if (priceRange === 'high') matchesPrice = design.price > 10000;

        return matchesSearch && matchesPrice;
    });

    const categoryName = id ? id.charAt(0).toUpperCase() + id.slice(1) + ' Work' : 'All Designs';

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Breadcrumbs */}
                <div className="mb-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Link to="/" className="hover:text-red-800">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/categories" className="hover:text-red-800">Categories</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">{categoryName}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{categoryName} Collection</h1>
                </div>

                {/* Filters & Search Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Search */}
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="Search designs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Toggle (Mobile) */}
                        <button
                            className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" /> Filters
                        </button>

                        {/* Filters (Desktop) */}
                        <div className={`md:flex items-center gap-4 ${showFilters ? 'block' : 'hidden'}`}>
                            <div className="relative">
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                >
                                    <option value="all">All Prices</option>
                                    <option value="low">Under ₹5,000</option>
                                    <option value="mid">₹5,000 - ₹10,000</option>
                                    <option value="high">Above ₹10,000</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Designs Grid */}
                {filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDesigns.map((design) => (
                            <div key={design._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="aspect-w-1 aspect-h-1 h-64 overflow-hidden relative group">
                                    <img
                                        src={design.images[0]}
                                        alt={design.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <Link
                                            to={`/design/${design._id}`}
                                            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-all"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">{design.title}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-lg font-bold text-red-800">₹{design.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No designs found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setPriceRange('all'); }}
                            className="mt-4 text-red-800 font-medium hover:text-red-900"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDesigns;
