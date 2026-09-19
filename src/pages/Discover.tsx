import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getFeedVideos, searchProfiles, FeedVideo, RemoteProfile } from '../lib/api';

const trendingHashtags = ['abidjan', 'wax', 'tech', 'dev', 'mode', 'unboxing'];

export default function Discover() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<FeedVideo[]>([]);
  const [profiles, setProfiles] = useState<RemoteProfile[]>([]);
  const { setViewingProfileId, setTab } = useApp();

  useEffect(() => {
    getFeedVideos().then(setVideos);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) {
        searchProfiles(query).then(setProfiles);
      } else {
        setProfiles([]);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="h-full overflow-y-auto p-4 pb-8">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 mb-4">
        <Search size={18} className="text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un compte..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <h3 className="font-semibold mb-2">Hashtags (exemples)</h3>
      <div className="flex flex-wrap gap-2 mb-5">
        {trendingHashtags.map(h => (
          <span key={h} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">#{h}</span>
        ))}
      </div>

      {query && (
        <div className="mb-5">
          <h3 className="font-semibold mb-2">Comptes</h3>
          <div className="space-y-3">
            {profiles.length === 0 && <p className="text-sm text-gray-500">Aucun resultat.</p>}
            {profiles.map(p => (
              <button key={p.id} onClick={() => setViewingProfileId(p.id)} className="flex items-center gap-3 w-full">
                <img src={p.avatar} className="w-10 h-10 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-sm">@{p.username}</p>
                  <p className="text-xs text-gray-500">{p.displayName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <h3 className="font-semibold mb-2">Videos recentes</h3>
      <div className="grid grid-cols-3 gap-1">
        {videos.map(v => (
          <img key={v.id} src={v.coverUrl || 'https://picsum.photos/seed/' + v.id + '/300/300'} className="w-full h-32 object-cover rounded-sm" />
        ))}
        {videos.length === 0 && <p className="col-span-3 text-center text-sm text-gray-500 py-6">Aucune video pour l'instant.</p>}
      </div>

      <button
        onClick={() => setTab('marketplace')}
        className="mt-6 w-full bg-brand-500 text-white rounded-2xl py-3.5 font-semibold shadow-sm shadow-brand-500/20"
      >
        Explorer la Marketplace
      </button>
    </div>
  );
}
