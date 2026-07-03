import React from 'react';
import { T } from '../theme';

const clamp = (v) => Math.max(0, Math.min(1, v));

export default function Voting({ idx, cards, drag, flying, onDown, onMove, onUp, voteLike, voteNope, voteDiscuss, undo, goHome }) {
  const top = cards[idx];
  const next = cards[idx + 1];
  const next2 = cards[idx + 2];

  let tx = drag.x, ty = drag.y;
  const isFlying = !!flying;
  if (flying) { tx = flying.x; ty = flying.y; }
  const rot = tx / 18;
  const trans = isFlying ? 'transform .27s ease' : (drag.on ? 'none' : 'transform .3s cubic-bezier(.2,.8,.3,1)');

  const topStyle = {
    position: 'absolute', left: '50%', top: 0, width: 280, height: '100%',
    transform: `translateX(-50%) translate(${tx}px,${ty}px) rotate(${rot}deg)`,
    transition: trans, touchAction: 'none', cursor: 'grab', userSelect: 'none',
  };

  const likeOp = clamp(tx / 90);
  const nopeOp = clamp(-tx / 90);
  const discussOp = clamp(-ty / 90);

  const dots = cards.map((_, i) => ({
    color: i < idx ? T.like : (i === idx ? T.acc2 : 'rgba(255,255,255,.15)'),
  }));

  if (!top) return null;

  return (
    <div className="scrn" style={{ padding: '20px 18px 24px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={goHome} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer' }}>✕</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '.08em', color: T.textSecondary, textTransform: 'uppercase' }}>🎬 Досуг</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Куда пойдём в пятницу?</div>
        </div>
        <button onClick={undo} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 15, cursor: 'pointer' }}>↩</button>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
        {dots.map((d, i) => <span key={i} style={{ width: 20, height: 4, borderRadius: 2, background: d.color }} />)}
      </div>

      <div style={{ flex: 1, position: 'relative', marginTop: 16, minHeight: 0 }}>
        {next2 && (
          <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%) scale(.88)', width: 280, height: 'calc(100% - 12px)', background: '#141428', borderRadius: 24 }} />
        )}
        {next && (
          <div style={{ position: 'absolute', left: '50%', top: 3, transform: 'translateX(-50%) scale(.94)', width: 280, height: 'calc(100% - 6px)', background: '#17172c', border: `1px solid ${T.cardBorder}`, borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ height: '62%', background: `linear-gradient(135deg,#5b21b6,${T.acc1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, opacity: .85 }}>{next.emoji}</div>
          </div>
        )}

        <div
          style={topStyle}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        >
          <div style={{ width: '100%', height: '100%', background: T.card, border: `1px solid ${T.cardBorderStrong}`, borderRadius: 24, overflow: 'hidden', boxShadow: T.shadowCard, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '62%', background: T.accGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100, position: 'relative', flex: 'none' }}>
              {top.emoji}
              {top.source && (
                <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(6px)', padding: '6px 11px', borderRadius: 999, fontSize: 12, fontWeight: 500 }}>📍 {top.source}</div>
              )}
              <div style={{ position: 'absolute', top: 20, right: 16, transform: 'rotate(11deg)', border: `4px solid ${T.like}`, color: T.like, padding: '4px 13px', borderRadius: 11, fontWeight: 700, fontSize: 24, letterSpacing: .5, opacity: likeOp }}>НРАВИТСЯ</div>
              <div style={{ position: 'absolute', top: 20, left: 16, transform: 'rotate(-11deg)', border: `4px solid ${T.nope}`, color: T.nope, padding: '4px 13px', borderRadius: 11, fontWeight: 700, fontSize: 24, letterSpacing: .5, opacity: nopeOp }}>NOPE</div>
              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%) rotate(-4deg)', border: `4px solid ${T.discuss}`, color: T.discuss, padding: '4px 13px', borderRadius: 11, fontWeight: 700, fontSize: 22, letterSpacing: .5, opacity: discussOp }}>ОБСУДИМ</div>
            </div>
            <div style={{ padding: '16px 18px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{top.title}</div>
                {top.dist && <div style={{ fontSize: 13, color: T.textSecondary }}>{top.dist}</div>}
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 5, lineHeight: 1.4 }}>{top.desc}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 13, flexWrap: 'wrap' }}>
                {top.tags.map(t => <span key={t} className="chip" style={{ background: 'rgba(168,85,247,.16)', color: '#c9a4f5', cursor: 'default' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 20 }}>
        <button className="abtn" onClick={undo} style={{ width: 46, height: 46, background: 'rgba(255,255,255,.06)', color: T.textSecondary, fontSize: 18 }}>↩</button>
        <button className="abtn" onClick={voteNope} style={{ width: 60, height: 60, background: 'rgba(248,113,113,.12)', color: T.nope, border: '1.5px solid rgba(248,113,113,.4)' }}>✕</button>
        <button className="abtn" onClick={voteDiscuss} style={{ width: 54, height: 54, background: 'rgba(251,191,36,.12)', color: T.discuss, border: '1.5px solid rgba(251,191,36,.4)', fontSize: 20 }}>💬</button>
        <button className="abtn" onClick={voteLike} style={{ width: 68, height: 68, background: T.likeGrad, color: '#06210f', fontSize: 28, boxShadow: T.shadowLike }}>♥</button>
      </div>
    </div>
  );
}
