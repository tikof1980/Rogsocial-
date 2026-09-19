import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { signIn, signUp, authError } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfo(null);
    setSubmitting(true);
    if (mode === 'login') {
      await signIn(email, password);
    } else {
      const ok = await signUp(email, password, username);
      if (ok) {
        setInfo('Compte cree. Verifiez votre email si la confirmation est requise, puis connectez-vous.');
        setMode('login');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-black text-white px-6 md:max-w-lg md:mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-brand-500">RogSocial</h1>
      <p className="text-sm text-gray-400 mb-8">
        {mode === 'login' ? 'Connectez-vous a votre compte' : 'Creez votre compte'}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        {mode === 'signup' && (
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            required
            className="w-full bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none border border-gray-800"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none border border-gray-800"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          minLength={6}
          className="w-full bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none border border-gray-800"
        />

        {authError && <p className="text-red-500 text-xs">{authError}</p>}
        {info && <p className="text-green-500 text-xs">{info}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-500 text-white rounded-xl py-3 font-semibold disabled:opacity-60"
        >
          {submitting ? 'Patientez...' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="text-sm text-gray-400 mt-6"
      >
        {mode === 'login' ? "Pas de compte ? S'inscrire" : 'Deja un compte ? Se connecter'}
      </button>
    </div>
  );
}
