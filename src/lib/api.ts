import { supabase } from './supabase';

export interface FeedVideo {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  videoUrl: string | null;
  coverUrl: string | null;
  description: string;
  hashtags: string[];
  music: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface FeedComment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface RemoteProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  videosCount: number;
}

function mapVideoRow(v: any): FeedVideo {
  const p = v.profiles || {};
  return {
    id: v.id,
    userId: v.user_id,
    username: p.username || 'utilisateur',
    displayName: p.display_name || p.username || 'Utilisateur',
    avatar: p.avatar_url || 'https://i.pravatar.cc/150?img=12',
    videoUrl: v.video_url,
    coverUrl: v.cover_url,
    description: v.description || '',
    hashtags: v.hashtags || [],
    music: v.music,
    likesCount: 0,
    commentsCount: 0,
    createdAt: v.created_at
  };
}

async function attachStats(videos: FeedVideo[]): Promise<FeedVideo[]> {
  const ids = videos.map(v => v.id);
  if (ids.length === 0) return videos;
  const { data } = await supabase.from('video_stats').select('video_id, likes_count, comments_count').in('video_id', ids);
  const map = new Map((data || []).map((s: any) => [s.video_id, s]));
  return videos.map(v => {
    const s = map.get(v.id);
    return { ...v, likesCount: s?.likes_count || 0, commentsCount: s?.comments_count || 0 };
  });
}

export async function getFeedVideos(): Promise<FeedVideo[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('id, user_id, video_url, cover_url, description, hashtags, music, created_at, profiles ( username, display_name, avatar_url )')
    .order('created_at', { ascending: false })
    .limit(30);
  if (error || !data) return [];
  return attachStats(data.map(mapVideoRow));
}

export async function getUserVideos(userId: string): Promise<FeedVideo[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('id, user_id, video_url, cover_url, description, hashtags, music, created_at, profiles ( username, display_name, avatar_url )')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return attachStats(data.map(mapVideoRow));
}

export async function searchVideosByHashtag(query: string): Promise<FeedVideo[]> {
  const clean = query.replace('#', '').trim();
  if (!clean) return [];
  const { data, error } = await supabase
    .from('videos')
    .select('id, user_id, video_url, cover_url, description, hashtags, music, created_at, profiles ( username, display_name, avatar_url )')
    .contains('hashtags', [clean])
    .limit(30);
  if (error || !data) return [];
  return attachStats(data.map(mapVideoRow));
}

export async function searchProfiles(query: string): Promise<RemoteProfile[]> {
  if (!query.trim()) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, bio')
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .limit(20);
  if (error || !data) return [];
  return data.map((p: any) => ({
    id: p.id,
    username: p.username,
    displayName: p.display_name || p.username,
    avatar: p.avatar_url || 'https://i.pravatar.cc/150?img=12',
    bio: p.bio || '',
    followersCount: 0,
    followingCount: 0,
    videosCount: 0
  }));
}

export async function getProfile(userId: string): Promise<RemoteProfile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error || !data) return null;
  const { data: stats } = await supabase.from('profile_stats').select('*').eq('profile_id', userId).maybeSingle();
  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name || data.username,
    avatar: data.avatar_url || 'https://i.pravatar.cc/150?img=12',
    bio: data.bio || '',
    followersCount: stats?.followers_count || 0,
    followingCount: stats?.following_count || 0,
    videosCount: stats?.videos_count || 0
  };
}

export async function getComments(videoId: string): Promise<FeedComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, user_id, text, created_at, profiles ( username, avatar_url )')
    .eq('video_id', videoId)
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return data.map((c: any) => ({
    id: c.id,
    userId: c.user_id,
    username: c.profiles?.username || 'utilisateur',
    avatar: c.profiles?.avatar_url || 'https://i.pravatar.cc/150?img=12',
    text: c.text,
    createdAt: c.created_at
  }));
}

export async function addComment(videoId: string, userId: string, text: string) {
  return supabase.from('comments').insert({ video_id: videoId, user_id: userId, text });
}

export async function uploadMedia(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

export async function createVideo(params: {
  userId: string;
  videoUrl: string;
  coverUrl: string | null;
  description: string;
  hashtags: string[];
  music: string;
}) {
  return supabase.from('videos').insert({
    user_id: params.userId,
    video_url: params.videoUrl,
    cover_url: params.coverUrl,
    description: params.description,
    hashtags: params.hashtags,
    music: params.music || null
  });
}
