import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, X, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeedVideo, FeedComment, getComments, addComment } from '../lib/api';

export default function VideoCard({ video }: { video: FeedVideo }) {
  const { likedVideos, toggleLike, favoritedVideos, toggleFavorite, followedUsers, toggleFollow, setViewingProfileId, user } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount);
  const [commentCount, setCommentCount] = useState(video.commentsCount);

  const liked = likedVideos.has(video.id);
  const favorited = favoritedVideos.has(video.id);
  const following = followedUsers.has(video.userId);
  const isOwnVideo = video.userId === user.id;

  const handleLike = () => {
    setLikeCount(c => c + (liked ? -1 : 1));
    toggleLike(video.id);
  };

  const openComments = async () => {
    setShowComments(true);
    setLoadingComments(true);
    const data = await getComments(video.id);
    setComments(data);
    setLoadingComments(false);
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    const text = commentText;
    setCommentText('');
    setComments(prev => [...prev, { id: 'tmp' + Date.now(), userId: user.id, username: user.username, avatar: user.avatar, text, createdAt: new Date().toISOString() }]);
    setCommentCount(c => c + 1);
    await addComment(video.id, user.id, text);
  };

  return (
    <div className="relative w-full h-full snap-start bg-black flex items-center justify-center overflow-hidden">
      {video.videoUrl ? (
        <video
          src={video.videoUrl}
          poster={video.coverUrl || undefined}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img src={video.coverUrl || 'https://picsum.photos/seed/rogsocial/400/700'} alt="" className="w-full h-full object-cover opacity-80" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

      <div className="absolute bottom-6 left-4 right-20 text-white">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => setViewingProfileId(video.userId)}>
            <img src={video.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
          </button>
          <span className="font-semibold">@{video.username}</span>
          {!following && !isOwnVideo && (
            <button
              onClick={() => toggleFollow(video.userId)}
              className="ml-2 text-xs bg-brand-500 px-2 py-1 rounded-full font-semibold"
            >
              Suivre
            </button>
          )}
        </div>
        <p className="text-sm">{video.description}</p>
        {video.music && <p className="text-xs mt-1 opacity-80">{video.music}</p>}
      </div>

      <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5 text-white">
        <button onClick={handleLike} className="flex flex-col items-center">
          <Heart size={28} fill={liked ? '#ff2d55' : 'none'} color={liked ? '#ff2d55' : 'white'} />
          <span className="text-xs mt-1">{likeCount}</span>
        </button>
        <button onClick={openComments} className="flex flex-col items-center">
          <MessageCircle size={26} />
          <span className="text-xs mt-1">{commentCount}</span>
        </button>
        <button className="flex flex-col items-center opacity-60">
          <Share2 size={26} />
          <span className="text-xs mt-1">0</span>
        </button>
        <button onClick={() => toggleFavorite(video.id)} className="flex flex-col items-center">
          <Bookmark size={26} fill={favorited ? 'white' : 'none'} />
        </button>
      </div>

      {showComments && (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-white dark:bg-gray-900 rounded-t-2xl p-4 z-10 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-black dark:text-white">Commentaires ({commentCount})</h3>
            <button onClick={() => setShowComments(false)}><X size={20} className="text-black dark:text-white" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {loadingComments && <p className="text-sm text-gray-500">Chargement...</p>}
            {!loadingComments && comments.length === 0 && <p className="text-sm text-gray-500">Aucun commentaire pour l'instant.</p>}
            {comments.map(c => (
              <div key={c.id} className="flex gap-2">
                <img src={c.avatar} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-black dark:text-white">@{c.username}</p>
                  <p className="text-sm text-black dark:text-white">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendComment()}
              placeholder="Ajouter un commentaire..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none text-black dark:text-white"
            />
            <button onClick={handleSendComment}><Send size={20} className="text-brand-500" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
