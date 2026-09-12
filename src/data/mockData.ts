import { AppUser, VideoItem, LiveStream, Conversation, AppNotification, Product } from '../types';

export const currentUser: AppUser = {
  id: 'u0',
  username: 'roger_ci',
  displayName: 'Roger Kouamé',
  avatar: 'https://i.pravatar.cc/150?img=12',
  bio: 'Fondateur RogWeb Service 🚀 | Abidjan, CI',
  followers: 1240,
  following: 180,
  likes: 15400,
  role: 'merchant',
  verified: true
};

export const users: AppUser[] = [
  currentUser,
  {
    id: 'u1',
    username: 'aicha_mode',
    displayName: 'Aïcha Mode',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Créatrice mode 🇨🇮 | Boutique en ligne',
    followers: 8900,
    following: 210,
    likes: 92000,
    role: 'creator',
    verified: true
  },
  {
    id: 'u2',
    username: 'kone_tech',
    displayName: 'Koné Tech',
    avatar: 'https://i.pravatar.cc/150?img=15',
    bio: 'Gadgets & astuces tech',
    followers: 4200,
    following: 90,
    likes: 31000,
    role: 'creator'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Robe wax élégante',
    price: 15000,
    image: 'https://picsum.photos/seed/robe/300/300',
    stock: 12,
    variants: ['S', 'M', 'L'],
    shopId: 'u1',
    shopName: 'Aïcha Mode'
  },
  {
    id: 'p2',
    name: 'Écouteurs sans fil',
    price: 9500,
    image: 'https://picsum.photos/seed/ecouteurs/300/300',
    stock: 30,
    shopId: 'u2',
    shopName: 'Koné Tech'
  },
  {
    id: 'p3',
    name: 'Sac à main cuir',
    price: 22000,
    image: 'https://picsum.photos/seed/sac/300/300',
    stock: 5,
    shopId: 'u0',
    shopName: 'RogWeb Boutique'
  }
];

export const videos: VideoItem[] = [
  {
    id: 'v1',
    userId: 'u1',
    cover: 'https://picsum.photos/seed/v1/400/700',
    description: 'Nouvelle collection wax 🔥 Qui valide ? #mode #wax #abidjan',
    hashtags: ['mode', 'wax', 'abidjan'],
    music: 'Son original - Aïcha Mode',
    likes: 3400,
    shares: 120,
    comments: [
      { id: 'c1', userId: 'u2', username: 'kone_tech', avatar: 'https://i.pravatar.cc/150?img=15', text: 'Magnifique 😍', likes: 12 }
    ],
    product: products[0]
  },
  {
    id: 'v2',
    userId: 'u2',
    cover: 'https://picsum.photos/seed/v2/400/700',
    description: 'Test du nouvel écouteur, le son est top 🎧 #tech #unboxing',
    hashtags: ['tech', 'unboxing'],
    music: 'Beat tech - DJ Yao',
    likes: 1890,
    shares: 45,
    comments: [],
    product: products[1]
  },
  {
    id: 'v3',
    userId: 'u0',
    cover: 'https://picsum.photos/seed/v3/400/700',
    description: 'On construit RogSocial en direct 💻 #rogweb #dev #abidjan',
    hashtags: ['rogweb', 'dev', 'abidjan'],
    music: 'Lofi Abidjan Vibes',
    likes: 5600,
    shares: 300,
    comments: []
  }
];

export const liveStreams: LiveStream[] = [
  {
    id: 'l1',
    hostId: 'u1',
    title: 'Vente flash robes wax 🔥',
    cover: 'https://picsum.photos/seed/live1/400/700',
    viewers: 342,
    product: products[0],
    guests: ['u2'],
    comments: [
      { id: 'lc1', userId: 'u0', username: 'roger_ci', avatar: currentUser.avatar, text: 'Prix svp ?', likes: 2 }
    ]
  },
  {
    id: 'l2',
    hostId: 'u2',
    title: 'Déballage nouveaux gadgets',
    cover: 'https://picsum.photos/seed/live2/400/700',
    viewers: 128,
    guests: [],
    comments: []
  }
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    isGroup: false,
    name: 'Aïcha Mode',
    avatar: users[1].avatar,
    participants: ['u0', 'u1'],
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Bonjour, votre commande est prête 👗', time: '09:12' },
      { id: 'm2', senderId: 'u0', text: 'Super merci, je passe demain', time: '09:15' }
    ]
  },
  {
    id: 'conv2',
    isGroup: true,
    name: 'Vendeurs RogSocial CI',
    avatar: 'https://i.pravatar.cc/150?img=50',
    participants: ['u0', 'u1', 'u2'],
    messages: [
      { id: 'm3', senderId: 'u2', text: 'On lance une promo groupée ce week-end ?', time: 'Hier' }
    ]
  }
];

export const notifications: AppNotification[] = [
  { id: 'n1', type: 'like', text: 'Aïcha Mode a aimé votre vidéo', read: false },
  { id: 'n2', type: 'follow', text: 'Koné Tech vous suit maintenant', read: false },
  { id: 'n3', type: 'order', text: 'Nouvelle commande : Sac à main cuir', read: true },
  { id: 'n4', type: 'live', text: 'Aïcha Mode est en LIVE maintenant', read: true }
];

export function getUser(id: string): AppUser | undefined {
  return users.find(u => u.id === id);
}
