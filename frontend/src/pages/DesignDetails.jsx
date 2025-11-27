import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import axios from 'axios';

const DesignDetails = () => {
    const { id } = useParams();
    const [design, setDesign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                const { data } = await axios.get(`/api/designs/${id}`);
                setDesign(data);
            } catch (error) {
                console.error('Error fetching design:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDesign();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!design) return <div className="text-center py-20">Design not found</div>;

    // Mock features/fabric suggestions if not present in DB model yet
    const fabricSuggestions = ['Raw Silk', 'Velvet', 'Pattu'];
    const features = [
        'Premium Quality Materials',
        'Double Stitching',
        'Perfect Fit Guarantee',
        'Customizable Design'
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link to={`/category/${design.category.toLowerCase()}`} className="inline-flex items-center text-gray-600 hover:text-red-800">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to {design.category} Designs
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">

                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={design.images[selectedImage]}
                                    alt={design.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {design.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-red-800' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div>
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-2">
                                    {design.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{design.title}</h1>
                                <p className="text-2xl font-bold text-red-800">₹{design.price.toLocaleString()}</p>
                            </div>

                            <div className="prose prose-sm text-gray-600 mb-6">
                                <p>{design.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Work Type</h3>
                                    <p className="text-sm text-gray-600">{design.workType}</p>
                                </div>
                                {/* Delivery time not in model, maybe add later or mock */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Delivery Time</h3>
                                    <p className="text-sm text-gray-600">10-15 Days</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Fabric Suggestions</h3>
                                <div className="flex flex-wrap gap-2">
                                    {fabricSuggestions.map((fabric, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200">
                                            {fabric}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Why Choose Us?</h3>
                                <ul className="space-y-2">
                                    {features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to={`/book/${design._id}`}
                                    className="flex-1 bg-red-800 text-white text-center py-3 px-6 rounded-md font-bold hover:bg-red-900 transition-colors"
                                >
                                    Book This Design
                                </Link>
                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 border border-green-600 text-green-600 text-center py-3 px-6 rounded-md font-bold hover:bg-green-50 transition-colors flex items-center justify-center"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    WhatsApp Inquiry
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignDetails;
