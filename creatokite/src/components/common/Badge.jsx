import React from 'react';

const variants = {
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  orange: 'bg-brand-500/15 text-brand-400 border-brand-500/20',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  yellow: 'bg-gold-400/15 text-gold-400 border-gold-400/20',
  red: 'bg-red-500/15 text-red-400 border-red-500/20',
  slate: 'bg-white/5 text-slate-400 border-white/10',
};

export default function Badge({ children, variant = 'orange', className = '', icon: Icon }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant] || variants.orange} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
