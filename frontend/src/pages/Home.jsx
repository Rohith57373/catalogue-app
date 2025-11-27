import Hero from '../components/Hero';
import CategoryTiles from '../components/CategoryTiles';
import FeaturedDesigns from '../components/FeaturedDesigns';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Hero />
            <CategoryTiles />
            <FeaturedDesigns />

            {/* CTA Section */}
            <section className="bg-red-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Have a Custom Design in Mind?</h2>
                    <p className="text-red-100 mb-8 max-w-2xl mx-auto">
                        We specialize in bringing your dream designs to life. Send us your reference image or discuss your ideas with our expert designers.
                    </p>
                    <Link
                        to="/book/general"
                        className="inline-block bg-white text-red-800 font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Start Your Custom Order
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
