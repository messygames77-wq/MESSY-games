import React, { useState } from 'react';
import { Product, Page } from '../types';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Zap,
  Users,
  Clock,
  ShieldCheck,
  Package,
  BookOpen,
  Info,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  wishlistIds: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onNavigate,
  onViewProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  wishlistIds,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'how-to-play' | 'whats-inside' | 'game-details'>(
    'how-to-play'
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  // Recommended products: exclude current product
  const recommended = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div id="product-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Back button & breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copySuccess ? 'Link Copied!' : 'Share Game'}</span>
        </button>
      </div>

      {/* Main Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Large Product Visual */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="relative rounded-3xl bg-[#0B0F1F] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
            {/* Ambient backdrop glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-30 pointer-events-none"
              style={{ backgroundColor: product.accentColor }}
            />

            <ProductVisual product={product} size="lg" />

            {/* Guaranteed authentic pill */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Messy Games Original Edition &bull; Made with Casino-Grade Cardstock</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Badge & Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-black">
              {product.category}
            </span>
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-600 text-white border border-purple-400/40">
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Product Name */}
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            {product.name}
          </h1>

          {/* Tagline */}
          <p className="text-base text-amber-300 font-semibold">
            {product.tagline}
          </p>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-[#0D1224] border border-white/10 flex items-baseline gap-4">
            <div className="font-display font-black text-3xl sm:text-4xl text-amber-400">
              {product.price} <span className="text-sm font-bold text-amber-300">EGP</span>
            </div>
            {product.oldPrice > product.price && (
              <div className="text-base sm:text-lg text-slate-500 line-through font-semibold">
                {product.oldPrice} EGP
              </div>
            )}
            <span className="ml-auto text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tax Included</span>
            </span>
          </div>

          {/* Quick Specs: Players, Age, Time */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-400 uppercase">Players</div>
              <div className="text-xs sm:text-sm font-extrabold text-white">{product.players}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-400 uppercase">Play Time</div>
              <div className="text-xs sm:text-sm font-extrabold text-white">{product.time}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-400 uppercase">Recommended Age</div>
              <div className="text-xs sm:text-sm font-extrabold text-white">{product.age}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Game Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{product.availability}</span>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-400">Quantity:</span>
              <div className="flex items-center rounded-xl bg-[#060812] border border-white/10 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center font-display font-black text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons: ADD TO CART, BUY NOW, Add to Wishlist */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <button
                id="pdp-add-cart-btn"
                onClick={() => onAddToCart(product, quantity)}
                className="sm:col-span-5 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={() => onBuyNow(product, quantity)}
                className="sm:col-span-5 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>BUY NOW</span>
              </button>

              <button
                id="pdp-wishlist-btn"
                onClick={() => onToggleWishlist(product)}
                aria-label="Toggle wishlist"
                className={`sm:col-span-2 flex items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-pink-500/20 text-pink-400 border-pink-500/40 shadow-lg shadow-pink-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:text-pink-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-400 text-pink-400' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: How to Play / What's Inside / Game Details */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('how-to-play')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'how-to-play'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>How to Play</span>
          </button>

          <button
            onClick={() => setActiveTab('whats-inside')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'whats-inside'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>What’s Inside</span>
          </button>

          <button
            onClick={() => setActiveTab('game-details')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'game-details'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Game Details</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0E1C] border border-white/10">
          {activeTab === 'how-to-play' && (
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-wide">
                Official Rules & Flow
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.howToPlay.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'whats-inside' && (
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-wide">
                Box Contents
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.whatsInside.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'game-details' && (
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-wide">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Card Count</div>
                  <div className="text-base font-extrabold text-white">{product.details.cardCount} Cards</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Language</div>
                  <div className="text-base font-extrabold text-white">{product.details.language}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Difficulty</div>
                  <div className="text-base font-extrabold text-white">{product.details.difficulty}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Replayability</div>
                  <div className="text-base font-extrabold text-white">{product.details.reusability}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-2xl text-white uppercase">
              You May Also Like
            </h3>
            <p className="text-xs text-slate-400">
              Popular companions for a complete game night stack.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold uppercase text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommended.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onViewProduct={onViewProduct}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
