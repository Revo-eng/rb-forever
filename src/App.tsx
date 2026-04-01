import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import { CartItem, Product } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity }];
    });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
        <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="bottom-right" expand={false} richColors closeButton />
      </div>
    </Router>
  );
}
