import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Send } from 'lucide-react';
import axios from 'axios';

const BookDesign = () => {
    const { designId } = useParams();
    const navigate = useNavigate();
    const [design, setDesign] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
        measurements: '',
        image: null
    });

    useEffect(() => {
        if (designId && designId !== 'general') {
            const fetchDesign = async () => {
                try {
                    const { data } = await axios.get(`/api/designs/${designId}`);
                    setDesign(data);
                } catch (error) {
                    console.error('Error fetching design:', error);
                }
            };
            fetchDesign();
        }
    }, [designId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('phone', formData.phone);
            data.append('message', formData.message);
            data.append('measurements', formData.measurements);
            if (formData.image) {
                data.append('image', formData.image);
            }
            if (designId && designId !== 'general') {
                data.append('designId', designId);
            }

            await axios.post('/api/inquiry', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Thank you for your inquiry! We will get back to you soon.');
            navigate('/');
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            alert('Failed to submit inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const designTitle = design ? design.title : (designId === 'general' ? 'Custom Design' : `Design #${designId}`);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-red-800 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-red-800 py-6 px-8">
                        <h1 className="text-2xl font-bold text-white">Book Your Design</h1>
                        <p className="text-red-100 mt-2">Inquiry for: {designTitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="measurements" className="block text-sm font-medium text-gray-700 mb-1">Measurements (Optional)</label>
                            <textarea
                                id="measurements"
                                name="measurements"
                                rows={3}
                                value={formData.measurements}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="Bust, Waist, Sleeve Length, etc."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message / Special Requests</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="Any specific customization or questions..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reference Image (Optional)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-500 transition-colors">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    {formData.image && (
                                        <p className="text-sm text-green-600 font-medium mt-2">Selected: {formData.image.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sending...' : (
                                    <span className="flex items-center">
                                        Send Inquiry <Send className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookDesign;
