import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

const TRUST_INDICATORS = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'PREMIUM QUALITY',
    description: 'Hand-selected heavyweight fabrics for durability and comfort.'
  },
  {
    icon: <Truck size={32} />,
    title: 'FAST DELIVERY',
    description: 'Reliable shipping across Tanzania with real-time tracking.'
  },
  {
    icon: <RotateCcw size={32} />,
    title: 'EASY RETURNS',
    description: 'Simple 7-day exchange policy for complete peace of mind.'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'SECURE PAYMENT',
    description: 'Safe transactions via Mobile Money or Credit Cards.'
  }
];

export default function BrandStory() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {TRUST_INDICATORS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-red-600 mb-2">{item.icon}</div>
              <h3 className="text-sm font-black tracking-widest uppercase">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed max-w-[200px]">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-red-600 text-xs font-black tracking-widest uppercase block">
              THE RB FOREVER LEGACY
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
              BEYOND <span className="text-red-600">CLOTHING.</span><br />
              IT'S A LIFESTYLE.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              RB Forever was born from the streets of Dar es Salaam with a single mission: to empower individuals through bold, premium streetwear. We don't just make clothes; we craft identities.
            </p>
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              Every stitch, every fabric choice, and every design is a testament to our commitment to excellence. We believe that what you wear should reflect your inner confidence and ambition.
            </p>
            <div className="pt-4">
              <button className="bg-white text-black px-10 py-5 text-sm font-black tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300">
                OUR FULL STORY
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-4 border-l-4 border-red-600 z-10 hidden md:block" />
            <img 
              src="https://picsum.photos/seed/brand/800/800" 
              alt="RB Forever Brand Story" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-4 border-r-4 border-red-600 z-10 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
