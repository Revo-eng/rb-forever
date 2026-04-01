import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
            {isLogin ? 'WELCOME BACK' : 'JOIN THE MOVEMENT'}
          </h1>
          <p className="text-gray-500 font-medium">
            {isLogin ? 'Login to your RB Forever account.' : 'Create an account and start your journey.'}
          </p>
        </div>

        <div className="bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
          <form className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">FULL NAME</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white border-2 border-transparent focus:border-red-600 px-12 py-4 text-sm font-bold outline-none transition-all"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white border-2 border-transparent focus:border-red-600 px-12 py-4 text-sm font-bold outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-transparent focus:border-red-600 px-12 py-4 text-sm font-bold outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white h-16 text-sm font-black tracking-widest uppercase hover:bg-red-600 transition-all duration-300 flex items-center justify-center group"
            >
              {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">OR CONTINUE WITH</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-100 py-3 rounded-lg hover:border-black transition-all">
                <Chrome size={18} />
                <span className="text-xs font-bold">GOOGLE</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-100 py-3 rounded-lg hover:border-black transition-all">
                <Github size={18} />
                <span className="text-xs font-bold">GITHUB</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOGIN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
