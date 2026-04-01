import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { DELIVERY_METHODS, PAYMENT_METHODS } from '../constants';
import { toast } from 'sonner';

export default function CheckoutPage({ cart, clearCart }: { cart: CartItem[], clearCart: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dar es Salaam',
    deliveryMethod: 'standard',
    paymentMethod: 'mobile_money'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = DELIVERY_METHODS.find(m => m.id === formData.deliveryMethod)?.price || 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else {
      // Final Order Placement
      toast.success('Order placed successfully!');
      setStep(3);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 5000);
    }
  };

  if (step === 3) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12 flex justify-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={48} />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">ORDER CONFIRMED</h1>
          <p className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
            Thank you for your order, {formData.name.split(' ')[0]}! We've sent a confirmation email to {formData.email}. Your gear will be on its way soon.
          </p>
          <p className="text-sm font-bold text-red-600 uppercase tracking-widest mb-12">ORDER ID: #RB-{Math.floor(Math.random() * 1000000)}</p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-black text-white px-12 py-5 text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-all duration-300"
          >
            BACK TO HOME
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
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')} className="text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-black tracking-tighter uppercase">CHECK<span className="text-red-600">OUT</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
              {step === 1 ? (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black tracking-tighter uppercase">SHIPPING DETAILS</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">FULL NAME</label>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange} required
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">EMAIL ADDRESS</label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">PHONE NUMBER</label>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">CITY</label>
                      <select 
                        name="city" value={formData.city} onChange={handleInputChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none transition-all"
                      >
                        <option value="Dar es Salaam">Dar es Salaam</option>
                        <option value="Arusha">Arusha</option>
                        <option value="Dodoma">Dodoma</option>
                        <option value="Mwanza">Mwanza</option>
                        <option value="Zanzibar">Zanzibar</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">DELIVERY ADDRESS</label>
                      <input 
                        type="text" name="address" value={formData.address} onChange={handleInputChange} required
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 pt-8">
                    <h2 className="text-2xl font-black tracking-tighter uppercase">DELIVERY METHOD</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DELIVERY_METHODS.map(method => (
                        <label 
                          key={method.id}
                          className={`flex items-center justify-between p-6 border-2 cursor-pointer transition-all ${formData.deliveryMethod === method.id ? 'border-red-600 bg-red-50/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" name="deliveryMethod" value={method.id} 
                              checked={formData.deliveryMethod === method.id}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${formData.deliveryMethod === method.id ? 'border-red-600' : 'border-gray-300'}`}>
                              {formData.deliveryMethod === method.id && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase tracking-widest">{method.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{method.time}</p>
                            </div>
                          </div>
                          <p className="text-sm font-black">TSh {method.price.toLocaleString()}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black tracking-tighter uppercase">PAYMENT METHOD</h2>
                  <div className="space-y-4">
                    {PAYMENT_METHODS.map(method => (
                      <label 
                        key={method.id}
                        className={`flex items-center p-6 border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-red-600 bg-red-50/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                      >
                        <input 
                          type="radio" name="paymentMethod" value={method.id} 
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${formData.paymentMethod === method.id ? 'border-red-600' : 'border-gray-300'}`}>
                          {formData.paymentMethod === method.id && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                        </div>
                        <div className="flex items-center flex-grow justify-between">
                          <p className="text-xs font-black uppercase tracking-widest">{method.name}</p>
                          {method.id === 'card' ? <CreditCard size={20} className="text-gray-400" /> : <div className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded">MOBILE MONEY</div>}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-8 space-y-4">
                    <div className="flex items-start space-x-4">
                      <ShieldCheck size={24} className="text-red-600 flex-shrink-0" />
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                        YOUR DATA IS SECURE. WE USE INDUSTRY-STANDARD ENCRYPTION TO PROTECT YOUR PAYMENT INFORMATION.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-black text-white h-20 text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-all duration-300 flex items-center justify-center group"
              >
                {step === 1 ? 'CONTINUE TO PAYMENT' : 'PLACE ORDER'}
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-10 space-y-8 sticky top-32">
              <h2 className="text-2xl font-black tracking-tighter uppercase">YOUR ORDER</h2>
              
              <div className="space-y-6 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-4">
                    <div className="w-16 h-20 bg-gray-200 flex-shrink-0 overflow-hidden">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[10px] font-black uppercase tracking-tighter leading-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SIZE: {item.selectedSize} | QTY: {item.quantity}</p>
                      <p className="text-xs font-bold mt-1">TSh {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>SUBTOTAL</span>
                  <span className="text-black">TSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>SHIPPING</span>
                  <span className="text-black">TSh {shipping.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">TOTAL</span>
                  <span className="text-3xl font-black text-red-600">TSh {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
