import { Link } from 'react-router-dom';
import { Zap, Instagram, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

const links = {
  Platform: [
    { label: 'For Creators', href: '#creators' },
    { label: 'For Brands', href: '#brands' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Features', href: '#ai' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl">
                Creato<span className="text-gradient">kite</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              India's first micro-creator network. Helping 5,000+ creators earn
              with brands they love.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: 'https://instagram.com/creatokite' },
                { Icon: Twitter, href: 'https://twitter.com/creatokite' },
                { Icon: Youtube, href: 'https://youtube.com/@creatokite' },
                {
                  Icon: Linkedin,
                  href: 'https://linkedin.com/company/creatokite',
                },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="mailto:hello@creatokite.com"
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            © {new Date().getFullYear()} Creatokite. All rights reserved.
          </span>
          <span>Made with ❤️ for Indian creators</span>
        </div>
      </div>
    </footer>
  );
}
