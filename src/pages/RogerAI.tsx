import React, { useState } from 'react';
import { Bot, Send, Sparkles, FileText, Hash, MessageSquareText, TrendingUp } from 'lucide-react';

interface ChatEntry { role: 'user' | 'ai'; text: string; }

const suggestions = [
  { icon: Sparkles, label: 'Idées de contenu' },
  { icon: FileText, label: 'Script vidéo' },
  { icon: Hash, label: 'Hashtags tendance' },
  { icon: MessageSquareText, label: 'Réponse client' },
  { icon: TrendingUp, label: 'Analyser mes stats' }
];

function mockAIReply(prompt: string): string {
  if (/hashtag/i.test(prompt)) return 'Voici des hashtags suggérés : #abidjan #madeinci #tendance #wax #rogsocial';
  if (/script/i.test(prompt)) return 'Script proposé : 1) Accroche 3s 2) Présentation produit 3) Preuve sociale 4) Appel à l\'action "Commander maintenant"';
  if (/client/i.test(prompt)) return 'Réponse suggérée : "Merci pour votre message ! Le produit est disponible, souhaitez-vous que je prenne votre commande ?"';
  if (/stat/i.test(prompt)) return 'Vos vidéos avec produit associé génèrent 2,3x plus d\'engagement que les autres cette semaine.';
  return 'Idée de contenu : montrez les coulisses de votre boutique avec un focus sur un produit phare, en 15-20 secondes.';
}

export default function RogerAI() {
  const [messages, setMessages] = useState<ChatEntry[]>([
    { role: 'ai', text: 'Bonjour 👋 Je suis Roger AI. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'ai', text: mockAIReply(text) }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-64px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
            {m.role === 'ai' && <Bot size={20} className="text-brand-500 mt-1" />}
            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[75%] ${m.role === 'user' ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-2">
        {suggestions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => send(label)}
            className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full whitespace-nowrap"
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-800">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Demandez quelque chose à Roger AI..."
          className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
        />
        <button onClick={() => send(input)}><Send size={20} className="text-brand-500" /></button>
      </div>
    </div>
  );
}
