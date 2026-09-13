import React, { useState } from 'react';
import { Send, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { conversations } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Messages() {
  const { user } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const active = conversations.find(c => c.id === activeId);

  if (active) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800">
          <button onClick={() => setActiveId(null)}><ChevronLeft size={20} /></button>
          <img src={active.avatar} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-sm">{active.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {active.messages.map(m => (
            <div key={m.id} className={`flex ${m.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] ${m.senderId === user.id ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-800">
          <button><ImageIcon size={20} className="text-gray-400" /></button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Écrire un message..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button onClick={() => setText('')}><Send size={20} className="text-brand-500" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map(c => (
        <button key={c.id} onClick={() => setActiveId(c.id)} className="flex items-center gap-3 w-full p-4 border-b border-gray-100 dark:border-gray-900 active:bg-gray-50 dark:active:bg-gray-900/50">
          <img src={c.avatar} className="w-12 h-12 rounded-full" />
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm">{c.name} {c.isGroup && '👥'}</p>
            <p className="text-xs text-gray-500 truncate">{c.messages[c.messages.length - 1]?.text}</p>
          </div>
          <span className="text-xs text-gray-400">{c.messages[c.messages.length - 1]?.time}</span>
        </button>
      ))}
    </div>
  );
}
