import React from 'react';
import { useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Auth from './pages/Auth';
import AppShell from './AppShell';

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center bg-black text-white md:max-w-lg md:mx-auto">
        Chargement...
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
