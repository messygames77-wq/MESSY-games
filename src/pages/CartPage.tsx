import React, { useState } from 'react';
import { CartItem, Page } from '../types';
import { ProductVisual } from '../components/ProductVisual';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: Page) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: number; // percentage, e.g. 10 for 10%
  setAppliedDiscount: (discount: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  discountCode,
  setDiscountCode,
  appliedDiscount,
  setAppliedDiscount,
}) => {
  const [couponInput, setCouponInput] = useState(discountCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(
    appliedDiscount > 0 ? `Active: ${appliedDiscount}% OFF applied!` : ''
  );

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Discount calculation
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);

  // Free shipping threshold: 800 EGP
  const shipping = subtotal === 0 ? 0 : subtotal >= 800 ? 0 : 50;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'MESSY10' || code === 'CHAOS10') {
      setAppliedDiscount(10);
      setDiscountCode(code);
      setCouponSuccess('Success! 10% discount applied to your cart.');
      setCouponError('');
    } else if (code === 'MESSY20') {
      setAppliedDiscount(20);
      setDiscountCode(code);
      setCouponSuccess('VIP Code applied! 20% discount applied.');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try code "MESSY10" for 10% off.');
      setCouponSuccess('');
    }
  };

  return (
    <div id="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            YOUR SHOPPING CART
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your game stack before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="p-12 sm:p-16 rounded-3xl bg-[#0B0F1F] border border-white/10 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl text-white uppercase">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              You haven't picked any games yet. Browse our bestselling party and strategy card games to get started!
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
          >
            <span>EXPLORE THE SHOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Cart With Items */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                id={`cart-item-${item.product.id}`}
                className="p-4 sm:p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 flex flex-col sm:flex-row items-center gap-5 transition-all hover:border-white/20"
              >
                {/* Visual miniature */}
                <div className="w-24 sm:w-28 flex-shrink-0">
                  <ProductVisual product={item.product} size="sm" />
                </div>

                {/* Info */}
                <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-display font-black text-base sm:text-lg text-white uppercase">
                      {item.product.name}
                    </h3>
                    <div className="font-display font-black text-base sm:text-lg text-amber-400">
                      {item.product.price * item.quantity} <span className="text-xs">EGP</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">
                    {item.product.tagline}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-3">
                    <span>Category: {item.product.category}</span>
                    <span>•</span>
                    <span>{item.product.players} Players</span>
                  </div>

                  {/* Quantity controls & Delete */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-xl bg-[#060812] border border-white/10 p-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-display font-black text-white text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Shipping note bar */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center gap-3 text-xs text-purple-300">
              <Truck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>
                {subtotal >= 800
                  ? '🎉 Free Shipping unlocked! Delivery across Egypt is on us.'
                  : `Add ${(800 - subtotal).toFixed(0)} EGP more to unlock FREE nationwide delivery!`}
              </span>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-[#0C1122] border border-white/10 space-y-5 shadow-2xl">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wide border-b border-white/10 pb-3">
                Order Summary
              </h3>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{subtotal} EGP</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-bold">-{discountAmount} EGP</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <div className="flex items-center gap-1">
                    <span>Shipping</span>
                    <span className="text-[10px] text-slate-400">(Egypt)</span>
                  </div>
                  <span className="font-bold text-white">
                    {shipping === 0 ? (
                      <span className="text-emerald-400 uppercase text-xs font-black">
                        FREE
                      </span>
                    ) : (
                      `${shipping} EGP`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-white uppercase">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="font-display font-black text-2xl text-amber-400">
                      {total}
                    </span>{' '}
                    <span className="text-xs font-bold text-amber-300">EGP</span>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. MESSY10)"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-xs uppercase font-semibold focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-400 font-semibold">{couponSuccess}</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 font-semibold">{couponError}</p>
                )}
              </form>

              {/* Buttons: Checkout & Continue Shopping */}
              <div className="space-y-3 pt-2">
                <button
                  id="cart-checkout-btn"
                  onClick={() => onNavigate('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  CONTINUE SHOPPING
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cash on Delivery &bull; Inspection Allowed Upon Receipt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
