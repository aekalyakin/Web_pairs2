import React from 'react';
import { T } from '../theme';

export default function Onboarding({ obStep, obNext, skip }) {
  return (
    <div className="scrn" style={{ padding: '20px 24px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={skip} style={{ background: 'none', border: 'none', color: T.textSecondary, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Пропустить</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 0 }}>
        {obStep === 0 && (
          <>
            <div style={{ width: 150, height: 150, borderRadius: 44, background: T.accGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 66, boxShadow: '0 24px 50px rgba(124,58,237,.45)', animation: 'float 6s ease-in-out infinite' }}>🤝</div>
            <div style={{ fontSize: 27, fontWeight: 600, marginTop: 32 }}>Pair Decisions</div>
            <div style={{ fontSize: 16, color: T.acc2, fontWeight: 500, marginTop: 6 }}>Договаривайтесь вместе</div>
            <div style={{ fontSize: 14, color: T.textSecondary, marginTop: 16, lineHeight: 1.5, maxWidth: 280 }}>Куда пойти, что посмотреть, что купить — решайте вдвоём или компанией, без споров.</div>
          </>
        )}

        {obStep === 1 && (
          <>
            <div style={{ position: 'relative', height: 250, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: 160, height: 190, borderRadius: 24, background: T.card, border: `1px solid ${T.cardBorder}`, boxShadow: '0 22px 44px rgba(0,0,0,.5)', animation: 'float 6s ease-in-out infinite', overflow: 'hidden' }}>
                <div style={{ height: 120, background: T.accGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>🍿</div>
                <div style={{ padding: '12px 13px', textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Комедия вечера</div>
                  <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 3 }}>Кинопоиск</div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: 2, top: 118, background: 'rgba(248,113,113,.14)', border: '1px solid rgba(248,113,113,.4)', color: T.nope, padding: '7px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>✕ Нет</div>
              <div style={{ position: 'absolute', right: 2, top: 118, background: 'rgba(74,222,128,.14)', border: '1px solid rgba(74,222,128,.4)', color: T.like, padding: '7px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>♥ Да</div>
              <div style={{ position: 'absolute', top: 6, background: 'rgba(251,191,36,.14)', border: '1px solid rgba(251,191,36,.4)', color: T.discuss, padding: '7px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>💬 Обсудим</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>Три голоса, а не один</div>
            <div style={{ fontSize: 14, color: T.textSecondary, marginTop: 12, lineHeight: 1.5, maxWidth: 290 }}>Свайп вверх «Обсудим вместе» — для вариантов, о которых стоит поговорить. Никаких проигравших.</div>
          </>
        )}

        {obStep === 2 && (
          <>
            <div style={{ width: 150, height: 150, borderRadius: 44, background: 'linear-gradient(135deg,#4ade80,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 66, boxShadow: '0 24px 50px rgba(74,222,128,.35)', animation: 'float 6s ease-in-out infinite' }}>🎉</div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 32 }}>Момент мэтча</div>
            <div style={{ fontSize: 14, color: T.textSecondary, marginTop: 14, lineHeight: 1.5, maxWidth: 290 }}>Голоса анонимны до конца. Когда мнения совпадают — это маленький праздник, а не победа одного над другим.</div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '8px 0 22px' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: obStep === i ? 20 : 7, height: 7, borderRadius: 4, background: obStep === i ? T.acc2 : 'rgba(255,255,255,.2)', transition: 'all .25s' }} />
        ))}
      </div>
      <button className="pbtn" onClick={obNext}>{obStep >= 2 ? 'Начать' : 'Далее'}</button>
    </div>
  );
}
