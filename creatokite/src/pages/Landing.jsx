import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import AISection from '../components/landing/AISection';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/layout/Footer';

import PageTransition from '../components/common/PageTransition';

export default function Landing() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Features />
          <HowItWorks />
          <AISection />
          {/* Brands section */}
          <BrandsSection />
          <Pricing />
          {/* Testimonials */}
          <Testimonials />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

function BrandsSection() {
  const brands = [
    'Nykaa',
    'boAt',
    'Mamaearth',
    'Lenskart',
    'Meesho',
    'mCaffeine',
    'WOW',
    'Mivi',
  ];
  return (
    <section id="brands" className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-slate-500 uppercase tracking-widest mb-8">
          Trusted by India's fastest-growing D2C brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {brands.map((b) => (
            <div
              key={b}
              className="px-5 py-2.5 rounded-xl glass border border-white/5 text-slate-300 font-display font-semibold text-sm hover:border-brand-500/20 hover:text-white transition-all"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      text: 'I made ₹22,000 in my first month on Creatokite with just 4,000 Instagram followers. The AI matching is insane — campaigns literally come to me now.',
      name: 'Priya Sharma',
      handle: '@priyacreates',
      role: 'Lifestyle Creator · Mumbai',
      avatar: 'P',
      earnings: '₹22,000/mo',
    },
    {
      text: "As a brand, finding authentic micro-creators was always a nightmare. Creatokite's trust scores and fraud detection saved us from fake influencers completely.",
      name: 'Vikram Nair',
      handle: 'UrbanFit Brand',
      role: 'Marketing Head · Bangalore',
      avatar: 'V',
      earnings: '5x ROI',
    },
    {
      text: "The AI caption generator alone is worth it. My Instagram engagement went up 3x within 2 weeks of using Creatokite's suggestions. Game changer.",
      name: 'Ananya Kohli',
      handle: '@ananyastyle',
      role: 'Fashion Creator · Delhi',
      avatar: 'A',
      earnings: '₹38,000/mo',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="badge badge-orange mb-4">Creators Love Us</span>
          <h2 className="font-display text-4xl font-bold mb-2">
            Real results from{' '}
            <span className="text-gradient">real creators</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-hover rounded-3xl p-7">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold-400 text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center font-bold text-brand-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
                <span className="badge badge-green text-sm font-bold">
                  {t.earnings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
