import React from 'react';
import { Page } from '../types';
import { ShieldCheck, Truck, RotateCcw, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="mt-20 border-t border-white/10 bg-[#060810] text-slate-400">
      {/* Top Value Propositions */}
      <div className="border-b border-white/5 bg-[#090D18]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Fast Egypt Shipping</h4>
                <p className="text-xs text-slate-400 mt-0.5">Cairo & Giza 24-48 hrs, all governorates</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cash on Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Pay safely at your doorstep upon receipt</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Premium Cardstock</h4>
                <p className="text-xs text-slate-400 mt-0.5">Linen finish, spill-resistant gaming cards</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hassle-Free Returns</h4>
                <p className="text-xs text-slate-400 mt-0.5">14-day replacement guarantee on unopened games</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 p-0.5">
                <div className="w-full h-full rounded-[6px] bg-[#0A0E1A] flex items-center justify-center font-display font-black text-amber-400 text-sm">
                  MG
                </div>
              </div>
              <span className="font-display font-black text-xl text-white tracking-wider uppercase">
                MESSY <span className="text-amber-400">GAMES</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              We design chaotic, competitive, and social card games built to make friends laugh and bring unforgettable energy to every game night.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">HQ:</span> Cairo, Egypt &bull; Shipping nationwide
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Explore
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Customer Support
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs & Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-amber-400/90 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Connect With Us
            </h5>
            <p className="text-xs text-slate-400">
              Follow our community on social channels for game night reels and tournament drops:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                @messygames
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                TikTok
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                Instagram
              </span>
            </div>
            <div className="text-xs text-slate-400 pt-1">
              Direct email: <span className="text-slate-300">messy.games77@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MESSY GAMES Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
              Shipping Policy
            </button>
            <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              Wholesale Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
