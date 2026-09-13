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
    <div className="flex-shrink-0 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-20">
      <h1 className="font-bold text-lg tracking-tight">{titles[tab] || 'RogSocial'}</h1>
      <div className="flex items-center gap-1">
        {tab !== 'roger' && (
          <button onClick={() => setTab('roger')} aria-label="Roger AI" className="p-2 rounded-full active:bg-gray-100 dark:active:bg-gray-900">
            <Bot size={19} className="text-brand-500" />
          </button>
        )}
        <button onClick={() => setTab('discover')} aria-label="Rechercher" className="p-2 rounded-full active:bg-gray-100 dark:active:bg-gray-900">
          <Search size={19} />
        </button>
        <button onClick={toggleTheme} aria-label="Changer de thème" className="p-2 rounded-full active:bg-gray-100 dark:active:bg-gray-900">
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>
    </div>
  );
}
