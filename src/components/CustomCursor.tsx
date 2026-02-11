import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check for hoverable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, select, [data-cursor]');
      setIsHovering(!!isClickable);

      if (target.closest('[data-cursor="drag"]')) setCursorText("Drag");
      else if (target.closest('[data-cursor="explore"]')) setCursorText("Explore");
      else if (target.closest('[data-cursor="open"]')) setCursorText("Open");
      else if (target.closest('[data-cursor="quote"]')) setCursorText("Quote");
      else setCursorText("");
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-safety-orange rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      
      {/* Follower Ring */}
      <motion.div
        className={`fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[100] flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'bg-white/10 backdrop-blur-sm' : ''}`}
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 16),
          y: mousePosition.y - (isHovering ? 32 : 16),
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          borderColor: isHovering ? 'rgba(255, 85, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
