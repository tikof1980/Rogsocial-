import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { getFeedVideos, FeedVideo } from '../lib/api';

export default function Feed() {
  const [videos, setVideos] = useState<FeedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedVideos().then(v => {
      setVideos(v);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Chargement du feed...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 text-gray-400">
        <p className="text-sm">Aucune video pour l'instant.</p>
        <p className="text-xs mt-1">Soyez le premier a publier sur RogSocial.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-scroll snap-y-mandatory">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
