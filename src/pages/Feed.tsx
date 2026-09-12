import React from 'react';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/mockData';

export default function Feed() {
  return (
    <div className="h-screen overflow-y-scroll snap-y-mandatory">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
