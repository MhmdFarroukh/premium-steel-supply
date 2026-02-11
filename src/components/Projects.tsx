import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Mining Infrastructure Expansion",
    location: "Kolwezi, RDC",
    tags: ["Structural Steel", "Beams", "1200 Tons"],
    image: "https://images.unsplash.com/photo-1629409669372-e326fb4253c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMHN0ZWVsJTIwYmVhbXMlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzcwNzMzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Commercial Warehouse Complex",
    location: "Lubumbashi, RDC",
    tags: ["Rebar", "Mesh", "Foundation"],
    image: "https://images.unsplash.com/photo-1763771787035-99c6c28ec78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwaW5kdXN0cmlhbCUyMHN0ZWVsJTIwd2FyZWhvdXNlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwNzMzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Bridge Reinforcement",
    location: "Likasi, RDC",
    tags: ["Custom Fabrication", "High-Tensile"],
    image: "https://images.unsplash.com/photo-1714736837073-0445849aefae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHJlYmFyJTIwY29uc3RydWN0aW9uJTIwc2l0ZSUyMG1hY3JvfGVufDF8fHx8MTc3MDczMzE4MHww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-graphite text-white" id="projects">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">05 Projects</span>
            <h2 className="text-4xl md:text-6xl font-bold">Projects supplied <br /> across RDC.</h2>
          </div>
          <p className="text-gray-400 max-w-sm mt-8 md:mt-0">
            A selection of deliveries and site support. Ask for a quote on a similar scope.
          </p>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="relative border-t border-white/10 group cursor-none"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="explore"
            >
              <div className="py-12 flex flex-col md:flex-row md:items-center justify-between z-10 relative px-4 group-hover:px-8 transition-all duration-500">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-3xl font-light group-hover:text-safety-orange transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{project.location}</p>
                </div>
                
                <div className="flex items-center gap-6">
                   <div className="hidden md:flex gap-2">
                     {project.tags.map((tag, i) => (
                       <span key={i} className="text-xs border border-white/20 rounded-full px-3 py-1 text-gray-400">
                         {tag}
                       </span>
                     ))}
                   </div>
                   <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-safety-orange" />
                </div>
              </div>

              {/* Hover Image Reveal (Desktop) */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] pointer-events-none z-0 hidden md:block overflow-hidden rounded-sm"
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 grayscale" />
                    <div className="absolute inset-0 bg-safety-orange/10 mix-blend-overlay"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-white/10"></div>
        </div>
      </div>
    </section>
  );
}
