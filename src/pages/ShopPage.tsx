import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [playerFilter, setPlayerFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories: ProductCategory[] = ['All', 'Party', 'Mystery', 'Competitive', 'Group', 'Quick'];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // Player filter
    if (playerFilter !== 'all') {
      if (playerFilter === '2-4') {
        list = list.filter((p) => p.players.includes('2') || p.players.includes('3') || p.players.includes('4'));
      } else if (playerFilter === '4-8') {
        list = list.filter((p) => p.players.includes('5') || p.players.includes('6') || p.players.includes('8'));
      } else if (playerFilter === '8+') {
        list = list.filter((p) => p.players.includes('8') || p.players.includes('10'));
      }
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Newest by release order
        list.reverse();
        break;
      case 'featured':
      default:
        // Keep original curated order
        break;
    }

    return list;
  }, [products, searchQuery, selectedCategory, maxPrice, playerFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(700);
    setPlayerFilter('all');
    setSortBy('featured');
  };

  return (
    <div id="shop-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ALL CARD GAMES & EXPANSIONS</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          SHOP ALL GAMES
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Explore our complete collection of social, chaotic, and competitive card games.
        </p>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 shadow-xl space-y-5">
        {/* Search Bar + Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="shop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by game name, rules, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="shop-sort-select" className="text-xs font-bold uppercase text-slate-400 whitespace-nowrap">
              Sort By:
            </label>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3.5 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-sm font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase text-slate-500 mr-1 whitespace-nowrap">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Row: Price Slider & Player Count */}
        <div className="pt-3 border-t border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Price Range */}
          <div className="md:col-span-6 flex items-center gap-4">
            <span className="text-xs font-bold uppercase text-slate-400 whitespace-nowrap">
              Max Price: <span className="text-amber-400 font-display font-extrabold">{maxPrice} EGP</span>
            </span>
            <input
              type="range"
              min="300"
              max="700"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Player Count Filter */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-400 whitespace-nowrap">
              Players:
            </span>
            <select
              value={playerFilter}
              onChange={(e) => setPlayerFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#060812] border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">Any Player Count</option>
              <option value="2-4">2–4 Players (Small Groups)</option>
              <option value="4-8">4–8 Players (Standard Party)</option>
              <option value="8+">8+ Players (Large Gatherings)</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <span className="font-bold text-white">{filteredProducts.length}</span> of {products.length} games
        </span>
        {selectedCategory !== 'All' && (
          <span className="text-amber-400 font-medium">Filtered by: {selectedCategory}</span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div
          id="shop-product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
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
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">No games matched your filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, increasing your price range, or clearing category filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
