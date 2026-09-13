import React from 'react';
import { Order, OrderStatus, Page } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  RotateCw,
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from 'lucide-react';

interface OrderDetailPageProps {
  order: Order | null;
  onNavigate: (page: Page) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  order,
  onNavigate,
}) => {
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white">No Order Selected</h2>
        <button
          onClick={() => onNavigate('profile')}
          className="px-6 py-3 rounded-xl bg-amber-400 text-black font-black uppercase text-xs cursor-pointer"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  const steps: { label: OrderStatus; timeDesc: string; detail: string }[] = [
    {
      label: 'ORDER RECEIVED',
      timeDesc: 'Day 1 • Automated confirmation',
      detail: 'Your order was registered and scheduled for dispatch.',
    },
    {
      label: 'PREPARING',
      timeDesc: 'Day 1 • Quality control',
      detail: 'Card packs and tokens inspected and sealed in Cairo facility.',
    },
    {
      label: 'SHIPPED',
      timeDesc: 'Day 2 • Handed to courier',
      detail: `Courier dispatched with tracking code: ${order.trackingNumber}`,
    },
    {
      label: 'DELIVERED',
      timeDesc: 'Day 2–3 • Doorstep delivery',
      detail: 'Handed to recipient and cash collected.',
    },
  ];

  const currentIdx = steps.findIndex((s) => s.label === order.status);

  return (
    <div id="order-detail-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Profile */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Orders</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              ORDER #{order.id}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/15 border border-amber-400/40 text-amber-300">
              {order.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Placed on {order.date} &bull; Tracking: <span className="font-mono text-slate-300">{order.trackingNumber}</span>
          </p>
        </div>

        <div className="text-left md:text-right">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Total Amount</div>
          <div className="font-display font-black text-2xl sm:text-3xl text-amber-400">
            {order.total} <span className="text-sm">EGP</span>
          </div>
          <div className="text-[11px] text-emerald-400">{order.paymentMethod}</div>
        </div>
      </div>

      {/* Timeline Status Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-xl space-y-6">
        <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-wide flex items-center gap-2">
          <Truck className="w-5 h-5 text-amber-400" />
          <span>Delivery Progress Timeline</span>
        </h3>

        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={step.label} className="relative flex items-start gap-5 pl-1">
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-black ring-4 ring-amber-400/20 shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                      : isCompleted
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#121829] text-slate-500 border border-white/10'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div className="flex-1 pt-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4
                      className={`text-sm font-black uppercase tracking-wider ${
                        isCurrent
                          ? 'text-amber-400'
                          : isCompleted
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <span className="text-xs text-slate-400">{step.timeDesc}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Items Receipt & Delivery Destination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Items List */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Items in Package ({order.items.length})</span>
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-white uppercase text-sm">{item.productName}</div>
                  <div className="text-xs text-slate-400">
                    Category: {item.category} &bull; Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-display font-black text-amber-400 text-sm">
                  {item.price * item.quantity} EGP
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-white">{order.subtotal} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-white">
                {order.shipping === 0 ? 'FREE' : `${order.shipping} EGP`}
              </span>
            </div>
            <div className="flex justify-between font-display font-black text-base text-white pt-2 border-t border-white/5">
              <span>Grand Total</span>
              <span className="text-amber-400">{order.total} EGP</span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Address Details */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Recipient Details</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 uppercase font-bold block">Customer:</span>
              <span className="font-bold text-white text-sm">{order.customer.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase font-bold block">Contact Phone:</span>
              <span className="text-slate-200">{order.customer.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase font-bold block">Email:</span>
              <span className="text-slate-200">{order.customer.email}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase font-bold block">Delivery Destination:</span>
              <span className="text-white font-medium">
                {order.customer.address}, {order.customer.area}, {order.customer.city}
              </span>
            </div>
            <div>
              <span className="text-slate-500 uppercase font-bold block">Payment Terms:</span>
              <span className="text-emerald-400 font-semibold">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
            Have a question about this shipment? Contact Messy Games support at{' '}
            <span className="font-bold">messy.games77@gmail.com</span> quoting Order #{order.id}.
          </div>
        </div>
      </div>
    </div>
  );
};
