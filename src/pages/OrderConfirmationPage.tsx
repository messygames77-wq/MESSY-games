import React from 'react';
import { Order, Page } from '../types';
import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: Order | null;
  onNavigate: (page: Page, params?: any) => void;
  onSelectOrder: (order: Order) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigate,
  onSelectOrder,
}) => {
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white">No recent order found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 rounded-xl bg-amber-400 text-black font-black uppercase text-xs cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const steps: { label: string; key: Order['status']; desc: string }[] = [
    { label: 'ORDER RECEIVED', key: 'ORDER RECEIVED', desc: 'Order logged & confirmed' },
    { label: 'PREPARING', key: 'PREPARING', desc: 'Packed at Cairo warehouse' },
    { label: 'SHIPPED', key: 'SHIPPED', desc: 'With courier on the road' },
    { label: 'DELIVERED', key: 'DELIVERED', desc: 'Handed over & payment collected' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div id="order-confirmation-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero celebration badge */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border-2 border-amber-400/40 text-amber-400 flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.25)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <Sparkles className="w-6 h-6 text-purple-400 absolute -top-1 -right-2 animate-bounce" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold tracking-widest uppercase text-amber-400">
            THANK YOU FOR YOUR PURCHASE!
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ORDER CONFIRMED!
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Your card game stack is being prepared for dispatch. We will contact you via phone before arrival.
          </p>
        </div>

        {/* Order Identifier Tag */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0D1326] border border-amber-400/30 text-xs sm:text-sm">
          <span className="text-slate-400 uppercase font-semibold">Order Number:</span>
          <span className="font-display font-black text-amber-400 tracking-wider text-base">
            #{order.id}
          </span>
        </div>
      </div>

      {/* Visual Status Progress Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-wide flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span>Live Order Status</span>
          </h3>
          <span className="text-xs font-bold text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Current: {order.status}
          </span>
        </div>

        {/* Tracker Steps */}
        <div className="relative">
          {/* Progress Bar Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-white/10 -z-0 hidden md:block">
            <div
              className="h-full bg-amber-400 transition-all duration-500 shadow-[0_0_12px_rgba(250,204,21,0.6)]"
              style={{
                width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.key} className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-xs transition-all flex-shrink-0 ${
                      isCurrent
                        ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.6)] ring-4 ring-amber-400/20'
                        : isCompleted
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-[#121829] text-slate-500 border border-white/10'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div>
                    <div
                      className={`text-xs font-black uppercase tracking-wider ${
                        isCurrent
                          ? 'text-amber-400'
                          : isCompleted
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-[11px] text-slate-400">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details & Delivery Information Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer & Delivery Information */}
        <div className="p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Delivery Information</span>
          </h3>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-400">Customer Name:</span>
              <span className="font-bold text-white">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-400">Phone:</span>
              <span className="font-bold text-white">{order.customer.phone}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-400">Email:</span>
              <span className="text-white">{order.customer.email}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-400">City / Area:</span>
              <span className="font-bold text-white">
                {order.customer.city} ({order.customer.area})
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Address:</span>
              <span className="text-white text-right max-w-[200px]">{order.customer.address}</span>
            </div>
            <div className="pt-2 text-xs text-amber-300/90 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimated Delivery: {order.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items & Summary */}
        <div className="p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Items Ordered</span>
          </h3>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                <div>
                  <div className="font-bold text-white uppercase">{item.productName}</div>
                  <div className="text-[10px] text-slate-400">
                    Qty: {item.quantity} &bull; {item.price} EGP each
                  </div>
                </div>
                <div className="font-display font-black text-amber-400 text-xs">
                  {item.price * item.quantity} EGP
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{order.subtotal} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `${order.shipping} EGP`}</span>
            </div>
            <div className="flex justify-between font-display font-black text-sm text-white pt-1 border-t border-white/5">
              <span>Total Paid on Delivery</span>
              <span className="text-amber-400">{order.total} EGP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          id="confirmation-view-order-btn"
          onClick={() => {
            onSelectOrder(order);
            onNavigate('order-detail');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_25px_rgba(250,204,21,0.35)] transition-all cursor-pointer"
        >
          <span>VIEW MY ORDER</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
        >
          <span>KEEP SHOPPING</span>
        </button>
      </div>
    </div>
  );
};
