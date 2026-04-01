import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ cartCount }: { cartCount: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-black tracking-tighter text-white">
              RB <span className="text-red-600">FOREVER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">HOME</Link>
            <Link to="/shop" className="text-sm font-medium text-white/70 hover:text-white transition-colors">SHOP</Link>
            <Link to="/collections" className="text-sm font-medium text-white/70 hover:text-white transition-colors">COLLECTIONS</Link>
            <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">OUR STORY</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <Link to="/account" className="p-2 text-white/70 hover:text-white transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-white/70 hover:text-white transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" className="block text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>HOME</Link>
              <Link to="/shop" className="block text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
              <Link to="/collections" className="block text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>COLLECTIONS</Link>
              <Link to="/about" className="block text-lg font-bold text-white" onClick={() => setIsMenuOpen(false)}>OUR STORY</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
