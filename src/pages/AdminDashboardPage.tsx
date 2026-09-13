import React, { useState, useMemo } from 'react';
import { Order, OrderStatus, Page } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  TrendingUp,
  Clock,
  Truck,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  EyeOff,
  RefreshCw,
  PlusCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Lock,
  LogOut,
  KeyRound,
} from 'lucide-react';

const ADMIN_PASSWORD = 'Adouma1234';

interface AdminDashboardPageProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onUpdateOrderTracking?: (orderId: string, trackingNumber: string) => void;
  onSelectOrder: (order: Order) => void;
  onNavigate: (page: Page) => void;
  onCreateDemoOrder?: () => void;
  onLogout?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  orders,
  onUpdateOrderStatus,
  onUpdateOrderTracking,
  onSelectOrder,
  onNavigate,
  onCreateDemoOrder,
  onLogout,
}) => {
  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('messy_games_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [trackingInputValue, setTrackingInputValue] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
      try {
        sessionStorage.setItem('messy_games_admin_auth', 'true');
      } catch {}
    } else {
      setAuthError('Incorrect admin password. Access denied.');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
    try {
      sessionStorage.removeItem('messy_games_admin_auth');
    } catch {}
    if (onLogout) {
      onLogout();
    }
  };

  const statuses: OrderStatus[] = [
    'ORDER RECEIVED',
    'PREPARING',
    'SHIPPED',
    'DELIVERED',
  ];

  // If not authenticated, render Password Security Gate
  if (!isAuthenticated) {
    return (
      <div
        id="admin-password-gate"
        className="min-h-[75vh] flex items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#12182F] via-[#0C1122] to-[#080B16] border border-amber-400/40 shadow-[0_0_50px_rgba(250,204,21,0.15)] space-y-6">
          {/* Lock Emblem */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border-2 border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(250,204,21,0.3)]">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[11px] font-black uppercase tracking-wider mb-2">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>RESTRICTED STORE ACCESS</span>
              </div>
              <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                MESSY GAMES ADMIN
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter the administrator key to manage orders and change live fulfillment statuses.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Admin Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder="Enter administrator password..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[#060812] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(250,204,21,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const countByStatus = useMemo(() => {
    return {
      received: orders.filter((o) => o.status === 'ORDER RECEIVED').length,
      preparing: orders.filter((o) => o.status === 'PREPARING').length,
      shipped: orders.filter((o) => o.status === 'SHIPPED').length,
      delivered: orders.filter((o) => o.status === 'DELIVERED').length,
    };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (selectedStatusFilter !== 'All' && order.status !== selectedStatusFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesName = order.customer.fullName.toLowerCase().includes(q);
        const matchesPhone = order.customer.phone.includes(q);
        const matchesEmail = order.customer.email.toLowerCase().includes(q);
        const matchesCity = order.customer.city.toLowerCase().includes(q);
        const matchesItems = order.items.some((i) => i.productName.toLowerCase().includes(q));

        if (!matchesId && !matchesName && !matchesPhone && !matchesEmail && !matchesCity && !matchesItems) {
          return false;
        }
      }
      return true;
    });
  }, [orders, selectedStatusFilter, searchQuery]);

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'ORDER RECEIVED':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'PREPARING':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'SHIPPED':
        return 'bg-amber-400/15 text-amber-300 border-amber-400/30';
      case 'DELIVERED':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div id="admin-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17122E] via-[#0E1325] to-[#0A0D1A] border border-amber-400/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ADMIN ACCESS</span>
            </div>
            <span className="text-xs text-slate-400">Store Manager & Order Fulfillment Portal</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            ORDERS MANAGEMENT DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time management of all customer orders, live shipping status updates, and dispatch tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onCreateDemoOrder && (
            <button
              onClick={onCreateDemoOrder}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Generate Sample Order</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>View Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleAdminLogout}
            title="Lock Admin Dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
            <span>Total Sales</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display font-black text-2xl text-white">
            {totalRevenue.toLocaleString()} <span className="text-xs font-bold text-amber-400">EGP</span>
          </div>
          <div className="text-[11px] text-slate-500">{orders.length} total orders placed</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F1F] border border-blue-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-blue-400 uppercase font-bold">
            <span>Order Received</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="font-display font-black text-2xl text-blue-300">
            {countByStatus.received}
          </div>
          <div className="text-[11px] text-slate-500">Awaiting packaging</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F1F] border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-purple-400 uppercase font-bold">
            <span>Preparing</span>
            <Package className="w-4 h-4" />
          </div>
          <div className="font-display font-black text-2xl text-purple-300">
            {countByStatus.preparing}
          </div>
          <div className="text-[11px] text-slate-500">In warehouse packing</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F1F] border border-amber-400/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 uppercase font-bold">
            <span>Shipped</span>
            <Truck className="w-4 h-4" />
          </div>
          <div className="font-display font-black text-2xl text-amber-300">
            {countByStatus.shipped}
          </div>
          <div className="text-[11px] text-slate-500">Out with courier</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F1F] border border-emerald-500/20 space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-emerald-400 uppercase font-bold">
            <span>Delivered</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="font-display font-black text-2xl text-emerald-300">
            {countByStatus.delivered}
          </div>
          <div className="text-[11px] text-slate-500">Completed deliveries</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B0F1F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', ...statuses].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedStatusFilter === status
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {status}
              {status === 'All' ? ` (${orders.length})` : ''}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order #, customer, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Showing <strong className="text-white">{filteredOrders.length}</strong> of {orders.length} orders
          </span>
          <span className="text-[11px] text-amber-400/90 font-medium">
            Tip: Click any status button below to instantly update customer's live tracking
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0B0F1F] border border-white/10 space-y-3">
            <Package className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-display font-bold text-lg text-white">No Orders Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No orders matched your active filters or search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedStatusFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-black font-black uppercase text-xs cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              id={`admin-order-row-${order.id}`}
              className="p-6 rounded-2xl bg-[#0B0F1F] border border-white/10 hover:border-amber-400/30 transition-all shadow-xl space-y-5"
            >
              {/* Row Header: Order ID, Date, Customer, and Amount */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-xl text-white tracking-wide">
                      ORDER #{order.id}
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-black uppercase border ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Placed on {order.date}</span>
                    <span>&bull;</span>
                    <span>Payment: <strong className="text-emerald-400 font-semibold">{order.paymentMethod}</strong></span>
                  </div>
                </div>

                {/* Total and Actions */}
                <div className="flex items-center gap-4 self-start lg:self-center">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Total Order Value</div>
                    <div className="font-display font-black text-xl text-amber-400">
                      {order.total} <span className="text-xs font-bold text-amber-300">EGP</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectOrder(order);
                      onNavigate('order-detail');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Receipt</span>
                  </button>
                </div>
              </div>

              {/* Middle Section: Customer & Delivery Info + Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                {/* Customer Details */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <div className="font-display font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Delivery Recipient</span>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <div className="font-bold text-white text-sm">{order.customer.fullName}</div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <a href={`tel:${order.customer.phone}`} className="hover:text-emerald-400 underline">
                        {order.customer.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-3 h-3 text-purple-400" />
                      <a href={`mailto:${order.customer.email}`} className="hover:text-purple-300 truncate">
                        {order.customer.email}
                      </a>
                    </div>
                    <div className="pt-1 text-slate-300 leading-snug">
                      {order.customer.address}, {order.customer.area}, <strong className="text-white">{order.customer.city}</strong>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <div className="font-display font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    <span>Package Items ({order.items.reduce((s, i) => s + i.quantity, 0)})</span>
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-1">
                        <div>
                          <span className="text-white font-bold">{item.quantity}x</span>{' '}
                          <span className="text-slate-300">{item.productName}</span>
                        </div>
                        <span className="text-slate-400 font-mono">{item.price * item.quantity} EGP</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-1 flex justify-between text-[11px] text-slate-400 border-t border-white/5">
                    <span>Shipping: {order.shipping === 0 ? 'FREE' : `${order.shipping} EGP`}</span>
                    <span className="text-slate-300 font-bold">Subtotal: {order.subtotal} EGP</span>
                  </div>
                </div>

                {/* Tracking & Courier Number */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <div className="font-display font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Courier Tracking</span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tracking Code:</span>
                      <span className="font-mono text-amber-300 font-bold">{order.trackingNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimated Delivery:</span>
                      <span className="text-slate-200">{order.estimatedDelivery}</span>
                    </div>

                    {editingTrackingId === order.id ? (
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={trackingInputValue}
                          onChange={(e) => setTrackingInputValue(e.target.value)}
                          placeholder="e.g. EGY-BOSTA-9901"
                          className="px-2.5 py-1.5 rounded-lg bg-[#080B14] border border-white/20 text-white text-xs w-full focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={() => {
                            if (onUpdateOrderTracking && trackingInputValue.trim()) {
                              onUpdateOrderTracking(order.id, trackingInputValue.trim());
                            }
                            setEditingTrackingId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-bold uppercase text-[10px] cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTrackingId(order.id);
                          setTrackingInputValue(order.trackingNumber);
                        }}
                        className="text-[11px] text-purple-300 hover:text-purple-200 underline pt-1 cursor-pointer block"
                      >
                        Edit Courier Tracking #
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Control Strip: CHANGE STATUS BUTTONS */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Update Order Status:</span>
                  <span className="text-xs font-bold text-amber-300">
                    Current: <strong className="text-white">{order.status}</strong>
                  </span>
                </div>

                {/* 4 One-Click Status Selector Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {statuses.map((st) => {
                    const isSelected = order.status === st;

                    return (
                      <button
                        key={st}
                        onClick={() => onUpdateOrderStatus(order.id, st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] ring-2 ring-amber-400/50'
                            : 'bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                        <span>{st}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
