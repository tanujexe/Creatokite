import {
  Cpu,
  Sparkles,
  Target,
  TrendingUp,
  ShieldAlert,
  MessageSquare,
} from 'lucide-react';

const aiFeatures = [
  {
    icon: Target,
    title: 'Smart Creator Matching',
    desc: 'AI scores and recommends the perfect creator-brand fit based on engagement quality, audience trust, and campaign history.',
    tag: 'Powered by AI',
  },
  {
    icon: Sparkles,
    title: 'AI Caption Generator',
    desc: 'Generate scroll-stopping Instagram captions, YouTube descriptions, and hashtag sets tailored to your content.',
    tag: 'Powered by AI',
  },
  {
    icon: TrendingUp,
    title: 'Predictive ROI Analytics',
    desc: 'Predict campaign reach, engagement rates, and ROI before launching — make smarter budget decisions.',
    tag: 'Powered by AI',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud & Bot Detection',
    desc: 'Automatically detect fake followers, bot engagement, and inflated metrics to protect brand budgets.',
    tag: 'Powered by AI',
  },
  {
    icon: MessageSquare,
    title: 'Campaign Strategy Assistant',
    desc: 'Tell our AI your product category and budget — get a complete campaign strategy with creator categories, content ideas, and expected reach.',
    tag: 'Powered by AI',
  },
  {
    icon: TrendingUp,
    title: 'Audience Quality Score',
    desc: 'Deep-analyze audience interests, demographics, location distribution, and engagement authenticity for every creator.',
    tag: 'Powered by AI',
  },
];

export default function AISection() {
  return (
    <section className="py-24 relative" id="ai">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              AI-Powered Platform
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Intelligence built{' '}
            <span className="text-gradient">into every feature</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Creatokite uses cutting-edge AI to automate decisions, predict
            performance, and protect everyone on the platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl p-6 border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/30"
                style={{ background: 'rgba(17, 24, 39, 0.6)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at top left, rgba(139,92,246,0.08) 0%, transparent 70%)',
                  }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="badge text-purple-400 bg-purple-500/10 border-purple-500/20 text-[10px]">
                    ✦ AI
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* AI Demo CTA */}
        <div className="mt-12 glass rounded-3xl border border-purple-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">
              Try the AI Campaign Assistant
            </h3>
            <p className="text-slate-400">
              Describe your brand and get a complete campaign strategy in
              seconds.
            </p>
          </div>
          <a href="/register" className="btn-brand flex-shrink-0">
            Try AI Features Free →
          </a>
        </div>
      </div>
    </section>
  );
}
