import React from 'react';
import { T } from '../theme';

const CONFETTI = [
  { left: '12%', w: 9, h: 9, r: 2, bg: T.like, dur: '2.6s', delay: '0s' },
  { left: '26%', w: 8, h: 13, r: 2, bg: T.discuss, dur: '3.1s', delay: '.3s' },
  { left: '42%', w: 10, h: 10, r: '50%', bg: T.acc2, dur: '2.4s', delay: '.6s' },
  { left: '56%', w: 8, h: 11, r: 2, bg: T.nope, dur: '2.9s', delay: '.15s' },
  { left: '70%', w: 9, h: 9, r: '50%', bg: T.like, dur: '3.3s', delay: '.5s' },
  { left: '83%', w: 8, h: 13, r: 2, bg: T.acc2, dur: '2.5s', delay: '.8s' },
  { left: '91%', w: 9, h: 9, r: 2, bg: T.discuss, dur: '3s', delay: '1s' },
];

export default function MatchOverlay({ match, matchToResults, matchContinue }) {
  if (!match) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      background: 'radial-gradient(120% 80% at 50% 30%,#3a1d6e 0%,#0d0d1c 62%)',
      animation: 'matchIn .3s ease',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '70px 24px 30px', textAlign: 'center', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {CONFETTI.map((c, i) => (
          <span key={i} style={{
            position: 'absolute', left: c.left, top: 0,
            width: c.w, height: c.h, borderRadius: c.r, background: c.bg,
            animation: `fall ${c.dur} ${c.delay} linear infinite`,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#c9a4f5' }}>Совпадение мнений</div>
        <div style={{ fontSize: 48, fontWeight: 600, marginTop: 6, animation: 'pop .5s ease both' }}>Мэтч! 🎉</div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg,#f472b6,${T.acc2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '2px solid #0d0d1c' }}>🙋‍♀️</div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: T.acc2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, margin: '0 -9px', zIndex: 2, border: '2px solid #0d0d1c' }}>♥</div>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg,#38bdf8,${T.acc1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '2px solid #0d0d1c' }}>🙋‍♂️</div>
        </div>

        <div style={{ fontSize: 14, color: T.textSecondary, marginTop: 16 }}>Вы оба выбрали</div>

        <div style={{ marginTop: 14, width: 250, background: T.card, border: `1px solid ${T.cardBorderStrong}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 18px 40px rgba(109,40,217,.4)', animation: 'pop .5s .1s ease both' }}>
          <div style={{ height: 130, background: T.accGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 62 }}>{match.emoji}</div>
          <div style={{ padding: '14px 16px', textAlign: 'left' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{match.title}</div>
            <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 3 }}>2 из 2 голосов ♥</div>
          </div>
        </div>

        <button className="pbtn" onClick={matchToResults} style={{ marginTop: 22, width: 250 }}>Смотреть результаты</button>
        <button className="obtn" onClick={matchContinue} style={{ marginTop: 10, width: 250 }}>Продолжить голосование</button>
      </div>
    </div>
  );
}
