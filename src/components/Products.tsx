import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const products = [
  {
    title: "Rebar",
    desc: "High-tensile reinforcement bars for structural concrete applications.",
    specs: "Grades • Diameters • Bundles",
    image: "https://images.unsplash.com/photo-1714736837073-0445849aefae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHJlYmFyJTIwY29uc3RydWN0aW9uJTIwc2l0ZSUyMG1hY3JvfGVufDF8fHx8MTc3MDczMzE4MHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Steel Beams",
    desc: "IPE, HEA, and HEB profiles for heavy load-bearing structures.",
    specs: "I/H profiles • Lengths • Project supply",
    image: "https://images.unsplash.com/photo-1629409669372-e326fb4253c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMHN0ZWVsJTIwYmVhbXMlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzcwNzMzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Sheets & Plates",
    desc: "Hot and cold rolled steel plates for fabrication and flooring.",
    specs: "Thickness • Formats • Cutting options",
    image: "https://images.unsplash.com/photo-1763771787035-99c6c28ec78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwaW5kdXN0cmlhbCUyMHN0ZWVsJTIwd2FyZWhvdXNlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwNzMzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Pipes & Tubes",
    desc: "Seamless and welded tubes for industrial piping and structures.",
    specs: "Diameters • Wall thickness • Lengths",
    image: "https://images.unsplash.com/photo-1641471349326-a95b709b946f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxkaW5nJTIwc3BhcmtzJTIwaW5kdXN0cmlhbCUyMGRhcmslMjBmYWN0b3J5fGVufDF8fHx8MTc3MDczMzE4MHww&ixlib=rb-4.1.0&q=80&w=1080" // Reusing welding/pipes vibe
  }
];

export default function Products() {
  return (
    <section className="bg-white text-graphite py-24" id="products">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20" data-reveal="up">
          <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">03 Products</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Products, organized <br /> for procurement.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Standard sizes and project quantities. Tell us what you need—we’ll quote and coordinate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-stagger>
          {products.map((product, index) => (
            <motion.div 
              key={index}
              data-stagger-item
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="group cursor-none"
              data-cursor="open"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                 {/* Image Overlay */}
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                 
                 <img 
                   src={product.image} 
                   alt={product.title}
                   loading="lazy"
                   decoding="async"
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                 />
              </div>

              <div className="flex justify-between items-start border-b border-gray-200 pb-6 group-hover:border-safety-orange transition-colors duration-300">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-3">{product.desc}</p>
                  <div className="flex gap-2">
                    {product.specs.split('•').map((tag, i) => (
                      <span key={i} className="text-xs font-mono bg-gray-100 px-2 py-1 text-gray-500">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-safety-orange group-hover:border-safety-orange group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-100 flex items-center justify-between flex-wrap gap-4 border border-gray-200">
            <div>
                <h4 className="text-lg font-bold">Product Catalog</h4>
                <p className="text-gray-500 text-sm">Full specifications and weight tables.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-safety-orange transition-colors">
                Download Overview (PDF) <Download size={16} />
            </button>
        </div>

      </div>
    </section>
  );
}
