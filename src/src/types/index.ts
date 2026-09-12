export type UserRole = 'viewer' | 'creator' | 'merchant';

export interface AppUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  role: UserRole;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  variants?: string[];
  shopId: string;
  shopName: string;
}

export interface CommentItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
}

export interface VideoItem {
  id: string;
  userId: string;
  cover: string;
  description: string;
  hashtags: string[];
  music: string;
  likes: number;
  comments: CommentItem[];
  shares: number;
  product?: Product;
}

export interface LiveStream {
  id: string;
  hostId: string;
  title: string;
  cover: string;
  viewers: number;
  product?: Product;
  guests: string[];
  comments: CommentItem[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  image?: string;
  time: string;
}

export interface Conversation {
  id: string;
  isGroup: boolean;
  name: string;
  avatar: string;
  participants: string[];
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'order' | 'live';
  text: string;
  read: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  status: 'en attente' | 'confirmée' | 'expédiée' | 'livrée';
}

export type TabKey = 'feed' | 'discover' | 'create' | 'live' | 'messages' | 'profile' | 'roger' | 'dashboard' | 'marketplace';
