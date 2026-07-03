import React from 'react';
import { T } from '../theme';

export default function Pricing({ billing, setBilling, goProfile }) {
  const yr = billing === 'year';
  const pairPrice = yr ? '2 490 ₽/год' : '249 ₽/мес';
  const groupPrice = yr ? '5 990 ₽/год' : '599 ₽/мес';

  const seg = (active) => ({
    padding: '9px 20px', borderRadius: 999, border: 'none',
    fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    background: active ? '#fff' : 'transparent',
    color: active ? '#0d0d1c' : T.textSecondary,
  });

  return (
    <div className="scrn" style={{ padding: '22px 20px 30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={goProfile} style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.07)', border: 'none', color: '#fff', fontSize: 17, cursor: 'pointer' }}>‹</button>
        <div style={{ fontSize: 17, fontWeight: 600 }}>Тарифы</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,.06)', borderRadius: 999, padding: 4 }}>
          <button onClick={() => setBilling('month')} style={seg(!yr)}>Месяц</button>
          <button onClick={() => setBilling('year')} style={seg(yr)}>Год · −40%</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
        <div style={{ background: T.card, border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>🌱 Бесплатно</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>0 ₽</div>
          </div>
          <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 8, lineHeight: 1.6 }}>3 опроса · 2 участника · 2 категории · история 7 дней</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,.28),rgba(168,85,247,.14))', border: `1.5px solid ${T.acc2}`, borderRadius: 20, padding: 18, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -10, right: 16, background: T.accGrad, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>Популярный</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>❤️ Пара</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{pairPrice}</div>
          </div>
          <div style={{ fontSize: 13, color: '#c9a4f5', marginTop: 8, lineHeight: 1.6 }}>∞ опросов · все 6 категорий · интеграции · история 6 мес</div>
          <button className="pbtn" style={{ marginTop: 14 }}>Выбрать</button>
        </div>

        <div style={{ background: T.card, border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>👥 Группа</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{groupPrice}</div>
          </div>
          <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 8, lineHeight: 1.6 }}>∞ опросов · до 20 участников · всё из «Пары» · история навсегда</div>
          <button className="obtn" style={{ marginTop: 14 }}>Выбрать</button>
        </div>
      </div>
    </div>
  );
}
