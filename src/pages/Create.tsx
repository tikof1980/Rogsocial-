import React, { useState } from 'react';
import { Video, Image, Music, ShoppingBag, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';

export default function Create() {
  const { setTab } = useApp();
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [music, setMusic] = useState('');
  const [productId, setProductId] = useState('');
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setDescription(''); setHashtags(''); setMusic(''); setProductId('');
      setTab('feed');
    }, 1200);
  };

  return (
    <div className="p-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center gap-2 mb-4">
        <Video size={32} className="text-brand-500" />
        <p className="text-sm text-center text-gray-500">Sélectionner une vidéo depuis votre téléphone (simulation)</p>
        <button className="text-xs bg-brand-500 text-white px-4 py-2 rounded-full">Choisir un fichier</button>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex items-center gap-2 mb-3">
        <Image size={18} className="text-gray-400" />
        <span className="text-sm text-gray-500">Image de couverture (simulation)</span>
      </div>

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Décrivez votre vidéo..."
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm mb-3"
        rows={3}
      />
      <input
        value={hashtags}
        onChange={e => setHashtags(e.target.value)}
        placeholder="#hashtags séparés par des espaces"
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm mb-3"
      />
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mb-3">
        <Music size={18} className="text-gray-400" />
        <input
          value={music}
          onChange={e => setMusic(e.target.value)}
          placeholder="Musique / son"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mb-5">
        <ShoppingBag size={18} className="text-gray-400" />
        <select value={productId} onChange={e => setProductId(e.target.value)} className="bg-transparent outline-none text-sm w-full">
          <option value="">Associer un produit (optionnel)</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <button
        onClick={handlePublish}
        className="w-full bg-brand-500 text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2"
      >
        <Send size={18} /> {published ? 'Publication...' : 'Publier'}
      </button>
    </div>
  );
}
