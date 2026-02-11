import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Fabrication() {
  return (
    <section className="py-24 bg-zinc-900 relative overflow-hidden" id="fabrication">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40" data-parallax>
        <img 
          src="https://images.unsplash.com/photo-1641471349326-a95b709b946f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxkaW5nJTIwc3BhcmtzJTIwaW5kdXN0cmlhbCUyMGRhcmslMjBmYWN0b3J5fGVufDF8fHx8MTc3MDczMzE4MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Welding sparks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl" data-reveal="up">
          <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">04 Fabrication</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Fabrication support when <span className="text-gray-500">precision matters.</span>
          </h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
            We coordinate fabrication steps to reduce on-site work and keep timelines predictable. From simple cutting to complex assembly staging.
          </p>

          <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12" data-stagger>
            {['Cutting', 'Bending', 'Welding', 'Staging'].map((item, i) => (
              <motion.div 
                key={i}
                data-stagger-item
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-1.5 h-1.5 bg-safety-orange"></div>
                <span className="text-2xl font-light text-white">{item}</span>
              </motion.div>
            ))}
          </div>

          <a 
             href="#contact"
             className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
             data-cursor="quote"
          >
             Send your specs
             <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
