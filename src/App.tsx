import React from 'react';
import { useApp } from './context/AppContext';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import Feed from './pages/Feed';
import Discover from './pages/Discover';
import Create from './pages/Create';
import Live from './pages/Live';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import RogerAI from './pages/RogerAI';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';

export default function App() {
  const { tab, theme } = useApp();

  const renderPage = () => {
    switch (tab) {
      case 'feed': return <Feed />;
      case 'discover': return <Discover />;
      case 'create': return <Create />;
      case 'live': return <Live />;
      case 'messages': return <Messages />;
      case 'profile': return <Profile />;
      case 'roger': return <RogerAI />;
      case 'dashboard': return <Dashboard />;
      case 'marketplace': return <Marketplace />;
      default: return <Feed />;
    }
  };

  const showTopBar = tab !== 'feed' && tab !== 'live';
  const fullBleed = tab === 'feed' || tab === 'live';

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="h-[100dvh] w-full max-w-md mx-auto flex flex-col bg-white text-black dark:bg-black dark:text-white overflow-hidden relative">
        {showTopBar && <TopBar />}
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain ${fullBleed ? '' : 'pb-1'}`}>
          {renderPage()}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
