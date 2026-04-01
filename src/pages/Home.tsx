import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandStory from '../components/BrandStory';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />

      {/* Final CTA Banner */}
      <section className="py-24 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-[-20deg] translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-none">
            JOIN THE <span className="text-black">MOVEMENT.</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Be the first to know about new drops, exclusive collections, and the latest streetwear trends in Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/shop" 
              className="bg-black text-white px-12 py-5 text-sm font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center group"
            >
              SHOP NOW
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/collections" 
              className="bg-transparent border-2 border-white text-white px-12 py-5 text-sm font-black tracking-widest uppercase hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
