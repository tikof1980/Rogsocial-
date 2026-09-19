import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TabKey, CartItem, Product, Order, AppUser } from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { getProfile } from '../lib/api';

interface AppContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  tab: TabKey;
  setTab: (t: TabKey) => void;
  likedVideos: Set<string>;
  toggleLike: (videoId: string) => void;
  favoritedVideos: Set<string>;
  toggleFavorite: (videoId: string) => void;
  followedUsers: Set<string>;
  toggleFollow: (targetUserId: string) => void;
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
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const [likesRes, favRes, followRes] = await Promise.all([
        supabase.from('likes').select('video_id').eq('user_id', userId),
        supabase.from('favorites').select('video_id').eq('user_id', userId),
        supabase.from('follows').select('following_id').eq('follower_id', userId)
      ]);
      setLikedVideos(new Set((likesRes.data || []).map((r: any) => r.video_id)));
      setFavoritedVideos(new Set((favRes.data || []).map((r: any) => r.video_id)));
      setFollowedUsers(new Set((followRes.data || []).map((r: any) => r.following_id)));
      const p = await getProfile(userId);
      if (p) {
        setFollowersCount(p.followersCount);
        setFollowingCount(p.followingCount);
      }
    })();
  }, [userId]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const toggleLike = (videoId: string) => {
    if (!userId) return;
    const wasLiked = likedVideos.has(videoId);
    setLikedVideos(prev => {
      const next = new Set(prev);
      wasLiked ? next.delete(videoId) : next.add(videoId);
      return next;
    });
    if (wasLiked) {
      supabase.from('likes').delete().eq('video_id', videoId).eq('user_id', userId);
    } else {
      supabase.from('likes').insert({ video_id: videoId, user_id: userId });
    }
  };

  const toggleFavorite = (videoId: string) => {
    if (!userId) return;
    const wasFav = favoritedVideos.has(videoId);
    setFavoritedVideos(prev => {
      const next = new Set(prev);
      wasFav ? next.delete(videoId) : next.add(videoId);
      return next;
    });
    if (wasFav) {
      supabase.from('favorites').delete().eq('video_id', videoId).eq('user_id', userId);
    } else {
      supabase.from('favorites').insert({ video_id: videoId, user_id: userId });
    }
  };

  const toggleFollow = (targetUserId: string) => {
    if (!userId || targetUserId === userId) return;
    const wasFollowing = followedUsers.has(targetUserId);
    setFollowedUsers(prev => {
      const next = new Set(prev);
      wasFollowing ? next.delete(targetUserId) : next.add(targetUserId);
      return next;
    });
    if (wasFollowing) {
      supabase.from('follows').delete().eq('follower_id', userId).eq('following_id', targetUserId);
    } else {
      supabase.from('follows').insert({ follower_id: userId, following_id: targetUserId });
    }
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
    id: userId || 'u0',
    username: profile?.username || 'utilisateur',
    displayName: profile?.display_name || profile?.username || 'Utilisateur',
    avatar: profile?.avatar_url || 'https://i.pravatar.cc/150?img=12',
    bio: profile?.bio || '',
    followers: followersCount,
    following: followingCount,
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
        toggleLike,
        favoritedVideos,
        toggleFavorite,
        followedUsers,
        toggleFollow,
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
