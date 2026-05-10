import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Loader({ full = false, message = 'Loading...' }) {
  if (full) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F1A]">
        <div className="relative">
          {/* Pulsing rings */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-brand-500"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.1, 0] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-brand-500"
          />
          
          {/* Center Logo */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-20 rounded-2xl bg-brand-500 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)]"
          >
            <Zap className="w-10 h-10 text-white" fill="currentColor" />
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 font-display font-medium text-slate-300 tracking-widest uppercase text-sm"
        >
          {message}
        </motion.p>
        
        {/* Loading bar */}
        <div className="mt-4 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full bg-gradient-to-r from-transparent via-brand-500 to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      {message && <p className="mt-4 text-sm text-slate-500 font-medium">{message}</p>}
    </div>
  );
}
