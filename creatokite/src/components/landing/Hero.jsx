import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, IndianRupee } from 'lucide-react';

const floatingCreators = [
  {
    name: 'Priya S.',
    handle: '@priyacreates',
    followers: '12.4K',
    platform: 'Instagram',
    avatar: 'P',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Rahul M.',
    handle: '@rahultech',
    followers: '8.2K',
    platform: 'YouTube',
    avatar: 'R',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Ananya K.',
    handle: '@ananyastyle',
    followers: '21K',
    platform: 'Instagram',
    avatar: 'A',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, #F97316 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse, #FBBF24 0%, transparent 70%)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm text-brand-300 font-medium">
                India's First Micro-Creator Network
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              Earn from your{' '}
              <span className="relative">
                <span className="text-gradient">content</span>
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C40 2 80 1 100 1C120 1 160 2 198 6"
                    stroke="#F97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{' '}
              with just 1K followers
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Connect with top Indian brands, run paid campaigns, and grow your
              creator career — no matter how small your audience. Real money,
              real brands, real growth.
            </motion.p>

            {/* CTA buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/register"
                className="btn-brand flex items-center gap-2 px-8 py-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                Start Earning Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how" className="btn-outline flex items-center gap-2 px-8 py-4">
                <Play className="w-4 h-4 fill-current" />
                See how it works
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-400" />
                <span>5,000+ Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                <span>300+ Active Campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-brand-400" />
                <span>₹1.2Cr+ Paid Out</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block">
            {/* Central card */}
            <div className="relative mx-auto w-[340px]">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{ boxShadow: '0 0 80px 20px rgba(249,115,22,0.4)' }}
              />

              {/* Main dashboard preview */}
              <div className="glass rounded-3xl border border-white/10 p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-300">
                    Campaign Earnings
                  </span>
                  <span className="badge badge-green">Live</span>
                </div>

                <div className="text-4xl font-display font-bold mb-1">
                  ₹<span className="text-gradient">42,800</span>
                </div>
                <div className="text-xs text-slate-500 mb-5">
                  This month · 4 campaigns
                </div>

                {/* Mini bar chart */}
                <div className="flex items-end gap-2 h-20 mb-4">
                  {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 5
                            ? 'linear-gradient(to top, #F97316, #FBBF24)'
                            : 'rgba(249,115,22,0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Campaigns */}
                {['Nykaa Beauty', 'boAt Audio', 'UrbanClap'].map((brand, i) => (
                  <div
                    key={brand}
                    className="flex items-center justify-between py-2.5 border-t border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-400">
                        {brand[0]}
                      </div>
                      <span className="text-sm text-slate-300">{brand}</span>
                    </div>
                    <span className="text-sm font-semibold text-brand-400">
                      +₹{[12000, 18000, 12800][i].toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating creator cards */}
              {floatingCreators.map((c, i) => (
                <div
                  key={c.name}
                  className="absolute glass border border-white/10 rounded-2xl p-3 flex items-center gap-3 w-44"
                  style={{
                    top: i === 0 ? '-48px' : i === 1 ? '50%' : 'auto',
                    bottom: i === 2 ? '-32px' : 'auto',
                    left: i === 1 ? '-128px' : 'auto',
                    right: i === 0 ? '-32px' : i === 2 ? '-64px' : 'auto',
                    animationDelay: `${i * 1.5}s`,
                    animation: 'float 6s ease-in-out infinite',
                  }}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {c.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {c.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {c.followers} · {c.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-xs text-slate-600">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  );
}
