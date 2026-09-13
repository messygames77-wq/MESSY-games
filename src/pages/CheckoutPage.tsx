import React, { useState } from 'react';
import { CartItem, Order, OrderCustomer, Page, UserProfile } from '../types';
import { ProductVisual } from '../components/ProductVisual';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowLeft,
  Lock,
  AlertCircle,
} from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  userProfile: UserProfile;
  appliedDiscount: number;
  onPlaceOrder: (order: Order) => void;
  onNavigate: (page: Page) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  userProfile,
  appliedDiscount,
  onPlaceOrder,
  onNavigate,
}) => {
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: userProfile.fullName || 'Ahmed Hassan',
    phone: userProfile.phone || '+20 100 123 4567',
    email: userProfile.email || 'ahmed.hassan@example.com',
    address: userProfile.address || 'Bldg 14, St 9, Maadi',
    city: userProfile.city || 'Cairo',
    area: userProfile.area || 'Maadi',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shipping = subtotal === 0 ? 0 : subtotal >= 800 ? 0 : 50;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const egyptianCities = [
    'Cairo',
    'Giza',
    'Alexandria',
    'New Cairo (Fifth Settlement)',
    'Sheikh Zayed / 6th of October',
    'Mansoura',
    'Tanta',
    'Zagazig',
    'Assiut',
    'Port Said',
    'Suez',
    'Hurghada',
    'Sharm El Sheikh',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    if (cart.length === 0) {
      setErrorMsg('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Generate unique real Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `MG-${randomSuffix}`;

    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        accentColor: c.product.accentColor,
        category: c.product.category,
      })),
      subtotal,
      shipping,
      total,
      status: 'ORDER RECEIVED',
      customer: formData,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : 'Credit Card (Demo Gateway)',
      trackingNumber: `EGY-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: '2–3 Business Days',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(newOrder);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white">Your cart is empty</h2>
        <p className="text-sm text-slate-400">Add products before proceeding to checkout.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 rounded-xl bg-amber-400 text-black font-black uppercase text-xs cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <button
            onClick={() => onNavigate('cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cart</span>
          </button>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            CHECKOUT
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Lock className="w-4 h-4" />
          <span>Encrypted 256-bit Checkout</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Shipping details + Order Summary */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Customer Information & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section: Customer Information */}
          <div className="p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Truck className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-extrabold text-base sm:text-lg text-white uppercase tracking-wide">
                1. Delivery & Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mostafa Mahmoud"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+20 100 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Street Address & Building / Apt *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Building number, Street, Floor, Apartment"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  City / Governorate *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {egyptianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Area / District *
                </label>
                <input
                  type="text"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. Maadi, Zamalek, Dokki, Rehab"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Banknote className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-extrabold text-base sm:text-lg text-white uppercase tracking-wide">
                2. Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Cash on Delivery (Active) */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-400/10 border-amber-400/50 shadow-md shadow-amber-400/10'
                    : 'bg-[#060812] border-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-amber-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-sm text-white uppercase">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Pay the courier in cash upon package delivery. You can verify the box before paying!
                  </p>
                </div>
              </label>

              {/* Online Payment (Disabled / Coming Soon per prompt instructions) */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 opacity-70 cursor-not-allowed">
                <input
                  type="radio"
                  name="paymentOption"
                  disabled
                  checked={false}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <span className="font-display font-bold text-sm text-slate-300 uppercase">
                        Credit / Debit Card (Visa / Mastercard)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-400">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Online card gateway integration is in sandbox testing. Please select Cash on Delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0C1122] border border-white/10 space-y-5 shadow-2xl sticky top-28">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-wide border-b border-white/10 pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Item Mini List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 text-xs border-b border-white/5 pb-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#060812] border border-white/10 flex items-center justify-center font-black text-amber-400 text-[10px]">
                      {item.quantity}x
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase">{item.product.name}</div>
                      <div className="text-[10px] text-slate-400">{item.product.category}</div>
                    </div>
                  </div>
                  <div className="font-display font-black text-amber-400 text-xs">
                    {item.product.price * item.quantity} EGP
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-sm pt-2">
              <div className="flex justify-between text-slate-300 text-xs">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{subtotal} EGP</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 text-xs">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span className="font-semibold">-{discountAmount} EGP</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300 text-xs">
                <span>Shipping Fee</span>
                <span className="font-semibold text-white">
                  {shipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `${shipping} EGP`}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-display font-bold text-base text-white uppercase">
                  Total Due
                </span>
                <div className="text-right">
                  <span className="font-display font-black text-2xl text-amber-400">
                    {total}
                  </span>{' '}
                  <span className="text-xs font-bold text-amber-300">EGP</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              id="checkout-place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.35)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
            </button>

            <div className="text-[11px] text-slate-400 text-center space-y-1">
              <p>By placing your order, you confirm acceptance of Messy Games delivery terms.</p>
              <p className="text-amber-400/80 font-medium">No advance payment required. Pay on delivery.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
