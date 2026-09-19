import React, { useState } from 'react';
import { Settings, Grid, Heart, LogOut, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { getUser, videos } from '../data/mockData';

export default function Profile() {
  const { user, viewingProfileId, setViewingProfileId, followedUsers, toggleFollow, setTab } = useApp();
  const { signOut, updateProfile } = useAuth();
  const profile = viewingProfileId ? getUser(viewingProfileId) || user : user;
  const isMe = profile.id === user.id;
  const following = followedUsers.has(profile.id);
  const myVideos = videos.filter(v => v.userId === profile.id);

  const [showEdit, setShowEdit] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ display_name: displayName, bio });
    setSaving(false);
    setShowEdit(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4 pb-8">
      {viewingProfileId && !isMe && (
        <button onClick={() => setViewingProfileId(null)} className="text-sm text-brand-500 mb-3">Retour</button>
      )}
      <div className="flex flex-col items-center text-center">
        <img src={profile.avatar} className="w-20 h-20 rounded-full mb-2 ring-2 ring-brand-500/30" />
        <h2 className="font-bold text-lg">{profile.displayName} {profile.verified && '✅'}</h2>
        <p className="text-sm text-gray-500">@{profile.username}</p>
        <p className="text-sm mt-2 px-6">{profile.bio || (isMe ? 'Ajoutez une bio a votre profil' : '')}</p>

        <div className="flex gap-6 mt-4">
          <div className="text-center"><p className="font-bold">{profile.following}</p><p className="text-xs text-gray-500">Abonnements</p></div>
          <div className="text-center"><p className="font-bold">{profile.followers}</p><p className="text-xs text-gray-500">Abonnes</p></div>
          <div className="text-center"><p className="font-bold">{profile.likes}</p><p className="text-xs text-gray-500">Likes</p></div>
        </div>

        <div className="flex gap-2 mt-4 w-full">
          {isMe ? (
            <>
              <button onClick={() => setTab('dashboard')} className="flex-1 bg-brand-500 text-white rounded-full py-2.5 text-sm font-semibold shadow-sm shadow-brand-500/20">
                Tableau de bord
              </button>
              <button onClick={() => setShowEdit(true)} className="border border-gray-300 dark:border-gray-700 rounded-full p-2.5">
                <Settings size={18} />
              </button>
              <button onClick={signOut} className="border border-gray-300 dark:border-gray-700 rounded-full p-2.5">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => toggleFollow(profile.id)}
                className={`flex-1 rounded-full py-2.5 text-sm font-semibold ${following ? 'border border-gray-300 dark:border-gray-700' : 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'}`}
              >
                {following ? 'Abonne(e)' : 'Suivre'}
              </button>
              <button onClick={() => setTab('messages')} className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full py-2.5 text-sm font-semibold">
                Message
              </button>
            </>
          )}
        </div>

        {profile.role !== 'viewer' && (
          <span className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {profile.role === 'creator' ? 'Profil createur' : 'Profil commercant'}
          </span>
        )}
      </div>

      <div className="flex border-t border-gray-200 dark:border-gray-800 mt-5">
        <button className="flex-1 flex justify-center py-2 border-b-2 border-brand-500"><Grid size={20} /></button>
        <button className="flex-1 flex justify-center py-2 text-gray-400"><Heart size={20} /></button>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        {myVideos.map(v => <img key={v.id} src={v.cover} className="w-full h-32 object-cover rounded-sm" />)}
        {myVideos.length === 0 && <p className="col-span-3 text-center text-sm text-gray-500 py-6">Aucune video</p>}
      </div>

      {showEdit && (
        <div className="fixed inset-0 w-full md:max-w-lg md:mx-auto bg-black/50 z-40 flex items-end">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Modifier le profil</h3>
              <button onClick={() => setShowEdit(false)}><X size={20} /></button>
            </div>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Nom affiche"
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm mb-3"
            />
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Bio"
              rows={3}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm mb-4"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-brand-500 text-white rounded-full py-3 font-semibold disabled:opacity-60"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
