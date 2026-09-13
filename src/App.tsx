import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem, Order, OrderStatus, UserProfile } from './types';
import { PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { SearchPage } from './pages/SearchPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Navigation state: starts on 'home'
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('messy_games_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('messy_games_wishlist');
      return saved ? JSON.parse(saved) : ['messy-mayhem'];
    } catch {
      return ['messy-mayhem'];
    }
  });

  // Orders state persisted in localStorage (seeded with realistic initial orders)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('messy_games_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User profile persisted in localStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('messy_games_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Coupon state
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' | 'info' } | null>(
    null
  );

  // Admin authentication state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('messy_games_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('messy_games_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('messy_games_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('messy_games_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('messy_games_user', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  // Toast auto dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info') => {
    setToast({ message, type });
  };

  // Scroll to top on page navigation
  const navigateTo = (page: Page) => {
    if (page === 'admin' && !isAdminUnlocked) {
      setShowAdminAuthModal(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminUnlocked(true);
    setShowAdminAuthModal(false);
    try {
      sessionStorage.setItem('messy_games_admin_auth', 'true');
    } catch {}
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Admin Dashboard Unlocked with Adouma1234', 'info');
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart!`, 'cart');
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    navigateTo('checkout');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist!`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  // View Product Detail action
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  // Order Placement
  const handlePlaceOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setSelectedOrder(order);
    setCart([]); // Clear cart upon successful order
    setAppliedDiscount(0);
    setDiscountCode('');
    navigateTo('confirmation');
  };

  // Order status update (e.g. for demo transitions)
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
    showToast(`Order #${orderId} status updated to "${nextStatus}"`, 'info');
  };

  const handleUpdateOrderTracking = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, trackingNumber } : o))
    );
    showToast(`Tracking updated for Order #${orderId}`, 'info');
  };

  const handleCreateDemoOrder = () => {
    const demoId = `MG-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const newDemoOrder: Order = {
      id: demoId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [
        {
          productId: randomProduct.id,
          productName: randomProduct.name,
          price: randomProduct.price,
          quantity: Math.floor(Math.random() * 2) + 1,
          accentColor: randomProduct.accentColor,
          category: randomProduct.category,
        },
      ],
      subtotal: randomProduct.price,
      shipping: 50,
      total: randomProduct.price + 50,
      status: 'ORDER RECEIVED',
      customer: {
        fullName: 'Nour El-Din Sherif',
        phone: '+20 122 555 4321',
        email: 'nour.sherif@example.com',
        address: 'Bldg 14, Degla Street, Floor 3',
        city: 'Cairo',
        area: 'Maadi',
      },
      paymentMethod: 'Cash on Delivery (COD)',
      trackingNumber: `EGY-BOSTA-${Math.floor(10000 + Math.random() * 90000)}`,
      estimatedDelivery: 'Tomorrow afternoon',
    };

    setOrders((prev) => [newDemoOrder, ...prev]);
    showToast(`New sample order #${demoId} created!`, 'info');
  };

  // Cart total item count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#080B14] text-slate-100 selection:bg-amber-400 selection:text-black">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0D1224] border border-amber-400/40 text-white shadow-2xl shadow-purple-950/60 backdrop-blur-xl"
          >
            {toast.type === 'cart' ? (
              <ShoppingBag className="w-5 h-5 text-amber-400 flex-shrink-0" />
            ) : toast.type === 'wishlist' ? (
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Password Gate Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => setShowAdminAuthModal(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Main Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        isLoggedIn={userProfile.isLoggedIn}
      />

      {/* Main Content: Render Separate Pages */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* 1. HOME PAGE */}
            {currentPage === 'home' && (
              <HomePage
                products={PRODUCTS}
                onNavigate={navigateTo}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {/* 2. SHOP PAGE */}
            {currentPage === 'shop' && (
              <ShopPage
                products={PRODUCTS}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {/* 3. PRODUCT DETAILS PAGE */}
            {currentPage === 'product-detail' && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                allProducts={PRODUCTS}
                onNavigate={navigateTo}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistIds.includes(selectedProduct.id)}
                wishlistIds={wishlistIds}
              />
            )}

            {/* 4. CART PAGE */}
            {currentPage === 'cart' && (
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onNavigate={navigateTo}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                appliedDiscount={appliedDiscount}
                setAppliedDiscount={setAppliedDiscount}
              />
            )}

            {/* 5. CHECKOUT PAGE */}
            {currentPage === 'checkout' && (
              <CheckoutPage
                cart={cart}
                userProfile={userProfile}
                appliedDiscount={appliedDiscount}
                onPlaceOrder={handlePlaceOrder}
                onNavigate={navigateTo}
              />
            )}

            {/* 6. ORDER CONFIRMATION PAGE */}
            {currentPage === 'confirmation' && (
              <OrderConfirmationPage
                order={selectedOrder || orders[0]}
                onNavigate={navigateTo}
                onSelectOrder={(ord) => {
                  setSelectedOrder(ord);
                  navigateTo('order-detail');
                }}
              />
            )}

            {/* 7. PROFILE PAGE */}
            {currentPage === 'profile' && (
              <ProfilePage
                userProfile={userProfile}
                orders={orders}
                onUpdateProfile={setUserProfile}
                onSelectOrder={(ord) => {
                  setSelectedOrder(ord);
                  navigateTo('order-detail');
                }}
                onNavigate={navigateTo}
              />
            )}

            {/* ORDER DETAIL PAGE */}
            {currentPage === 'order-detail' && (
              <OrderDetailPage
                order={selectedOrder || orders[0]}
                onNavigate={navigateTo}
              />
            )}

            {/* 8. WISHLIST PAGE */}
            {currentPage === 'wishlist' && (
              <WishlistPage
                wishlistProducts={wishlistProducts}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onNavigate={navigateTo}
              />
            )}

            {/* 9. ABOUT PAGE */}
            {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

            {/* 10. CONTACT PAGE */}
            {currentPage === 'contact' && <ContactPage />}

            {/* 11. FAQ PAGE */}
            {currentPage === 'faq' && <FaqPage onNavigate={navigateTo} />}

            {/* 12. SEARCH RESULTS PAGE */}
            {currentPage === 'search' && (
              <SearchPage
                products={PRODUCTS}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onNavigate={navigateTo}
              />
            )}

            {/* 13. ADMIN ORDERS DASHBOARD PAGE */}
            {currentPage === 'admin' && (
              <AdminDashboardPage
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateOrderTracking={handleUpdateOrderTracking}
                onSelectOrder={(ord) => {
                  setSelectedOrder(ord);
                  navigateTo('order-detail');
                }}
                onNavigate={navigateTo}
                onCreateDemoOrder={handleCreateDemoOrder}
                onLogout={() => {
                  setIsAdminUnlocked(false);
                  navigateTo('home');
                  showToast('Admin session locked', 'info');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Main Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
