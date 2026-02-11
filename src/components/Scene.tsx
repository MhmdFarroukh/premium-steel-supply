import React from 'react';
import { motion } from 'framer-motion';

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">
      {/* Ambient Glows to simulate lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff5500]/[0.05] blur-[100px] rounded-full mix-blend-screen" />

      {/* The Monolith (2D CSS emulation) */}
      <motion.div
        className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[200px] h-[460px] sm:w-[240px] sm:h-[540px] md:w-[320px] md:h-[720px] bg-[#222] opacity-80"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        initial={{ y: 0, rotateY: -15, rotateX: 5 }}
        animate={{ 
          y: [-15, 15, -15],
          rotateY: [-12, -18, -12],
          rotateX: [4, 6, 4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Front Face Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#444] to-[#111] border border-white/10 shadow-2xl">
           {/* Brushed Metal Grain Effect (local CSS noise - no network) */}
           <div className="absolute inset-0 opacity-15" style={{
             backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)`
           }} />
           
           {/* Specular Highlight */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
        </div>

        {/* Side Face (Simulated 3D depth) */}
        <div 
          className="absolute top-0 right-0 h-full w-[40px] bg-[#0a0a0a] origin-right transform translate-x-full rotate-y-90 border-r border-t border-b border-white/5"
          style={{ transform: "rotateY(90deg) translateX(20px) translateZ(-20px)" }} // Simplified approximation
        />
        
        {/* Glow/Shadow behind */}
        <div className="absolute -inset-4 bg-black/50 blur-2xl -z-10" />
      </motion.div>

      {/* On small screens, reduce visual weight */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-r from-graphite via-transparent to-graphite opacity-80" />
    </div>
  );
}
