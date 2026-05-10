import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, border = true, delay = 0, floating = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={floating ? { 
        opacity: 1, 
        y: [0, -8, 0],
      } : { opacity: 1, y: 0 }}
      transition={floating ? {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.4, delay: delay }
      } : { duration: 0.4, delay: delay }}
      whileHover={hover ? { y: -4, scale: 1.01, transition: { duration: 0.2 } } : {}}
      className={`
        ${hover ? 'glass-hover' : 'glass'} 
        rounded-2xl 
        ${border ? 'border border-white/5' : ''} 
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
