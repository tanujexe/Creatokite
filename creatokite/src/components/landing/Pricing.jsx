import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Creator Free',
    price: 0,
    period: 'forever',
    desc: 'Perfect for new creators starting their journey.',
    badge: null,
    features: [
      'Up to 3 active campaign applications',
      'Basic creator profile',
      'Standard campaign discovery',
      'Secure payment via escrow',
      'Community access',
      'Email support',
    ],
    cta: 'Start for Free',
    href: '/register',
    variant: 'outline',
  },
  {
    name: 'Creator Pro',
    price: 299,
    period: 'month',
    desc: 'For serious creators ready to scale income.',
    badge: 'Most Popular',
    features: [
      'Unlimited campaign applications',
      'Priority creator matching (AI)',
      'AI caption & content generator',
      'Advanced analytics dashboard',
      'Verified creator badge',
      'Priority payment (48 hrs)',
      'Dedicated support',
      'Creator Academy access',
    ],
    cta: 'Start Pro Free — 14 days',
    href: '/register?plan=pro',
    variant: 'brand',
  },
  {
    name: 'Brand Starter',
    price: 1999,
    period: 'month',
    desc: 'For brands launching their first creator campaigns.',
    badge: null,
    features: [
      '5 active campaigns',
      'Access to 5,000+ creators',
      'AI creator recommendations',
      'Basic campaign analytics',
      'Content approval workflow',
      'Brand support',
    ],
    cta: 'Start Brand Plan',
    href: '/register?role=brand',
    variant: 'outline',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="badge badge-orange mb-4">Simple Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Transparent, <span className="text-gradient">no hidden fees</span>
          </h2>
          <p className="text-slate-400">
            Creators keep 90% of campaign earnings. No agency cuts. No
            surprises.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-7 flex flex-col ${
                plan.badge
                  ? 'border-2 border-brand-500/50 bg-gradient-to-b from-brand-500/5 to-transparent'
                  : 'glass border border-white/5'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-orange px-4 py-1 font-semibold">
                    <Zap className="w-3 h-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="font-display text-4xl font-bold">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-bold">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400 text-sm">
                        /{plan.period}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={
                  plan.variant === 'brand'
                    ? 'btn-brand text-center'
                    : 'btn-outline text-center'
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise note */}
        <div className="text-center mt-10 text-sm text-slate-500">
          Need enterprise features?{' '}
          <a
            href="mailto:brands@creatokite.com"
            className="text-brand-400 hover:text-brand-300 transition-colors"
          >
            Contact us for custom plans
          </a>
        </div>
      </div>
    </section>
  );
}
