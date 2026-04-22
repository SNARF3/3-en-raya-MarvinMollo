
import { useState } from 'react';
import GameBoard from './components/GameBoard';
import TestResults from './components/testResults';

export default function App() {
  const [tab, setTab] = useState('game');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, marginTop: '2rem', marginBottom: '0.5rem',
        background: '#16161a', borderRadius: 8, padding: 4,
        border: '1px solid #2a2a35',
      }}>
        {[
          { key: 'game', label: '🎮  Juego' },
          { key: 'tests', label: '🧪  Tests' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            background: tab === t.key ? '#2E75B6' : 'transparent',
            color: tab === t.key ? '#fff' : '#555',
            border: 'none', borderRadius: 6,
            padding: '0.45rem 1.3rem', cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.78rem', letterSpacing: 1, transition: 'all 0.15s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'game' && <GameBoard />}
      {tab === 'tests' && <TestResults />}
    </div>
  );
}