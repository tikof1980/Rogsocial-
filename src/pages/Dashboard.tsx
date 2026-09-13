import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { videos, liveStreams } from '../data/mockData';

type Tab = 'creator' | 'merchant' | 'live';

interface StatProps {
  label: string;
  value: number | string;
}

function Stat(props: StatProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
      <p className="text-2xl font-bold">{props.value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{props.label}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, orders } = useApp();
  const [tab, setTab] = useState<Tab>('creator');
  const myVideos = videos.filter(function (v) {
    return v.userId === user.id;
  });
  const myLives = liveStreams.filter(function (l) {
    return l.hostId === user.id;
  });
  const totalLikes = myVideos.reduce(function (s, v) {
    return s + v.likes;
  }, 0);
  const revenue = orders.reduce(function (s, o) {
    return s + o.price * o.quantity;
  }, 0);

  return (
    <div className="p-4 pb-8 h-full overflow-y-auto">
      <div className="flex gap-2 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
        <button
          onClick={function () { setTab('creator'); }}
          className={tab === 'creator' ? 'flex-1 text-xs py-2 rounded-full font-semibold bg-brand-500 text-white shadow-sm' : 'flex-1 text-xs py-2 rounded-full font-semibold text-gray-500 dark:text-gray-400'}
        >
          Createur
        </button>
        <button
          onClick={function () { setTab('merchant'); }}
          className={tab === 'merchant' ? 'flex-1 text-xs py-2 rounded-full font-semibold bg-brand-500 text-white shadow-sm' : 'flex-1 text-xs py-2 rounded-full font-semibold text-gray-500 dark:text-gray-400'}
        >
          Commercant
        </button>
        <button
          onClick={function () { setTab('live'); }}
          className={tab === 'live' ? 'flex-1 text-xs py-2 rounded-full font-semibold bg-brand-500 text-white shadow-sm' : 'flex-1 text-xs py-2 rounded-full font-semibold text-gray-500 dark:text-gray-400'}
        >
          LIVE
        </button>
      </div>

      {tab === 'creator' && (
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Videos publiees" value={myVideos.length} />
          <Stat label="Abonnes" value={user.followers} />
          <Stat label="Likes cumules" value={totalLikes} />
          <Stat label="Vues estimees" value={totalLikes * 8} />
        </div>
      )}

      {tab === 'merchant' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Stat label="Commandes" value={orders.length} />
            <Stat label="Revenus FCFA" value={revenue.toLocaleString()} />
          </div>
          <h3 className="font-semibold mb-2">Commandes recentes</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {orders.length === 0 && (
              <p className="text-sm text-gray-500 p-4">Aucune commande pour le moment.</p>
            )}
            {orders.map(function (o, i) {
              var borderClass = i !== orders.length - 1 ? 'flex justify-between text-sm px-4 py-3 border-b border-gray-100 dark:border-gray-800' : 'flex justify-between text-sm px-4 py-3';
              return (
                <div key={o.id} className={borderClass}>
                  <span>{o.productName} x {o.quantity}</span>
                  <span className="text-gray-500">{o.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'live' && (
        <div className="grid grid-cols-2 gap-3">
          <Stat label="LIVE realises" value={myLives.length} />
          <Stat label="Spectateurs cumules" value={myLives.reduce(function (s, l) { return s + l.viewers; }, 0)} />
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        Statistiques calculees sur donnees simulees, a connecter a une base analytics reelle.
      </p>
    </div>
  );
}
