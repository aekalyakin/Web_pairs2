import React, { useState } from 'react';
import { T, CATS } from '../theme';
import BottomNav from '../components/BottomNav';

export default function Home({ goCreate, goCode, goProfile, startVote, goResults }) {
  const [cat, setCat] = useState(0);

  return (
    <div className="scrn" style={{ padding: '22px 20px 96px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: 15, background: `linear-gradient(135deg,#f472b6,${T.acc2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 600 }}>А</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>Привет, Аня 👋</div>
            <div style={{ fontSize: 12, color: T.textSecondary }}>3 активных опроса</div>
          </div>
        </div>
        <button onClick={goProfile} style={{ width: 40, height: 40, borderRadius: 13, background: 'rgba(255,255,255,.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, cursor: 'pointer' }}>⚙️</button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <button className="pbtn" onClick={goCreate} style={{ flex: 1.5, padding: 15 }}>＋ Создать</button>
        <button className="obtn" onClick={goCode} style={{ flex: 1, padding: 15 }}>＃ По коду</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {CATS.map((c, i) => (
          <button key={c.label} className="chip" onClick={() => setCat(i)} style={{ background: i === cat ? T.accGrad : 'rgba(255,255,255,.07)', color: i === cat ? '#fff' : T.textSecondary }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 14, color: T.textSecondary, fontWeight: 500, marginTop: 22 }}>Активные опросы</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>

        <button onClick={startVote} style={{ textAlign: 'left', background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 15, fontFamily: 'inherit', color: 'inherit', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>🎬 Куда пойдём в пятницу?</div>
            <div style={{ fontSize: 12, color: T.acc2, fontWeight: 600 }}>2/5</div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', marginTop: 12, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: `linear-gradient(90deg,${T.acc1},${T.acc2})` }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f472b6', border: `2px solid ${T.card}` }} />
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#38bdf8', border: `2px solid ${T.card}`, marginLeft: -8 }} />
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,.12)', border: `2px solid ${T.card}`, marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: T.textSecondary }}>+3</div>
            </div>
            <div style={{ fontSize: 12, color: T.acc2, fontWeight: 500 }}>Голосовать →</div>
          </div>
        </button>

        <button onClick={goResults} style={{ textAlign: 'left', background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 15, fontFamily: 'inherit', color: 'inherit', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>🎬 Что смотрим вечером?</div>
            <div style={{ fontSize: 12, color: T.like, fontWeight: 600 }}>2/2 ✓</div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', marginTop: 12, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: T.likeGrad }} />
          </div>
          <div style={{ fontSize: 12, color: T.like, marginTop: 11, fontWeight: 500 }}>Готово · есть мэтч 🎉 · Смотреть →</div>
        </button>

        <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 15 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>🗺️ Куда на выходные?</div>
            <div style={{ fontSize: 12, color: T.acc2, fontWeight: 600 }}>4/7</div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', marginTop: 12, overflow: 'hidden' }}>
            <div style={{ width: '57%', height: '100%', background: `linear-gradient(90deg,${T.acc1},${T.acc2})` }} />
          </div>
        </div>
      </div>

      <BottomNav active="home" onHome={() => {}} onCreate={goCreate} onProfile={goProfile} />
    </div>
  );
}
