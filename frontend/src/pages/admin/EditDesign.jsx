import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, X, ArrowLeft } from 'lucide-react';

const EditDesign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]); // URLs for display
    const [selectedFiles, setSelectedFiles] = useState([]); // New files to upload

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        workType: ''
    });

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                const { data } = await axios.get(`/api/designs/${id}`);
                setFormData({
                    title: data.title,
                    category: data.category,
                    price: data.price,
                    description: data.description,
                    workType: data.workType
                });
                setImages(data.images || []);
            } catch (error) {
                console.error('Error fetching design:', error);
                alert('Failed to load design details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDesign();
    }, [id]);

    const handleImageUpload = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles([...selectedFiles, ...files]);
            const newImages = files.map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index) => {
        // If it's an existing image (URL string)
        // We need to handle how we track deleted existing images vs new images
        // For simplicity, we'll just update the display list. 
        // NOTE: Real implementation might need to track deleted IDs to send to backend if we want to delete specific images.
        // But our backend currently replaces the whole object or we can just send new files.
        // Wait, the backend PUT route currently uses `Object.assign(design, req.body)`. 
        // It doesn't handle image uploads in PUT yet.
        // I need to update the backend PUT route to handle image uploads if I want to support changing images.

        // For now, let's just update the UI state.
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        // If we removed a newly added file, remove it from selectedFiles
        // This logic is tricky because 'images' mixes existing URLs and blob URLs.
        // A better approach:
        // Keep 'existingImages' and 'newImages' separate?
        // Or just let the user re-upload everything?

        // Let's stick to a simple approach: 
        // If the user uploads new images, we might want to replace the old ones or append?
        // The current backend PUT implementation is simple.

        // Let's refine the plan: I will update the backend PUT route to handle multipart/form-data as well.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // For now, we will just update text fields. 
            // Updating images requires backend changes to support PUT with file upload.
            // I will implement text update first.

            await axios.put(`/api/designs/${id}`, formData);

            alert('Design updated successfully!');
            navigate('/admin/designs');
        } catch (error) {
            console.error('Error updating design:', error);
            alert('Failed to update design. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/admin/designs')}
                className="flex items-center text-gray-600 hover:text-red-800 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Designs
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Design</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Design Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                            <option value="">Select Category</option>
                            <option value="bridal">Bridal Work</option>
                            <option value="maggam">Maggam Work</option>
                            <option value="aari">Aari Work</option>
                            <option value="zardosi">Zardosi Work</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                        <input
                            type="text"
                            required
                            value={formData.workType}
                            onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="e.g., Zardosi & Stone"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows={4}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                </div>

                {/* Image editing is disabled for now as it requires backend changes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Images (View Only)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-w-1 aspect-h-1">
                                <img src={img} alt={`Design ${idx}`} className="object-cover rounded-lg" />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 italic">Image updates are currently not supported in edit mode.</p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? 'Updating...' : 'Update Design'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDesign;
