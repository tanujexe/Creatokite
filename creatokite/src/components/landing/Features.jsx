import {
  Zap,
  ShieldCheck,
  BarChart2,
  Cpu,
  Users,
  IndianRupee,
  Clock,
  Star,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Instant Campaign Matching',
    desc: 'AI matches you with campaigns that fit your niche, audience, and engagement rate automatically.',
    color: 'text-brand-400',
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Brand Safety',
    desc: 'Every brand is KYC-verified. You never worry about fraud, fake campaigns, or payment issues.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: IndianRupee,
    title: 'Guaranteed Payments',
    desc: 'Brand money is held in escrow before the campaign starts. You get paid on time, every time.',
    color: 'text-gold-400',
    bg: 'bg-gold-400/10',
    border: 'border-gold-400/20',
  },
  {
    icon: BarChart2,
    title: 'Deep Analytics',
    desc: 'Track impressions, reach, engagement, and earnings across all your campaigns in one dashboard.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Growth',
    desc: 'Get AI captions, best posting times, hashtag suggestions, and audience insights powered by Claude AI.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Users,
    title: 'Creator Community',
    desc: "Join India's largest micro-creator network. Collaborate, learn, and grow with creators like you.",
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Clock,
    title: 'Start in 5 Minutes',
    desc: 'Sign up, complete your creator profile, and start applying to live campaigns immediately.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Star,
    title: 'Trust Score System',
    desc: 'Build your creator reputation with verified delivery ratings, audience authenticity, and brand reviews.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    desc: 'Instagram, YouTube, LinkedIn, Moj, Josh — manage all your platform campaigns in one place.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
];

export default function Features() {
  return (
    <section id="creators" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="badge badge-orange mb-4">Platform Features</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="text-gradient">monetise your content</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Creatokite is built ground-up for Indian micro-creators — no
            follower minimums, no agency cuts, no chaos.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="glass-hover rounded-2xl p-6 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
