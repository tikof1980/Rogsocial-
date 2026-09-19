import React, { useState } from 'react';
import { Video, Music, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { uploadMedia, createVideo } from '../lib/api';

export default function Create() {
  const { setTab, user } = useApp();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [music, setMusic] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!videoFile) {
      setError('Selectionnez une photo ou une video.');
      return;
    }
    setError(null);
    setPublishing(true);
    try {
      const videoUrl = await uploadMedia(videoFile, user.id);
      let coverUrl: string | null = null;
      if (coverFile) {
        coverUrl = await uploadMedia(coverFile, user.id);
      }
      const parsedHashtags = hashtags
        .split(/[\s,]+/)
        .map(h => h.replace('#', '').trim())
        .filter(Boolean);
      const { error: insertError } = await createVideo({
        userId: user.id,
        videoUrl,
        coverUrl,
        description,
        hashtags: parsedHashtags,
        music
      });
      if (insertError) {
        setError(insertError.message);
        setPublishing(false);
        return;
      }
      setVideoFile(null);
      setCoverFile(null);
      setDescription('');
      setHashtags('');
      setMusic('');
      setPublishing(false);
      setTab('feed');
    } catch (e: any) {
      setError(e.message || 'Erreur lors de la publication.');
      setPublishing(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 pb-8">
      <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-2 mb-4 cursor-pointer">
        <Video size={32} className="text-brand-500" />
        <p className="text-sm text-center text-gray-500">
          {videoFile ? videoFile.name : 'Choisir une photo ou une video depuis votre telephone'}
        </p>
        <span className="text-xs bg-brand-500 text-white px-4 py-2 rounded-full">Choisir un fichier</span>
        <input
          type="file"
          accept="video/*,image/*"
          className="hidden"
          onChange={e => setVideoFile(e.target.files?.[0] || null)}
        />
      </label>

      <label className="border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex items-center gap-2 mb-3 cursor-pointer">
        <span className="text-sm text-gray-500">
          {coverFile ? coverFile.name : 'Image de couverture (optionnel)'}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => setCoverFile(e.target.files?.[0] || null)}
        />
      </label>

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Decrivez votre publication..."
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 text-sm mb-3"
        rows={3}
      />
      <input
        value={hashtags}
        onChange={e => setHashtags(e.target.value)}
        placeholder="#hashtags separes par des espaces"
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 text-sm mb-3"
      />
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 mb-5">
        <Music size={18} className="text-gray-400" />
        <input
          value={music}
          onChange={e => setMusic(e.target.value)}
          placeholder="Musique / son (optionnel)"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <button
        onClick={handlePublish}
        disabled={publishing}
        className="w-full bg-brand-500 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-sm shadow-brand-500/20 disabled:opacity-60"
      >
        <Send size={18} /> {publishing ? 'Publication...' : 'Publier'}
      </button>
    </div>
  );
}
