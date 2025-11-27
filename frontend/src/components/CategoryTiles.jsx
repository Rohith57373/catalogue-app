import { Link } from 'react-router-dom';

const categories = [
    {
        id: 'bridal',
        name: 'Bridal Work',
        image: 'https://images.unsplash.com/photo-1583391726435-098128d23012?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Heavy embroidery for your big day'
    },
    {
        id: 'aari',
        name: 'Aari Work',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Intricate thread and bead work'
    },
    {
        id: 'maggam',
        name: 'Maggam Work',
        image: 'https://images.unsplash.com/photo-1610030469668-9656059525b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Traditional hand embroidery'
    },
    {
        id: 'simple',
        name: 'Simple Designs',
        image: 'https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Elegant daily wear patterns'
    }
];

const CategoryTiles = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
                    <p className="mt-4 text-gray-600">Find the perfect style for your saree</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/category/${category.id}`}
                            className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-w-3 aspect-h-4 h-64">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="text-xl font-bold">{category.name}</h3>
                                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/categories" className="text-red-800 font-medium hover:text-red-900">
                        View All Categories &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoryTiles;
