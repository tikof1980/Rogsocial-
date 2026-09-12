import React from 'react';
import { Moon, Sun, Bot, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const titles: Record<string, string> = {
  discover: 'Découvrir',
  create: 'Publier',
  messages: 'Messages',
  profile: 'Profil',
  roger: 'Roger AI',
  dashboard: 'Tableau de bord',
  marketplace: 'Marketplace'
};

export default function TopBar() {
  const { tab, theme, toggleTheme, setTab } = useApp();
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-black/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <h1 className="font-bold text-lg">{titles[tab] || 'RogSocial'}</h1>
      <div className="flex items-center gap-3">
        {tab !== 'roger' && (
          <button onClick={() => setTab('roger')} aria-label="Roger AI">
            <Bot size={20} className="text-brand-500" />
          </button>
        )}
        <button onClick={() => setTab('discover')} aria-label="Rechercher">
          <Search size={20} />
        </button>
        <button onClick={toggleTheme} aria-label="Changer de thème">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
