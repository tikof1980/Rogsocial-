import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ShoppingBag, X } from 'lucide-react';
import { VideoItem } from '../types';
import { getUser } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function VideoCard({ video }: { video: VideoItem }) {
  const { likedVideos, toggleLike, favoritedVideos, toggleFavorite, followedUsers, toggleFollow, setViewingProfileId, addToCart, placeOrder } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const author = getUser(video.userId);
  const liked = likedVideos.has(video.id);
  const favorited = favoritedVideos.has(video.id);
  const following = followedUsers.has(video.userId);

  return (
    <div className="relative w-full h-full snap-start bg-black flex items-center justify-center overflow-hidden">
      <img src={video.cover} alt="" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="absolute bottom-6 left-4 right-20 text-white">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => setViewingProfileId(video.userId)}>
            <img src={author?.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
          </button>
          <span className="font-semibold">@{author?.username}</span>
          {!following && (
            <button
              onClick={() => toggleFollow(video.userId)}
              className="ml-2 text-xs bg-brand-500 px-2 py-1 rounded-full font-semibold"
            >
              Suivre
            </button>
          )}
        </div>
        <p className="text-sm">{video.description}</p>
        <p className="text-xs mt-1 opacity-80">🎵 {video.music}</p>
      </div>

      <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5 text-white">
        <button onClick={() => toggleLike(video.id)} className="flex flex-col items-center">
          <Heart size={28} fill={liked ? '#ff2d55' : 'none'} color={liked ? '#ff2d55' : 'white'} />
          <span className="text-xs mt-1">{video.likes + (liked ? 1 : 0)}</span>
        </button>
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
          <MessageCircle size={26} />
          <span className="text-xs mt-1">{video.comments.length}</span>
        </button>
        <button className="flex flex-col items-center">
          <Share2 size={26} />
          <span className="text-xs mt-1">{video.shares}</span>
        </button>
        <button onClick={() => toggleFavorite(video.id)} className="flex flex-col items-center">
          <Bookmark size={26} fill={favorited ? 'white' : 'none'} />
        </button>
        {video.product && (
          <button onClick={() => setShowProduct(true)} className="flex flex-col items-center">
            <div className="bg-white rounded-full p-1.5">
              <ShoppingBag size={20} className="text-black" />
            </div>
          </button>
        )}
      </div>

      {showComments && (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-white dark:bg-gray-900 rounded-t-2xl p-4 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-black dark:text-white">Commentaires ({video.comments.length})</h3>
            <button onClick={() => setShowComments(false)}><X size={20} className="text-black dark:text-white" /></button>
          </div>
          <div className="space-y-3 overflow-y-auto h-4/5">
            {video.comments.length === 0 && <p className="text-sm text-gray-500">Aucun commentaire pour l'instant.</p>}
            {video.comments.map(c => (
              <div key={c.id} className="flex gap-2">
                <img src={c.avatar} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-black dark:text-white">@{c.username}</p>
                  <p className="text-sm text-black dark:text-white">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showProduct && video.product && (
        <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl p-4 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-black dark:text-white">Produit</h3>
            <button onClick={() => setShowProduct(false)}><X size={20} className="text-black dark:text-white" /></button>
          </div>
          <div className="flex gap-3">
            <img src={video.product.image} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-black dark:text-white">{video.product.name}</p>
              <p className="text-brand-500 font-bold">{video.product.price.toLocaleString()} FCFA</p>
              <p className="text-xs text-gray-500">{video.product.shopName}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => addToCart(video.product!)} className="flex-1 border border-brand-500 text-brand-500 rounded-full py-2 text-sm font-semibold">
              Ajouter au panier
            </button>
            <button onClick={() => { placeOrder(video.product!, 1); setShowProduct(false); }} className="flex-1 bg-brand-500 text-white rounded-full py-2 text-sm font-semibold">
              Commander
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
