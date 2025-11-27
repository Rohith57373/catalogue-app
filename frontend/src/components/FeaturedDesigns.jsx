import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedDesigns = () => {
    const [featuredDesigns, setFeaturedDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedDesigns = async () => {
            try {
                const { data } = await axios.get('/api/designs?featured=true');
                setFeaturedDesigns(data);
            } catch (error) {
                console.error('Error fetching featured designs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedDesigns();
    }, []);

    if (loading) return null; // Or a loading spinner
    if (featuredDesigns.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Designs</h2>
                        <p className="mt-2 text-gray-600">Latest additions to our collection</p>
                    </div>
                    <Link to="/categories" className="hidden sm:block text-red-800 font-medium hover:text-red-900">
                        View All Designs &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(featuredDesigns) && featuredDesigns.map((design) => (
                        <div key={design._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={design.images[0]}
                                    alt={design.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-semibold text-red-800 uppercase tracking-wider">{design.category}</span>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900">{design.title}</h3>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">₹{design.price.toLocaleString()}</span>
                                    <Link
                                        to={`/design/${design._id}`}
                                        className="text-sm font-medium text-red-800 hover:text-red-900"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link to="/categories" className="text-red-800 font-medium hover:text-red-900">
                        View All Designs &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDesigns;
