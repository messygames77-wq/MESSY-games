import React from 'react';
import { Product } from '../types';
import { Flame, Sparkles, Shield, Skull, Zap, Users, HelpCircle, Swords, Timer } from 'lucide-react';

interface ProductVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  isHovered?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  size = 'md',
  className = '',
  isHovered = false,
}) => {
  const getIcon = () => {
    switch (product.id) {
      case 'messy-mayhem':
        return <Flame className="w-12 h-12 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />;
      case 'chaos-cards':
        return <Sparkles className="w-12 h-12 text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]" />;
      case 'messy-mystery':
        return <HelpCircle className="w-12 h-12 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" />;
      case 'last-card-standing':
        return <Swords className="w-12 h-12 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />;
      case 'squad-chaos':
        return <Users className="w-12 h-12 text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]" />;
      case 'quick-mess':
        return <Zap className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]" />;
      default:
        return <Flame className="w-12 h-12 text-amber-400" />;
    }
  };

  const dimensions = {
    sm: 'h-44 w-full',
    md: 'h-60 w-full',
    lg: 'h-80 md:h-96 w-full',
    hero: 'h-72 md:h-88 w-full max-w-sm',
  }[size];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${product.gradient} p-0.5 shadow-2xl transition-transform duration-300 ${dimensions} ${className}`}
    >
      {/* Inner game box card */}
      <div className="relative w-full h-full rounded-[14px] bg-[#0A0E1A] overflow-hidden flex flex-col justify-between p-5 border border-white/10">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Ambient colored spotlight */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-40"
          style={{ backgroundColor: product.accentColor }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: product.accentColor }}
        />

        {/* Top bar of game box */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <Timer className="w-3 h-3 text-amber-400" />
            <span>{product.time}</span>
          </div>
        </div>

        {/* Center Artwork / Deck Motif */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
          {/* Deck frame */}
          <div className="relative w-28 h-36 md:w-32 md:h-40 rounded-xl bg-gradient-to-b from-white/10 to-white/5 p-[1px] shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-[11px] bg-gradient-to-b from-[#121829] to-[#0D1222] p-3 flex flex-col items-center justify-between border border-white/10 relative overflow-hidden">
              {/* Card corner accents */}
              <span className="absolute top-1.5 left-2 text-[10px] font-extrabold text-white/40">♠</span>
              <span className="absolute bottom-1.5 right-2 text-[10px] font-extrabold text-white/40">♦</span>

              <div className="text-[9px] font-black uppercase tracking-widest text-amber-400/80">
                MESSY
              </div>

              {/* Center emblem */}
              <div className="p-3 rounded-full bg-white/5 border border-white/10 shadow-inner">
                {getIcon()}
              </div>

              <div className="text-[9px] font-bold tracking-wider text-slate-400">
                EDITION #01
              </div>
            </div>

            {/* Glowing card reflection */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${product.accentColor}33, transparent 70%)`,
              }}
            />
          </div>

          {/* Product title on box */}
          <h4 className="mt-3 text-sm md:text-base font-extrabold tracking-wide text-white uppercase drop-shadow-md">
            {product.name}
          </h4>
          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[200px]">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Game Box Specs */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{product.players}</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-bold border border-amber-400/20 text-[10px]">
            {product.age}
          </div>
        </div>
      </div>
    </div>
  );
};
