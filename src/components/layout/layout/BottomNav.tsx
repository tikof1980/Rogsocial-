import React from 'react';
import { Home, Compass, PlusSquare, Radio, MessageCircle, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabKey } from '../../types';

const items: { key: TabKey; icon: React.ElementType; label: string }[] = [
  { key: 'feed', icon: Home, label: 'Accueil' },
  { key: 'discover', icon: Compass, label: 'Découvrir' },
  { key: 'create', icon: PlusSquare, label: '' },
  { key: 'live', icon: Radio, label: 'LIVE' },
  { key: 'messages', icon: MessageCircle, label: 'Messages' },
  { key: 'profile', icon: User, label: 'Profil' }
];

export default function BottomNav() {
  const { tab, setTab } = useApp();
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex items-center justify-around bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-2 z-30">
      {items.map(({ key, icon: Icon, label }) => {
        const active = tab === key;
        const isCreate = key === 'create';
        return (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex flex-col items-center gap-0.5 flex-1"
          >
            {isCreate ? (
              <div className="bg-brand-500 rounded-lg p-1.5">
                <Icon size={22} className="text-white" />
              </div>
            ) : (
              <Icon size={22} className={active ? 'text-brand-500' : 'text-gray-500 dark:text-gray-400'} />
            )}
            {label && (
              <span className={`text-[10px] ${active ? 'text-brand-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                {label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
