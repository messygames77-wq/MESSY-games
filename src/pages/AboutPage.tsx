import React from 'react';
import { Page } from '../types';
import { Flame, Sparkles, Trophy, Users, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Brand Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>BEHIND THE CHAOS</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          WE MAKE GAMES <span className="text-amber-400">MESSY.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          MESSY GAMES is an independent card game studio founded in Cairo. We design social, fast-paced, and hilarious tabletop games specifically engineered to turn quiet hangouts into electric, chaotic memory factories.
        </p>
      </div>

      {/* 1. WHY MESSY */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 flex justify-center">
          <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-amber-400 to-purple-600 p-1 shadow-[0_0_30px_rgba(250,204,21,0.25)]">
            <div className="w-full h-full rounded-[22px] bg-[#0A0E1A] flex flex-col items-center justify-center p-4 text-center">
              <Flame className="w-10 h-10 text-amber-400 mb-1" />
              <span className="font-display font-black text-white text-lg tracking-wider">WHY MESSY</span>
              <span className="text-[10px] text-purple-300 font-bold uppercase">The Origin Story</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-3">
          <h2 className="font-display font-black text-2xl text-white uppercase">
            Because Normal Board Games Are Too Polite
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Most card games force you to sit politely, count points quietly, and read 40 pages of confusing manuals. We hate that.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            MESSY GAMES was born when a group of friends realized the most memorable moments at the table were always the dramatic betrayals, the sudden plot twists, and the uncontrollable laughter when a bluff collapsed. We design games where table energy is high, rounds are snappy, and everyone is instantly engaged.
          </p>
        </div>
      </div>

      {/* 2. HOW THE GAMES ARE MADE */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
            How The Games Are Made
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From wild scribbles on index cards to casino-grade boxed releases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0C1124] border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-display font-black text-sm">
              01
            </div>
            <h3 className="font-display font-extrabold text-base text-white uppercase">
              100+ Hours Playtesting
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every prototype goes through dozens of intense blind playtest sessions across Cairo cafes, living rooms, and tournaments until the pacing is airtight.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0C1124] border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center font-display font-black text-sm">
              02
            </div>
            <h3 className="font-display font-extrabold text-base text-white uppercase">
              Casino-Grade Linen Finish
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never cut corners on materials. Our cards feature 330gsm black-core stock with air-cushion linen embossing and water-resistant coatings for Egyptian tea & soda defense.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0C1124] border border-white/10 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-display font-black text-sm">
              03
            </div>
            <h3 className="font-display font-extrabold text-base text-white uppercase">
              Bilingual & Culturally Grounded
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every card, prompt, and rulebook is meticulously written in both English and clear, colloquial Egyptian Arabic so any friend or cousin can play instantly.
            </p>
          </div>
        </div>
      </div>

      {/* 3. BRAND VALUES */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-xl space-y-6">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase text-center">
          Our Brand Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <Users className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase">
                Human Connection First
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Screens isolate us. Games bring us together. Our mission is sparking eye-to-eye laughter and genuine human connection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <Trophy className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase">
                Zero Boring Turns
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If a player is sitting waiting for their turn without interacting, we scrap that rule. Everyone is in the game at all times.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <Flame className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase">
                Unapologetic Fun
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We embrace silly moments, audacious bluffing, and chaotic plot twists. No pretentiousness allowed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase">
                Local Community Commitment
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed, packaged, and shipped with pride across Egypt, with dedicated local customer support on WhatsApp and email.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-4 space-y-4">
        <h3 className="font-display font-black text-xl text-white uppercase">
          Ready to experience the mess yourself?
        </h3>
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
        >
          <span>BROWSE OUR GAMES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
