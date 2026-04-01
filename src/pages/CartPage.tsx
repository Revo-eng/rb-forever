import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

export default function CartPage({ 
  cart, 
  updateQuantity, 
  removeFromCart 
}: { 
  cart: CartItem[], 
  updateQuantity: (id: string, size: string, qty: number) => void,
  removeFromCart: (id: string, size: string) => void
}) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 flex justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <ShoppingBag size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">YOUR CART IS EMPTY</h1>
          <p className="text-gray-500 mb-12 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest drops and find your style.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center bg-black text-white px-12 py-5 text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-all duration-300"
          >
            START SHOPPING
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-16">
          <Link to="/shop" className="text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-5xl font-black tracking-tighter uppercase">YOUR <span className="text-red-600">CART</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pb-8 border-b border-gray-100 group"
                >
                  <div className="w-32 aspect-[3/4] bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-black tracking-tight uppercase group-hover:text-red-600 transition-colors">{item.name}</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">SIZE: {item.selectedSize}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-300 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end pt-4">
                      <div className="flex items-center border-2 border-gray-100 h-12 px-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-400 hover:text-black"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-2 text-gray-400 hover:text-black"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-lg font-bold">TSh {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-10 space-y-8 sticky top-32">
              <h2 className="text-2xl font-black tracking-tighter uppercase">ORDER SUMMARY</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <span>SUBTOTAL</span>
                  <span className="text-black">TSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <span>SHIPPING</span>
                  <span className="text-black italic">CALCULATED AT CHECKOUT</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">TOTAL</span>
                  <span className="text-3xl font-black text-red-600">TSh {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-black text-white h-16 text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-all duration-300 flex items-center justify-center group"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="pt-6 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                  SECURE CHECKOUT POWERED BY RB FOREVER.<br />
                  WE ACCEPT M-PESA, TIGO PESA & ALL CARDS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
