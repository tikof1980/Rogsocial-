import React from 'react';
import { X, Heart, Send, ShoppingBag, Users, Radio } from 'lucide-react';
import { liveStreams, getUser } from '../data/mockData';
import { useApp } from '../context/AppContext';

function LiveRoom({ liveId }: { liveId: string }) {
  const { setViewingLiveId } = useApp();
  const live = liveStreams.find(l => l.id === liveId)!;
  const host = getUser(live.hostId);

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-black z-40 text-white">
      <img src={live.cover} className="w-full h-full object-cover opacity-70 absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      <div className="relative flex items-center justify-between p-4">
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
        <div className="absolute top-20 left-4 right-4 bg-white/95 text-black rounded-xl p-3 flex items-center gap-3">
          <img src={live.product.image} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold">{live.product.name}</p>
            <p className="text-brand-600 font-bold text-sm">{live.product.price.toLocaleString()} FCFA</p>
          </div>
          <button className="bg-brand-500 text-white text-xs px-3 py-2 rounded-full font-semibold">Commander</button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
          {live.comments.map(c => (
            <p key={c.id} className="text-sm"><span className="font-semibold">@{c.username} :</span> {c.text}</p>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input placeholder="Ajouter un commentaire..." className="flex-1 bg-black/40 rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-300" />
          <button className="bg-black/40 p-2 rounded-full"><Send size={18} /></button>
          <button className="bg-black/40 p-2 rounded-full"><Heart size={18} /></button>
          {live.product && <button className="bg-black/40 p-2 rounded-full"><ShoppingBag size={18} /></button>}
        </div>
      </div>
    </div>
  );
}

export default function Live() {
  const { viewingLiveId, setViewingLiveId, setTab } = useApp();

  if (viewingLiveId) return <LiveRoom liveId={viewingLiveId} />;

  return (
    <div className="p-4">
      <button
        onClick={() => alert('Démarrage LIVE — à brancher sur WebRTC / fournisseur de streaming')}
        className="w-full bg-red-600 text-white rounded-full py-3 font-semibold mb-5 flex items-center justify-center gap-2"
      >
        <Radio size={18} /> Démarrer un LIVE
      </button>

      <h3 className="font-semibold mb-3">LIVE en cours</h3>
      <div className="grid grid-cols-2 gap-3">
        {liveStreams.map(l => {
          const host = getUser(l.hostId);
          return (
            <button key={l.id} onClick={() => setViewingLiveId(l.id)} className="relative rounded-xl overflow-hidden h-56 text-left">
              <img src={l.cover} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Radio size={10} /> LIVE
              </span>
              <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Users size={10} /> {l.viewers}
              </span>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-xs font-semibold">@{host?.username}</p>
                <p className="text-xs opacity-80 truncate">{l.title}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button onClick={() => setTab('feed')} className="mt-6 text-sm text-brand-500 w-full text-center">← Retour au feed</button>
    </div>
  );
}
