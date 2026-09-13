import React from 'react';
import { Home, Compass, PlusSquare, Radio, MessageCircle, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabKey } from '../../types';

const items: { key: TabKey; icon: React.ElementType; label: string }[] = [
  { key: 'feed', icon: Home, label: 'Accueil' },
  { key: 'discover', icon: Compass, label: 'Découvrir' },
  { key: 'create', icon: PlusSquare, label: 'Publier' },
  { key: 'live', icon: Radio, label: 'LIVE' },
  { key: 'messages', icon: MessageCircle, label: 'Messages' },
  { key: 'profile', icon: User, label: 'Profil' }
];

export default function BottomNav() {
  const { tab, setTab } = useApp();
  return (
    <nav className="flex-shrink-0 flex items-stretch justify-around bg-white/95 dark:bg-black/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-30">
      {items.map(({ key, icon: Icon, label }) => {
        const active = tab === key;
        const isCreate = key === 'create';
        return (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 relative"
          >
            {isCreate ? (
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl p-2 -mt-4 shadow-lg shadow-brand-500/30">
                <Icon size={20} className="text-white" />
              </div>
            ) : (
              <>
                <Icon size={21} strokeWidth={active ? 2.4 : 1.8} className={active ? 'text-brand-500' : 'text-gray-400 dark:text-gray-500'} />
                {active && <span className="absolute -top-1 w-1 h-1 rounded-full bg-brand-500" />}
              </>
            )}
            <span className={`text-[10px] leading-none ${active ? 'text-brand-500 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
              {isCreate ? '' : label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
