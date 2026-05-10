import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Home, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0B0F1A]">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #F97316 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 rounded-3xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-8 relative"
          >
             <Zap className="w-12 h-12 text-brand-500" fill="currentColor" />
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500"
             />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display text-8xl font-black mb-4 text-gradient"
          >
            404
          </motion.h1>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl font-bold mb-4 text-white"
          >
            Lost in the stratosphere?
          </motion.h2>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved to a new orbit. Let's get you back on track.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="brand" className="w-full sm:w-auto gap-2 py-4 px-8 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" /> Back to Home
              </Link>
            </Button>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto btn-outline gap-2 py-4 px-8"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
