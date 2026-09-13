import React from 'react';
import { X, Heart, Send, ShoppingBag, Users, Radio } from 'lucide-react';
import { liveStreams, getUser } from '../data/mockData';
import { useApp } from '../context/AppContext';

function LiveRoom({ liveId }: { liveId: string }) {
  const { setViewingLiveId } = useApp();
  const live = liveStreams.find(l => l.id === liveId)!;
  const host = getUser(live.hostId);

  return (
    <div className="fixed inset-0 z-40 mx-auto max-w-md h-[100dvh] bg-black text-white overflow-hidden">
      <img src={live.cover} className="w-full h-full object-cover opacity-70 absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      <div className="relative flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2 bg-black/40 rounded-full pr-3">
          <img src={host?.avatar} className="w-8 h-8 rounded-full" />
          <span className="text-sm font-semibold">@{host?.username}</span>
          <span className="flex items-center gap-1 text-xs bg-red-600 rounded-full px-2 py-0.5 ml-1">
            <Radio size={10} /> LIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm bg-black/40 px-2 py-1 rounded-full"><Users size={14} />{live.viewers}</span>
          <button onClick={() => setViewingLiveId(null)}><X size={22} /></button>
        </div>
      </div>

      {live.product && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 text-black rounded-xl p-3 flex items-center gap-3 shadow-lg">
          <img src={live.product.image} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold">{live.product.name}</p>
            <p className="text-brand-600 font-bold text-sm">{live.product.price.toLocaleString()} FCFA</p>
          </d
