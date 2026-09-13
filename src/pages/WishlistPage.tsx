import React from 'react';
import { Product, Page } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

interface WishlistPageProps {
  wishlistProducts: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: Page) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistProducts,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
}) => {
  return (
    <div id="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight flex items-center gap-3">
            <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
            <span>MY WISHLIST ({wishlistProducts.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Games you’ve saved for upcoming parties and gatherings.
          </p>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Shop More</span>
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-[#0B0F1F] border border-white/10 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-pink-400 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl text-white uppercase">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Click the heart icon on any game in our shop to save it here for later.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
          >
            <span>BROWSE GAMES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={true}
              />
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Tip: You can add items directly to your cart above or click 'View' to see rules and details.
            </p>
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
                onNavigate('cart');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD ALL WISHLIST ITEMS TO CART</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
