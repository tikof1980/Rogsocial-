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
    <div className="p-4 pb-8 h-full overflow-y-auto">
      <div className="flex gap-2 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
        {(['creator', 'merchant', 'live'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs py-2 rounded-full font-semibold transition-colors ${
              tab === t ? 'bg-brand-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
            }`}
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
        <div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Stat label="Commandes" value={orders.length} />
            <Stat label="Revenus (FCFA)" value={revenue.toLocaleString()} />
          </div>
          <h3 className="font-semibold mb-2">Commandes récentes</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {orders.length === 0 && (
              <p className="text-sm text-gray-500 p-4">Aucune commande pour l'instant.</p>
            )}
            {orders.map((o, i) => (
              <div
                key={o.id}
                className={`flex justify-between text-sm px-4 py-3 ${
                  i !== orders.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
                }`}
              >
                <span>{o.productName} × {o.quantity}</span>
                <span className="text-gray-500">{o.status}</span>
              </div>
            ))}
          </div>
        </div>
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

function Stat({ label, value }: { label: string; value: number | string })
