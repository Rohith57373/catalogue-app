import { Star } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-red-900 py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Embroidery Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Our Story
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-red-100">
                        Preserving the art of traditional embroidery since 1995.
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-16 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Craftsmanship & Tradition
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Gayathri Silks began with a simple mission: to bring the finest hand embroidery to the modern woman.
                                What started as a small boutique has grown into a renowned destination for bridal and occasion wear.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                Our team of skilled artisans specializes in Maggam, Aari, Zardosi, and intricate thread work.
                                Each stitch is placed with precision, ensuring that every blouse is a masterpiece of art.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                We believe that your saree deserves the perfect companion. That's why we offer fully customizable designs
                                tailored to your style and fit.
                            </p>
                        </div>
                        <div className="mt-10 lg:mt-0 relative">
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Artisans at work"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
                        What Our Clients Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Priya Sharma",
                                role: "Bride",
                                content: "The bridal blouse they designed for me was absolutely stunning. The fit was perfect and the embroidery was exactly what I wanted.",
                                rating: 5
                            },
                            {
                                name: "Anjali Rao",
                                role: "Customer",
                                content: "I've been getting my blouses stitched here for years. Their attention to detail and timely delivery is unmatched.",
                                rating: 5
                            },
                            {
                                name: "Lakshmi Nair",
                                role: "Customer",
                                content: "Beautiful designs and very professional service. They really listen to your requirements and suggest the best options.",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="py-16 bg-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Visit Our Store</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Experience our collection in person. We are located in the heart of Fashion City.
                    </p>
                    <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                        <p className="font-bold text-gray-900">Gayathri Silks</p>
                        <p className="text-gray-600">123 Silk Street, Fashion City</p>
                        <p className="text-gray-600">Open Mon-Sat: 10:00 AM - 8:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
