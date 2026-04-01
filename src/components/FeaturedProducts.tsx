import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-4 block">
              CURATED SELECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase">
              FEATURED <span className="text-red-600">DROPS</span>
            </h2>
          </div>
          <Link to="/shop" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
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
        </div>
      </div>
    </section>
  );
}
