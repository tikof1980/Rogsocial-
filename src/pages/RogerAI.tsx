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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
            {m.role === 'ai' && <Bot size={20} className="text-brand-500 mt-1 flex-shrink-0" />}
            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[75%] ${m.role === 'user' ? 'bg-brand-500 text-whit
