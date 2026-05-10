import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    value: 5000,
    suffix: '+',
    label: 'Active Creators',
    desc: 'From 100+ Indian cities',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Brand Campaigns',
    desc: 'Launched successfully',
  },
  {
    value: 1.2,
    suffix: 'Cr+',
    prefix: '₹',
    label: 'Paid to Creators',
    desc: 'And growing every month',
  },
  {
    value: 92,
    suffix: '%',
    label: 'Campaign Success Rate',
    desc: 'Industry-leading quality',
  },
];

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatItem({ stat, started }) {
  const count = useCountUp(stat.value, 2000, started);
  const display =
    stat.value < 10
      ? count.toFixed(1)
      : Math.round(count).toLocaleString('en-IN');

  return (
    <div className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold mb-2">
        {stat.prefix || ''}
        <span className="text-gradient">{display}</span>
        {stat.suffix}
      </div>
      <div className="text-slate-200 font-semibold mb-1">{stat.label}</div>
      <div className="text-sm text-slate-500">{stat.desc}</div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(249,115,22,0.04), transparent)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-3xl border border-white/5 p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-8 lg:divide-x divide-white/5">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
