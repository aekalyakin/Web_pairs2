import React, { useState } from 'react';
import { T, CATS } from '../theme';

export default function Create({ createStep, cNext, cBack, startVote }) {
  const [pickedCat, setPickedCat] = useState(-1);
  const csColor = (i) => (createStep >= i ? T.acc2 : 'rgba(255,255,255,.1)');

  return (
    <div className="scrn" style={{ padding: '22px 20px 30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={cBack} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 17, cursor: 'pointer' }}>‹</button>
        <div style={{ fontSize: 17, fontWeight: 600 }}>Новый опрос</div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
        {[0, 1, 2].map(i => <span key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: csColor(i) }} />)}
      </div>

      <div style={{ flex: 1, marginTop: 24 }}>
        {createStep === 0 && (
          <>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Кто готовит варианты?</div>
            <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 6 }}>Выберите сценарий опроса</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              <button onClick={cNext} style={{ textAlign: 'left', background: T.card, border: `1px solid ${T.cardBorderStrong}`, borderRadius: 18, padding: 18, fontFamily: 'inherit', color: 'inherit', cursor: 'pointer' }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>👤 Личный</div>
                <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 5, lineHeight: 1.4 }}>Вы готовите карточки, остальные голосуют</div>
              </button>
              <button onClick={cNext} style={{ textAlign: 'left', background: T.card, border: `1px solid ${T.cardBorderStrong}`, borderRadius: 18, padding: 18, fontFamily: 'inherit', color: 'inherit', cursor: 'pointer' }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>👥 Совместный</div>
                <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 5, lineHeight: 1.4 }}>Все накидывают варианты, потом все голосуют</div>
              </button>
            </div>
          </>
        )}

        {createStep === 1 && (
          <>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Категория и название</div>
            <input className="fld" placeholder="Куда пойдём в пятницу?" style={{ marginTop: 18 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {CATS.map((c, i) => (
                <button key={c.label} className="chip" onClick={() => setPickedCat(i)} style={{ background: i === pickedCat ? T.accGrad : 'rgba(255,255,255,.07)', color: i === pickedCat ? '#fff' : T.textSecondary, padding: '9px 14px' }}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            <button className="pbtn" onClick={cNext} style={{ marginTop: 26 }}>Далее</button>
          </>
        )}

        {createStep === 2 && (
          <>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Пригласите участников</div>
            <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 6 }}>Отправьте код или ссылку</div>
            <div style={{ marginTop: 20, background: T.card, border: '1px dashed rgba(168,85,247,.4)', borderRadius: 18, padding: 22, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: T.textSecondary, letterSpacing: '.05em' }}>КОД СЕССИИ</div>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '.14em', marginTop: 8, background: T.accGrad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>PD-4X9K</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="chip" style={{ flex: 1, background: 'rgba(55,174,226,.16)', color: '#7cc6ee', padding: 12, justifyContent: 'center', display: 'flex' }}>✈️ Telegram</button>
              <button className="chip" style={{ flex: 1, background: 'rgba(37,211,102,.16)', color: '#7ee0a0', padding: 12, justifyContent: 'center', display: 'flex' }}>💬 WhatsApp</button>
              <button className="chip" style={{ flex: 1, background: 'rgba(255,255,255,.08)', color: '#c9c9dd', padding: 12, justifyContent: 'center', display: 'flex' }}>🔗 Ссылка</button>
            </div>
            <button className="pbtn" onClick={startVote} style={{ marginTop: 26 }}>Добавить варианты и начать</button>
          </>
        )}
      </div>
    </div>
  );
}
