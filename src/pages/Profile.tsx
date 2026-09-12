import React from 'react';
import { Settings, Grid, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUser, videos } from '../data/mockData';

export default function Profile() {
  const { user, viewingProfileId, setViewingProfileId, followedUsers, toggleFollow, setTab } = useApp();
  const profile = viewingProfileId ? getUser(viewingProfileId) || user : user;
  const isMe = profile.id === user.id;
  const following = followedUsers.has(profile.id);
  const myVideos = videos.filter(v => v.userId === profile.id);

  return (
    <div className="p-4">
      {viewingProfileId && !isMe && (
        <button onClick={() => setViewingProfileId(null)} className="text-sm text-brand-500 mb-3">← Retour</button>
      )}
      <div className="flex flex-col items-center text-center">
        <img src={profile.avatar} className="w-20 h-20 rounded-full mb-2" />
        <h2 className="font-bold text-lg">{profile.displayName} {profile.verified && '✅'}</h2>
        <p className="text-sm text-gray-500">@{profile.username}</p>
        <p className="text-sm mt-2 px-6">{profile.bio}</p>

        <div className="flex gap-6 mt-4">
          <div className="text-center"><p className="font-bold">{profile.following}</p><p className="text-xs text-gray-500">Abonnements</p></div>
          <div className="text-center"><p className="font-bold">{profile.followers}</p><p className="text-xs text-gray-500">Abonnés</p></div>
          <div className="text-center"><p className="font-bold">{profile.likes}</p><p className="text-xs text-gray-500">Likes</p></div>
        </div>

        <div className="flex gap-2 mt-4 w-full">
          {isMe ? (
            <>
              <button onClick={() => setTab('dashboard')} className="flex-1 bg-brand-500 text-white rounded-full py-2 text-sm font-semibold">
                Tableau de bord
              </button>
              <button className="border border-gray-300 dark:border-gray-700 rounded-full p-2"><Settings size={18} /></button>
            </>
          ) : (
            <>
              <button
                onClick={() => toggleFollow(profile.id)}
                className={`flex-1 rounded-full py-2 text-sm font-semibold ${following ? 'border border-gray-300 dark:border-gray-700' : 'bg-brand-500 text-white'}`}
              >
                {following ? 'Abonné(e)' : 'Suivre'}
              </button>
              <button onClick={() => setTab('messages')} className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full py-2 text-sm font-semibold">
                Message
              </button>
            </>
          )}
        </div>

        {profile.role !== 'viewer' && (
          <span className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {profile.role === 'creator' ? '🎬 Profil créateur' : '🏪 Profil commerçant'}
          </span>
        )}
      </div>

      <div className="flex border-t border-gray-200 dark:border-gray-800 mt-5">
        <button className="flex-1 flex justify-center py-2 border-b-2 border-brand-500"><Grid size={20} /></button>
        <button className="flex-1 flex justify-center py-2 text-gray-400"><Heart size={20} /></button>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        {myVideos.map(v => <img key={v.id} src={v.cover} className="w-full h-32 object-cover" />)}
        {myVideos.length === 0 && <p className="col-span-3 text-center text-sm text-gray-500 py-6">Aucune vidéo</p>}
      </div>
    </div>
  );
}
