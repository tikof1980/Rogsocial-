import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TabKey, CartItem, Product, Order, AppUser } from '../types';
import { useAuth } from './AuthContext';

interface AppContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  tab: TabKey;
  setTab: (t: TabKey) => void;
  likedVideos: Set<string>;
  toggleLike: (id: string) => void;
  favoritedVideos: Set<string>;
  toggleFavorite: (id: string) => void;
  followedUsers: Set<string>;
  toggleFollow: (id: string) => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  orders: Order[];
  placeOrder: (p: Product, qty: number) => void;
  user: AppUser;
  viewingProfileId: string | null;
  setViewingProfileId: (id: string | null) => void;
  viewingLiveId: string | null;
  setViewingLiveId: (id: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { session, profile } = useAuth();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [tab, setTab] = useState<TabKey>('feed');
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [favoritedVideos, setFavoritedVideos] = useState<Set<string>>(new Set());
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [viewingLiveId, setViewingLiveId] = useState<string | null>(null);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const toggleSet = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === p.id);
      if (existing) {
        return prev.map(c => (c.product.id === p.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { product: p, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.product.id !== id));

  const placeOrder = (p: Product, qty: number) => {
    setOrders(prev => [
      { id: 'o' + Date.now(), productName: p.name, price: p.price, quantity: qty, status: 'en attente' },
      ...prev
    ]);
  };

  const user: AppUser = {
    id: session?.user.id || 'u0',
    username: profile?.username || 'utilisateur',
    displayName: profile?.display_name || profile?.username || 'Utilisateur',
    avatar: profile?.avatar_url || 'https://i.pravatar.cc/150?img=12',
    bio: profile?.bio || '',
    followers: 0,
    following: 0,
    likes: 0,
    role: 'creator',
    verified: false
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        tab,
        setTab,
        likedVideos,
        toggleLike: (id) => toggleSet(likedVideos, id, setLikedVideos),
        favoritedVideos,
        toggleFavorite: (id) => toggleSet(favoritedVideos, id, setFavoritedVideos),
        followedUsers,
        toggleFollow: (id) => toggleSet(followedUsers, id, setFollowedUsers),
        cart,
        addToCart,
        removeFromCart,
        orders,
        placeOrder,
        user,
        viewingProfileId,
        setViewingProfileId,
        viewingLiveId,
        setViewingLiveId
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
