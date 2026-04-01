import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Juma M.',
    role: 'Fashion Influencer',
    text: 'The quality of the RB Forever hoodies is unmatched in Tanzania. The heavyweight fabric feels premium and the fit is perfect.',
    rating: 5
  },
  {
    name: 'Sarah K.',
    role: 'Creative Director',
    text: 'I love the minimalist yet bold designs. RB Forever has become my go-to brand for everyday streetwear that makes a statement.',
    rating: 5
  },
  {
    name: 'David L.',
    role: 'Entrepreneur',
    text: 'Fast delivery and excellent customer service. The cargo pants are incredibly durable and stylish. Highly recommend!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-4 block">
            VOICES OF THE MOVEMENT
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase">
            WORN BY <span className="text-red-600">TRENDSETTERS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 relative shadow-sm border border-gray-100 group hover:border-red-600 transition-colors duration-300"
            >
              <Quote size={40} className="text-red-600/10 absolute top-6 right-6 group-hover:text-red-600/20 transition-colors" />
              <div className="flex space-x-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-red-600 text-red-600" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">"{item.text}"</p>
              <div>
                <h4 className="font-black text-black uppercase tracking-tight">{item.name}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Gallery Mockup */}
        <div className="mt-32">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-2xl font-black tracking-tight uppercase">@RB_FOREVER_OFFICIAL</h3>
            <a href="#" className="text-sm font-bold text-red-600 hover:underline">FOLLOW US</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 overflow-hidden relative group cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/insta${i}/400/400`} 
                  alt="Instagram Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Instagram } from 'lucide-react';
