import React, { useState, useMemo } from 'react';
import { Product, Page } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, X, Sparkles, ArrowRight, Tag } from 'lucide-react';

interface SearchPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onNavigate: (page: Page) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const quickTags = ['Party', 'Mystery', 'Competitive', 'Fast 15 min', 'Squads', '350 EGP'];

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const results = useMemo(() => {
    if (!query.trim()) {
      return products; // show all or featured initially
    }
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.players.toLowerCase().includes(q) ||
        p.time.toLowerCase().includes(q) ||
        `${p.price}`.includes(q)
    );
  }, [products, query]);

  return (
    <div id="search-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Search Header and Input */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Search className="w-3.5 h-3.5" />
          <span>INSTANT CATALOG SEARCH</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          FIND YOUR NEXT GAME
        </h1>

        {/* Large Search Input Box */}
        <div className="relative">
          <Search className="w-6 h-6 text-amber-400 absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            id="search-page-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search game titles, play time, categories, or keywords..."
            className="w-full pl-14 pr-12 py-4 rounded-2xl bg-[#0B0F1F] border-2 border-white/10 text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:border-amber-400 shadow-2xl transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 uppercase font-bold flex items-center gap-1">
            <Tag className="w-3 h-3" /> Quick filters:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 border border-white/10 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="text-xs sm:text-sm text-slate-400">
          {query ? (
            <span>
              Search results for <span className="font-bold text-white">"{query}"</span> ({results.length} games found)
            </span>
          ) : (
            <span>Showing all games in the catalog ({results.length})</span>
          )}
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="text-xs font-bold uppercase text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          View in Shop →
        </button>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {results.map((product) => (
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
      ) : (
        <div className="p-12 text-center rounded-3xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-white">No games matched "{query}"</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Try searching for terms like "Party", "Mystery", "Quick", or clear the search query.
          </p>
          <button
            onClick={() => setQuery('')}
            className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-black uppercase text-xs hover:bg-amber-300 cursor-pointer"
          >
            Show All Games
          </button>
        </div>
      )}
    </div>
  );
};
