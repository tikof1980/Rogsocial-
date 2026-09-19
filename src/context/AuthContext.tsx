import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  authError: string | null;
  signUp: (email: string, password: string, username: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<Profile, 'display_name' | 'bio' | 'avatar_url'>>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (!error && data) {
      setProfile(data as Profile);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        loadProfile(data.session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        loadProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    setAuthError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) {
      setAuthError(error.message);
      return false;
    }
    return true;
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      return false;
    }
    return true;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (session?.user) {
      await loadProfile(session.user.id);
    }
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'display_name' | 'bio' | 'avatar_url'>>) => {
    if (!session?.user) return false;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id);
    if (error) {
      setAuthError(error.message);
      return false;
    }
    await refreshProfile();
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ session, profile, loading, authError, signUp, signIn, signOut, refreshProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
