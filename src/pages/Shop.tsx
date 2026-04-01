import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ShoppingCart, Eye, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, SIZES } from '../constants';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'RB CLASSIC TEE - BLACK',
    price: 35000,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/tee1/600/800'],
    description: 'Premium heavyweight cotton t-shirt with signature RB Forever branding.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    isTrending: true,
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'URBAN EXPLORER HOODIE',
    price: 75000,
    category: 'Hoodies',
    images: ['https://picsum.photos/seed/hoodie1/600/800'],
    description: 'Oversized fit hoodie with minimalist embroidery and soft fleece lining.',
    sizes: ['M', 'L', 'XL'],
    stock: 20,
    isLimited: true,
    createdAt: Date.now()
  },
  {
    id: '3',
    name: 'SIGNATURE CARGO PANTS',
    price: 85000,
    category: 'Sweatpants',
    images: ['https://picsum.photos/seed/pants1/600/800'],
    description: 'Durable streetwear cargo pants with multiple utility pockets.',
    sizes: ['S', 'M', 'L'],
    stock: 15,
    createdAt: Date.now()
  },
  {
    id: '4',
    name: 'RB FOREVER CAP',
    price: 25000,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/cap1/600/800'],
    description: 'Structured 6-panel cap with high-density logo embroidery.',
    sizes: ['One Size'],
    stock: 100,
    createdAt: Date.now()
  },
  {
    id: '5',
    name: 'RB CLASSIC TEE - WHITE',
    price: 35000,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/tee2/600/800'],
    description: 'Premium heavyweight cotton t-shirt with signature RB Forever branding.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    createdAt: Date.now()
  },
  {
    id: '6',
    name: 'TECH FLEECE JOGGERS',
    price: 65000,
    category: 'Sweatpants',
    images: ['https://picsum.photos/seed/pants2/600/800'],
    description: 'Modern tech fleece joggers with tapered fit and reflective details.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    createdAt: Date.now()
  }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return b.createdAt - a.createdAt;
    });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-4">SHOP <span className="text-red-600">ALL</span></h1>
          <p className="text-gray-500 font-medium">Explore our premium streetwear collection.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 mb-12 border-b border-gray-100 pb-8">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 text-xs font-black tracking-widest uppercase transition-all ${selectedCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              ALL
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 text-xs font-black tracking-widest uppercase transition-all ${selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH PRODUCTS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border-none pl-12 pr-6 py-3 text-xs font-bold w-full lg:w-64 focus:ring-1 focus:ring-red-600 outline-none"
              />
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-xs font-black tracking-widest uppercase">
                <span>SORT: {sortBy}</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white shadow-2xl border border-gray-100 py-2 w-48 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {['Newest', 'Price: Low to High', 'Price: High to Low'].map(option => (
                  <button 
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="block w-full text-left px-6 py-3 text-[10px] font-black uppercase hover:bg-gray-50 hover:text-red-600"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isTrending && (
                      <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        TRENDING
                      </span>
                    )}
                    {product.isLimited && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        LIMITED
                      </span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="bg-white text-black p-4 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-xl">
                      <ShoppingCart size={20} />
                    </button>
                    <Link 
                      to={`/product/${product.id}`}
                      className="bg-white text-black p-4 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-xl"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{product.category}</p>
                  <h3 className="text-lg font-black tracking-tight text-black group-hover:text-red-600 transition-colors uppercase">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-black">
                    TSh {product.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-black text-gray-300 uppercase tracking-tighter">NO PRODUCTS FOUND</h3>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-red-600 font-bold hover:underline"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
