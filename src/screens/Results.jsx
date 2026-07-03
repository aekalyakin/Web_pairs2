import React from 'react';
import { T } from '../theme';
import BottomNav from '../components/BottomNav';

export default function Results({ goHome, goCreate, goProfile }) {
  return (
    <div className="scrn" style={{ padding: '22px 18px 96px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={goHome} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 15, cursor: 'pointer' }}>‹</button>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Результаты</div>
        <button style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 15, cursor: 'pointer' }}>↗</button>
      </div>

      <div style={{ background: T.card, border: `1px solid ${T.cardBorderStrong}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 16px 36px rgba(109,40,217,.3)', marginTop: 16 }}>
        <div style={{ height: 120, background: T.accGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative' }}>
          🍸
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(6px)', padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>🏆 Победитель</div>
        </div>
        <div style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Бар «Мендели»</div>
            <div style={{ fontSize: 13, color: T.like, marginTop: 3, fontWeight: 500 }}>5 из 5 голосов ♥</div>
          </div>
          <button style={{ padding: '10px 14px', border: 'none', borderRadius: 12, background: T.accGrad, color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>📍 2ГИС</button>
        </div>
      </div>

      <div style={{ marginTop: 16, background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.28)', borderRadius: 18, padding: 15 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.discuss }}>💬 Обсудим вместе</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 }}>
          <div style={{ fontSize: 14 }}>🎭 Театр «Практика»</div>
          <div style={{ fontSize: 12, color: T.textSecondary }}>3 голоса</div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.06)', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14 }}>🍜 Рамен-бар «Ку»</div>
          <div style={{ fontSize: 12, color: T.textSecondary }}>2 голоса</div>
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 14, color: T.textSecondary, fontWeight: 500 }}>Рейтинг вариантов</div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { name: 'Бар «Мендели»', label: '5♥', bars: [{ f: 5, c: T.like }] },
          { name: '🍜 Рамен-бар «Ку»', label: '2♥ 2💬 1✕', bars: [{ f: 2, c: T.like }, { f: 2, c: T.discuss }, { f: 1, c: T.nope }] },
          { name: '🏠 Остаёмся дома', label: '1♥ 1💬 3✕', bars: [{ f: 1, c: T.like }, { f: 1, c: T.discuss }, { f: 3, c: T.nope }] },
        ].map(row => (
          <div key={row.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
              <span>{row.name}</span><span style={{ color: T.textSecondary }}>{row.label}</span>
            </div>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
              {row.bars.map((b, i) => <div key={i} style={{ flex: b.f, background: b.c }} />)}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="results" onHome={goHome} onCreate={goCreate} onProfile={goProfile} />
    </div>
  );
}
