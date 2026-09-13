import React, { useState } from 'react';
import { Order, OrderStatus, Page, UserProfile } from '../types';
import {
  User,
  Package,
  Calendar,
  ChevronRight,
  LogOut,
  Settings,
  CheckCircle2,
  Clock,
  Truck,
  Edit2,
  Save,
  Lock,
} from 'lucide-react';

interface ProfilePageProps {
  userProfile: UserProfile;
  orders: Order[];
  onUpdateProfile: (profile: UserProfile) => void;
  onSelectOrder: (order: Order) => void;
  onNavigate: (page: Page) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  orders,
  onUpdateProfile,
  onSelectOrder,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'account'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Local state for editing account details
  const [editData, setEditData] = useState({
    fullName: userProfile.fullName,
    phone: userProfile.phone,
    email: userProfile.email,
    address: userProfile.address,
    city: userProfile.city,
    area: userProfile.area,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      ...editData,
    });
    setIsEditing(false);
  };

  const handleLoginOrSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      fullName: authName || authEmail.split('@')[0] || 'Game Player',
      email: authEmail || 'player@messygames.com',
      isLoggedIn: true,
    });
  };

  const handleLogout = () => {
    onUpdateProfile({
      ...userProfile,
      isLoggedIn: false,
    });
  };

  return (
    <div id="profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / User Welcome */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#12172E] via-[#0E1325] to-[#0A0D1A] border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border-2 border-amber-400/30 text-amber-400 flex items-center justify-center font-display font-black text-2xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            {userProfile.fullName ? userProfile.fullName[0].toUpperCase() : 'M'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {userProfile.isLoggedIn ? userProfile.fullName : 'Guest Account'}
              </h1>
              {userProfile.isLoggedIn && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase">
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {userProfile.isLoggedIn
                ? `${userProfile.email} • Member since 2026`
                : 'Sign in to sync your order history across devices'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-black uppercase tracking-wider hover:bg-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Orders Portal</span>
          </button>

          {userProfile.isLoggedIn && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* If not logged in, show simple Sign In / Sign Up Card */}
      {!userProfile.isLoggedIn ? (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLoginOrSignup} className="space-y-4">
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Omar Mansour"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-300">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
            >
              {authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateProfile({
                    ...userProfile,
                    isLoggedIn: true,
                  })
                }
                className="text-xs text-slate-400 hover:text-amber-400 underline cursor-pointer"
              >
                Continue with Demo Account (Ahmed Hassan)
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Logged In Content */
        <div className="space-y-6">
          {/* Tabs: My Orders vs Account Information */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>MY ORDERS ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>ACCOUNT DETAILS</span>
            </button>
          </div>

          {/* MAIN SECTION: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    MY ORDERS
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track current live delivery status and view item receipts.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#0B0F1F] border border-white/10 space-y-4">
                  <Package className="w-10 h-10 text-slate-500 mx-auto" />
                  <h3 className="font-display font-bold text-lg text-white">No orders yet</h3>
                  <p className="text-xs text-slate-400">
                    When you order games from our store, your tracking and receipts appear here.
                  </p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-black uppercase text-xs cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order) => {
                    const steps: OrderStatus[] = [
                      'ORDER RECEIVED',
                      'PREPARING',
                      'SHIPPED',
                      'DELIVERED',
                    ];
                    const currentIdx = steps.indexOf(order.status);

                    return (
                      <div
                        key={order.id}
                        id={`order-card-${order.id}`}
                        className="p-6 rounded-2xl bg-[#0C1124] border border-white/10 hover:border-amber-400/40 transition-all shadow-xl space-y-6"
                      >
                        {/* Order Header Card */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-display font-black text-lg text-white tracking-wide">
                                ORDER #{order.id}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {order.date}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400">
                              Payment: <span className="text-slate-300 font-medium">{order.paymentMethod}</span> &bull; Delivery: {order.customer.city}, {order.customer.area}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-[10px] text-slate-400 uppercase font-bold">Total</div>
                              <div className="font-display font-black text-xl text-amber-400">
                                {order.total} <span className="text-xs font-bold text-amber-300">EGP</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                onSelectOrder(order);
                                onNavigate('order-detail');
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-slate-200 border border-white/10 transition-colors cursor-pointer"
                            >
                              <span>Details</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Order items preview */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase text-slate-500 mr-2">
                            Items ({order.items.reduce((sum, i) => sum + i.quantity, 0)}):
                          </span>
                          {order.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200"
                            >
                              {item.quantity}x {item.productName}
                            </span>
                          ))}
                        </div>

                        {/* Visual Progress Tracker: ORDER RECEIVED -> PREPARING -> SHIPPED -> DELIVERED */}
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-slate-400">
                              Tracking Progress:
                            </span>
                            <span className="text-xs font-black uppercase text-amber-400 px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                              {order.status}
                            </span>
                          </div>

                          {/* 4 Steps Tracker */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                            {steps.map((st, sIdx) => {
                              const isPassed = sIdx <= currentIdx;
                              const isCurrent = sIdx === currentIdx;

                              return (
                                <div
                                  key={st}
                                  className={`p-3 rounded-xl border text-center transition-all ${
                                    isCurrent
                                      ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                                      : isPassed
                                      ? 'bg-purple-900/30 border-purple-500/40 text-purple-200'
                                      : 'bg-[#080B15] border-white/5 text-slate-600 opacity-60'
                                  }`}
                                >
                                  <div className="flex items-center justify-center mb-1">
                                    {isPassed ? (
                                      <CheckCircle2
                                        className={`w-4 h-4 ${
                                          isCurrent ? 'text-amber-400' : 'text-purple-400'
                                        }`}
                                      />
                                    ) : (
                                      <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center text-slate-500 font-bold">
                                        {sIdx + 1}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    className={`text-[10px] font-black uppercase tracking-wider ${
                                      isCurrent
                                        ? 'text-amber-300'
                                        : isPassed
                                        ? 'text-slate-200'
                                        : 'text-slate-500'
                                    }`}
                                  >
                                    {st}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: ACCOUNT INFORMATION */}
          {activeTab === 'account' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1F] border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase">
                    Account Profile & Address
                  </h2>
                  <p className="text-xs text-slate-400">
                    Update your default shipping address and recipient details.
                  </p>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase text-amber-400 border border-white/10 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editData.fullName}
                        onChange={(e) =>
                          setEditData({ ...editData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        City / Governorate
                      </label>
                      <input
                        type="text"
                        value={editData.city}
                        onChange={(e) =>
                          setEditData({ ...editData, city: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Area / District
                      </label>
                      <input
                        type="text"
                        value={editData.area}
                        onChange={(e) =>
                          setEditData({ ...editData, area: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Street Address & Building
                      </label>
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) =>
                          setEditData({ ...editData, address: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060812] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 text-black font-black uppercase text-xs hover:bg-amber-300 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 font-bold uppercase text-xs hover:bg-white/10 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-bold uppercase">Customer Name</div>
                    <div className="text-white font-bold">{userProfile.fullName}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-bold uppercase">Phone</div>
                    <div className="text-white font-bold">{userProfile.phone}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-bold uppercase">Email</div>
                    <div className="text-white font-bold">{userProfile.email}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-bold uppercase">City & Area</div>
                    <div className="text-white font-bold">
                      {userProfile.city}, {userProfile.area}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <div className="text-xs text-slate-400 font-bold uppercase">Default Address</div>
                    <div className="text-white font-bold">{userProfile.address}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
