import { motion } from 'framer-motion';

const variants = {
  brand: 'btn-brand',
  outline: 'btn-outline',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
  danger: 'text-red-400 hover:bg-red-500/5',
};

export default function Button({ 
  children, 
  variant = 'brand', 
  className = '', 
  icon: Icon, 
  loading, 
  disabled,
  ...props 
}) {
  const baseClass = 'inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none rounded-xl font-medium px-6 py-3';
  
  return (
    <motion.button 
      whileHover={{ 
        scale: 1.02,
        rotate: [0, -1, 1, -1, 0],
      }}
      transition={{ 
        rotate: { duration: 0.3, repeat: Infinity }
      }}
      whileTap={{ scale: 0.96 }}
      className={`${variant === 'brand' || variant === 'outline' ? '' : baseClass} ${variants[variant]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {children}
    </motion.button>
  );
}
