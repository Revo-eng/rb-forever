import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ChevronRight, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { SIZES } from '../constants';
import { toast } from 'sonner';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'RB CLASSIC TEE - BLACK',
    price: 35000,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/tee1/800/1000', 'https://picsum.photos/seed/tee1-2/800/1000', 'https://picsum.photos/seed/tee1-3/800/1000'],
    description: 'Premium heavyweight cotton t-shirt with signature RB Forever branding. Designed for maximum comfort and durability.',
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
    images: ['https://picsum.photos/seed/hoodie1/800/1000', 'https://picsum.photos/seed/hoodie1-2/800/1000'],
    description: 'Oversized fit hoodie with minimalist embroidery and soft fleece lining. Perfect for those cool evenings.',
    sizes: ['M', 'L', 'XL'],
    stock: 20,
    isLimited: true,
    createdAt: Date.now()
  }
];

export default function ProductDetail({ addToCart }: { addToCart: (p: Product, size: string, qty: number) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0]);
    }
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-black">HOME</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-black">SHOP</Link>
          <ChevronRight size={12} />
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isLimited && (
                <span className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest">
                  LIMITED EDITION
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-red-600' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-10">
              <p className="text-red-600 text-xs font-black tracking-widest uppercase mb-4">{product.category}</p>
              <h1 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">{product.name}</h1>
              <p className="text-3xl font-bold text-black mb-8">TSh {product.price.toLocaleString()}</p>
              <p className="text-gray-500 leading-relaxed text-lg max-w-xl">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-black tracking-widest uppercase">SELECT SIZE</h4>
                <button className="text-[10px] font-bold text-gray-400 hover:text-black underline uppercase tracking-widest">SIZE GUIDE</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {SIZES.map(size => (
                  <button 
                    key={size}
                    disabled={!product.sizes.includes(size)}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-sm font-black transition-all border-2 ${
                      !product.sizes.includes(size) 
                        ? 'bg-gray-50 text-gray-200 border-gray-100 cursor-not-allowed' 
                        : selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <div className="flex items-center border-2 border-gray-200 h-16 px-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 font-bold">-</button>
                <span className="w-12 text-center font-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 font-bold">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-red-600 text-white h-16 text-sm font-black tracking-widest uppercase hover:bg-black transition-all duration-300 flex items-center justify-center group"
              >
                <ShoppingCart size={20} className="mr-3" />
                ADD TO CART
              </button>
              <button className="w-16 h-16 border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <ShieldCheck size={24} className="text-red-600" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">PREMIUM QUALITY</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck size={24} className="text-red-600" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">FAST DELIVERY</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw size={24} className="text-red-600" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">EASY RETURNS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
