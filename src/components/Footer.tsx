import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter">
                RB <span className="text-red-600">FOREVER</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium streetwear for bold individuals. Wear confidence, wear RB Forever. Designed for the trendsetters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=T-Shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link to="/shop?category=Hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Join the Movement</h4>
            <p className="text-white/50 text-sm mb-6">Subscribe to get special offers and first look at new drops.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border-none px-4 py-3 text-sm w-full focus:ring-1 focus:ring-red-600 outline-none"
              />
              <button className="bg-red-600 px-6 py-3 text-sm font-bold hover:bg-red-700 transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} RB FOREVER. All rights reserved.
          </p>
          <div className="flex space-x-6 text-white/30 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
