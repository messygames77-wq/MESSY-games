import React, { useState } from 'react';
import { Page } from '../types';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, params?: any) => void;
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  isLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SHOP', page: 'shop' },
    { label: 'ABOUT', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080B14]/85 border-b border-white/10 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo */}
          <button
            id="header-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            {/* Logo emblem */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 p-0.5 shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-[10px] bg-[#0A0E1A] flex items-center justify-center">
                <span className="font-display font-black text-lg text-amber-400 tracking-tighter">
                  M
                </span>
                <span className="text-[10px] font-black text-purple-400 -ml-0.5 mt-1">
                  G
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl md:text-2xl tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
                  MESSY <span className="text-amber-400">GAMES</span>
                </span>
              </div>
              <span className="text-[9px] tracking-widest text-purple-300/80 font-bold uppercase -mt-1 hidden sm:block">
                Games Get Messy
              </span>
            </div>
          </button>

          {/* Center: Desktop Nav */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNav(link.page)}
                  className={`relative px-4 py-2 text-xs lg:text-sm font-bold tracking-widest uppercase transition-all duration-200 rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(250,204,21,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={() => handleNav('search')}
              aria-label="Search games"
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                currentPage === 'search'
                  ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-btn"
              onClick={() => handleNav('wishlist')}
              aria-label="View Wishlist"
              className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
                currentPage === 'wishlist'
                  ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-[10px] font-black text-white flex items-center justify-center border-2 border-[#080B14] shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              id="header-profile-btn"
              onClick={() => handleNav('profile')}
              aria-label="Customer Profile and Orders"
              className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
                currentPage === 'profile'
                  ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-5 h-5" />
              {isLoggedIn && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#080B14]" />
              )}
            </button>

            {/* Admin Dashboard Quick Access Button */}
            <button
              id="header-admin-btn"
              onClick={() => handleNav('admin')}
              title="Admin Orders Dashboard"
              aria-label="Admin Orders Dashboard"
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.35)]'
                  : 'bg-purple-600/25 hover:bg-purple-600/40 text-purple-200 border border-purple-500/40'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${currentPage === 'admin' ? 'text-black' : 'text-amber-400'}`} />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Cart Icon */}
            <button
              id="header-cart-btn"
              onClick={() => handleNav('cart')}
              aria-label="Shopping Cart"
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 ${
                currentPage === 'cart'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                  : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2.5 min-w-5 h-5 px-1 rounded-full text-[11px] font-black flex items-center justify-center border border-[#080B14] ${
                      currentPage === 'cart'
                        ? 'bg-black text-amber-400'
                        : 'bg-amber-400 text-black shadow-md'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-black tracking-wider uppercase">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 md:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-t border-white/10 bg-[#080B14]/98 backdrop-blur-2xl px-5 py-6 space-y-3 transition-all duration-300 animate-in slide-in-from-top"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                  currentPage === link.page
                    ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.page && (
                  <span className="text-xs text-amber-400 font-bold">● Active</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNav('profile')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 border border-white/10 cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>MY ACCOUNT</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-xs font-black text-amber-300 border border-amber-400/30 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>ADMIN ORDERS</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNav('wishlist')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-slate-300 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span>MY WISHLIST ({wishlistCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
