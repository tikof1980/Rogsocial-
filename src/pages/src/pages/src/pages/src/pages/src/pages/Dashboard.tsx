import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { videos, liveStreams } from '../data/mockData';

type Tab = 'creator' | 'merchant' | 'live';

export default function Dashboard() {
  const { user, orders } = useApp();
  const [tab, setTab] = useState<Tab>('creator');
  const myVideos = videos.filter(v => v.userId === user.id);
  const myLives = liveStreams.filter(l => l.hostId === user.id);
  const totalLikes = myVideos.reduce((s, v) => s + v.likes, 0);
  const revenue = orders.reduce((s, o) => s + o.price * o.quantity, 0);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-5">
        {(['creator', 'merchant', 'live'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs py-2 rounded-full font-semibold ${tab === t ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            {t === 'creator' ? 'Créateur' : t === 'merchant' ? 'Commerçant' : 'LIVE'}
          </button>
        ))}
      </div>

      {tab === 'creator' && (
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Vidéos publiées" value={myVideos.length} />
          <Stat label="Abonnés" value={user.followers} />
          <Stat label="Likes cumulés" value={totalLikes} />
          <Stat label="Vues estimées" value={totalLikes * 8} />
        </div>
      )}

      {tab === 'merchant' && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Stat label="Commandes" value={orders.length} />
            <Stat label="Revenus (FCFA)" value={revenue.toLocaleString()} />
          </div>
          <h3 className="font-semibold mb-2">Commandes récentes</h3>
          <div className="space-y-2">
            {orders.length === 0 && <p className="text-sm text-gray-500">Aucune commande pour l'instant.</p>}
            {orders.map(o => (
              <div key={o.id} className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-900 py-2">
                <span>{o.productName} × {o.quantity}</span>
                <span className="text-gray-500">{o.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'live' && (
        <div className="grid grid-cols-2 gap-3">
          <Stat label="LIVE réalisés" value={myLives.length} />
          <Stat label="Spectateurs cumulés" value={myLives.reduce((s, l) => s + l.viewers, 0)} />
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        Statistiques calculées sur données simulées — à connecter à une base analytics réelle.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
