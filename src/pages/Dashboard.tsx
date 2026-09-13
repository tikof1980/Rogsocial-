import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { videos, liveStreams } from '../data/mockData';

type Tab = 'creator' | 'merchant' | 'live';

interface StatProps {
  label: string;
  value: number | string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

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
        <div c
