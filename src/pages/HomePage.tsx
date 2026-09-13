import React from 'react';
import { Product, Page } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductVisual } from '../components/ProductVisual';
import { ArrowRight, Sparkles, Flame, Users, Trophy, ChevronRight, Zap } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: Page, params?: any) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Top picks: only 3 featured games
  const topPicks = products.slice(0, 3);
  const flagshipProduct = products[0]; // MESSY MAYHEM

  return (
    <div id="home-page" className="relative space-y-16 sm:space-y-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14 pb-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE NEW ERA OF CARD NIGHTS</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white uppercase leading-[1.05]">
              GAMES GET <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]">MESSY.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              MESSY GAMES creates chaotic, funny, and competitive games designed for friends and groups. Expect fast betrayals, absurd table rules, and loud laughs.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_35px_rgba(250,204,21,0.5)] transition-all cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-games-btn"
                onClick={() => {
                  const el = document.getElementById('top-picks-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('shop');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <span>EXPLORE GAMES</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-slate-200">10,000+ Games Delivered Across Egypt</span>
              </div>
              <div>•</div>
              <div className="text-slate-300">
                ⭐ <span className="font-bold text-white">4.9/5</span> Average Table Rating
              </div>
            </div>
          </div>

          {/* Hero Visual Box Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative backdrop rotation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-amber-400/20 rounded-3xl blur-2xl -rotate-3 scale-95" />

              <div
                onClick={() => onViewProduct(flagshipProduct)}
                className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              >
                <ProductVisual product={flagshipProduct} size="hero" />

                {/* Floating pill highlight */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-black/90 border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flagship Release: MESSY MAYHEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP PICKS (ONLY 3 FEATURED GAMES) */}
      <section
        id="top-picks-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              FEATURED ROTATION
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase mt-1">
              Top Picks
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              The three crowd-favorites sparking intense table rivalries this season.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPicks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 3. PROMOTIONAL SECTION */}
      <section
        id="promo-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#13112E] via-[#101426] to-[#0D182E] border border-amber-400/20 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          {/* Subtle lighting accents */}
          <div className="absolute top-0 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>GAME NIGHT UPGRADE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              Ready to get messy?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ditch repetitive board games and unlock high-energy showdowns. From 5-minute coffee breaks to rowdy 10-player house parties, we have your next favorite card game.
            </p>

            <div className="pt-2">
              <button
                id="promo-shop-all-btn"
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.35)] transition-all cursor-pointer"
              >
                <span>SHOP ALL GAMES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHORT BRAND SECTION */}
      <section
        id="brand-pillars-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#0B0F1E] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-white uppercase">
              Zero Screen-Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Phones down, eyes locked. Our card games are made for authentic, physical social chaos around living room tables.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0B0F1E] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-white uppercase">
              Socially Engineered
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every rule is playtested through hundreds of matches to maximize banter, bluffs, and dramatic comebacks.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0B0F1E] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-white uppercase">
              Bilingual & Local
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Designed right here with Egyptian humor, bilingual prompts, fast doorstep shipping, and Cash on Delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
