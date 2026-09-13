import React from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { Heart, ShoppingBag, Eye, Users, Clock, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-[#0C1122] border border-white/10 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-[0_15px_35px_-10px_rgba(139,92,246,0.3)]"
    >
      {/* Top badges & wishlist action */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap items-center gap-1.5">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black shadow-md">
              SAVE {discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-600/90 text-white backdrop-blur-md border border-purple-400/30">
              {product.badge}
            </span>
          )}
        </div>

        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40 scale-110 shadow-lg shadow-pink-500/20'
              : 'bg-black/50 text-slate-300 hover:text-pink-400 hover:bg-black/80 border border-white/10'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-400 text-pink-400' : ''}`} />
        </button>
      </div>

      {/* Visual box click triggers view product */}
      <div
        onClick={() => onViewProduct(product)}
        className="p-4 cursor-pointer relative overflow-hidden group/visual"
      >
        <ProductVisual product={product} size="md" />
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between p-5 pt-1 space-y-4">
        <div>
          {/* Metadata badges: players, time, age */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {product.players}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {product.time}
            </span>
            <span>•</span>
            <span className="text-slate-300 font-bold px-1.5 py-0.2 rounded bg-white/5 border border-white/5 text-[10px]">
              {product.age}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewProduct(product)}
            className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-amber-400 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-1 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-white/10 space-y-3">
          {/* Price display */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-display">
              {product.price} <span className="text-xs font-bold text-amber-300">EGP</span>
            </span>
            {product.oldPrice > product.price && (
              <span className="text-sm font-semibold text-slate-500 line-through">
                {product.oldPrice} EGP
              </span>
            )}
          </div>

          {/* Buttons: Add to Cart & View Product */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`view-btn-${product.id}`}
              onClick={() => onViewProduct(product)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>View</span>
            </button>

            <button
              id={`add-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
