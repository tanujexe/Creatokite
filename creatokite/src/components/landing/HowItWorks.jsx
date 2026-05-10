import { UserPlus, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const creatorSteps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create your profile',
    desc: 'Connect your social accounts, add your niche, and complete your creator profile in 5 minutes.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Browse & apply',
    desc: 'Discover campaigns matching your niche. AI recommends the best ones for your audience.',
  },
  {
    icon: CheckCircle2,
    step: '03',
    title: 'Create & get paid',
    desc: 'Deliver content, get approved by brand, and receive payment directly to your bank account.',
  },
];

const brandSteps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Post your campaign',
    desc: 'Describe your brand, campaign goals, and budget. Our AI finds perfect-match creators.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Review & approve',
    desc: 'Browse creator applications, see trust scores, and approve content before it goes live.',
  },
  {
    icon: CheckCircle2,
    step: '03',
    title: 'Track ROI in real time',
    desc: 'Monitor reach, engagement, and conversions across all your campaign creators live.',
  },
];

function Steps({ steps, color }) {
  return (
    <div className="space-y-6">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div 
            key={s.step} 
            initial={{ opacity: 0, x: color === 'brand' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-5 group"
          >
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color === 'brand' ? 'bg-brand-500/15 border border-brand-500/30' : 'bg-blue-500/15 border border-blue-500/30'}`}
              >
                <Icon
                  className={`w-5 h-5 ${color === 'brand' ? 'text-brand-400' : 'text-blue-400'}`}
                />
              </div>
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />
              )}
            </div>
            <div className="pt-1">
              <div
                className={`text-xs font-mono font-bold mb-1 ${color === 'brand' ? 'text-brand-500' : 'text-blue-500'}`}
              >
                {s.step}
              </div>
              <h4 className="font-display font-semibold text-lg mb-1">
                {s.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="badge badge-orange mb-4">Simple Process</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            How <span className="text-gradient">Creatokite</span> works
          </h2>
          <p className="text-slate-400">
            For both creators and brands — simple, transparent, and fast.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Creators */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="badge badge-orange">For Creators</div>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <Steps steps={creatorSteps} color="brand" />
            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="/register"
                className="btn-brand text-sm inline-flex items-center gap-2"
              >
                Join as Creator <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Brands */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="badge badge-blue">For Brands</div>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <Steps steps={brandSteps} color="blue" />
            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="/register?role=brand"
                className="btn-outline text-sm inline-flex items-center gap-2"
              >
                List as Brand <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
