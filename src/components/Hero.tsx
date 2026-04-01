import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/streetwear/1920/1080" 
          alt="RB Forever Streetwear" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase mb-6">
            NEW COLLECTION DROP
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            WEAR <span className="text-red-600">CONFIDENCE.</span><br />
            WEAR RB FOREVER.
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
            Premium streetwear for bold individuals who define their own rules. Designed for the trendsetters of Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/shop" 
              className="bg-white text-black px-10 py-5 text-sm font-black tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
            >
              SHOP NOW
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/collections" 
              className="bg-transparent border border-white/30 text-white px-10 py-5 text-sm font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
