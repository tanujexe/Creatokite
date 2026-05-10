import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ label, value, change, up, icon: Icon, color = 'brand' }) {
  const colorMap = {
    brand: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.brand}`}>
            <Icon className="w-4 h-4" />
          </div>
          {change && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
              {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {change}
            </span>
          )}
        </div>
        <div className="font-display text-2xl font-bold mb-0.5">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </Card>
    </motion.div>
  );
}
