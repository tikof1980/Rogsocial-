import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { videos, users } from '../data/mockData';
import { useApp } from '../context/AppContext';

const trendingHashtags = ['abidjan', 'wax', 'tech', 'dev', 'mode', 'unboxing'];

export default function Discover() {
  const [query, setQuery] = useState('');
  const { setViewingProfileId, setTab } = useApp();

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.displayName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 mb-4">
        <Search size={18} className="text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un compte, un hashtag..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <h3 className="font-semibold mb-2">Hashtags tendances</h3>
      <div className="flex flex-wrap gap-2 mb-5">
        {trendingHashtags.map(h => (
          <span key={h} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">#{h}</span>
        ))}
      </div>

      {query && (
        <>
          <h3 className="font-semibold mb-2">Comptes</h3>
          <div className="space-y-3 mb-5">
            {filteredUsers.map(u => (
              <button key={u.id} onClick={() => setViewingProfileId(u.id)} className="flex items-center gap-3 w-full">
                <img src={u.avatar} className="w-10 h-10 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-sm">@{u.username}</p>
                  <p className="text-xs text-gray-500">{u.followers} abonnés</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <h3 className="font-semibold mb-2">Vidéos à explorer</h3>
      <div className="grid grid-cols-3 gap-1">
        {videos.map(v => (
          <img key={v.id} src={v.cover} className="w-full h-32 object-cover rounded" />
        ))}
      </div>

      <button
        onClick={() => setTab('marketplace')}
        className="mt-6 w-full bg-brand-500 text-white rounded-full py-3 font-semibold"
      >
        🛒 Explorer la Marketplace
      </button>
    </div>
  );
}
