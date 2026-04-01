import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Package, ShoppingBag, Users, TrendingUp, DollarSign, Image as ImageIcon, X } from 'lucide-react';
import { CATEGORIES, SIZES } from '../constants';
import { Product } from '../types';
import { toast } from 'sonner';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'stats'>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
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
    }
  ]);

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Sidebar / Navigation */}
      <div className="fixed left-0 top-20 bottom-0 w-64 bg-black text-white hidden lg:block p-8 space-y-12">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">MANAGEMENT</p>
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-4 w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'products' ? 'bg-red-600 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <Package size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-4 w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'orders' ? 'bg-red-600 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <ShoppingBag size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex items-center space-x-4 w-full px-4 py-3 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-red-600 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <TrendingUp size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">ADMIN <span className="text-red-600">DASHBOARD</span></h1>
              <p className="text-gray-500 font-medium">Manage your brand, products, and orders.</p>
            </div>
            {activeTab === 'products' && (
              <button 
                onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                className="bg-black text-white px-8 py-4 text-xs font-black tracking-widest uppercase hover:bg-red-600 transition-all flex items-center"
              >
                <Plus size={18} className="mr-2" />
                ADD NEW PRODUCT
              </button>
            )}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Sales', value: 'TSh 4.2M', icon: <DollarSign size={24} />, color: 'bg-green-100 text-green-600' },
              { label: 'Orders', value: '128', icon: <ShoppingBag size={24} />, color: 'bg-blue-100 text-blue-600' },
              { label: 'Products', value: products.length.toString(), icon: <Package size={24} />, color: 'bg-purple-100 text-purple-600' },
              { label: 'Customers', value: '85', icon: <Users size={24} />, color: 'bg-orange-100 text-orange-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'products' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-tight">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-500">{product.category}</td>
                        <td className="px-8 py-6 text-sm font-black">TSh {product.price.toLocaleString()}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {product.stock} IN STOCK
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-black transition-colors"><Edit size={18} /></button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="p-20 text-center">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tighter">NO ORDERS YET</h3>
                <p className="text-gray-400 text-sm mt-2">When customers buy your gear, orders will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal Mockup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6 bg-black text-white flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-widest">ADD NEW PRODUCT</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">PRODUCT NAME</label>
                  <input type="text" className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CATEGORY</label>
                  <select className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">PRICE (TSH)</label>
                  <input type="number" className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">STOCK QUANTITY</label>
                  <input type="number" className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">DESCRIPTION</label>
                <textarea rows={4} className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 px-6 py-4 text-sm font-bold outline-none resize-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">PRODUCT IMAGES</label>
                <div className="grid grid-cols-4 gap-4">
                  <button className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-red-600 hover:text-red-600 transition-all">
                    <Plus size={24} />
                    <span className="text-[8px] font-black mt-2">UPLOAD</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex space-x-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-grow bg-white border-2 border-gray-200 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all">CANCEL</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-grow bg-black text-white py-4 text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all">SAVE PRODUCT</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
