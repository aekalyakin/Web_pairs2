import React from 'react';
import { T } from '../theme';
import BottomNav from '../components/BottomNav';

const SETTINGS = [
  { label: '🔔 Уведомления', val: 'Вкл' },
  { label: '🌙 Тёмная тема', val: 'Всегда' },
  { label: '🔗 Мои интеграции', val: '2ГИС, WB' },
  { label: '❓ Помощь', val: '›' },
];

export default function Profile({ goHome, goCreate, goPricing, logout }) {
  return (
    <div className="scrn" style={{ padding: '24px 20px 96px' }}>
      <div style={{ fontSize: 20, fontWeight: 600 }}>Профиль</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: 20, background: `linear-gradient(135deg,#f472b6,${T.acc2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 600 }}>А</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Аня</div>
          <div style={{ fontSize: 13, color: T.textSecondary }}>@anya · тариф 🌱 Бесплатно</div>
        </div>
      </div>

      <div style={{ marginTop: 20, background: 'linear-gradient(135deg,rgba(124,58,237,.25),rgba(168,85,247,.12))', border: `1px solid ${T.cardBorderStrong}`, borderRadius: 20, padding: 18 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Откройте больше вместе ❤️</div>
        <div style={{ fontSize: 13, color: '#c9a4f5', marginTop: 5, lineHeight: 1.4 }}>Безлимит опросов, все категории и интеграции</div>
        <button className="pbtn" onClick={goPricing} style={{ marginTop: 14 }}>Смотреть тарифы</button>
      </div>

      <div style={{ marginTop: 20, background: T.card, border: '1px solid rgba(255,255,255,.06)', borderRadius: 18, overflow: 'hidden' }}>
        {SETTINGS.map((row, i) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 16px', borderBottom: i < SETTINGS.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
            <div style={{ fontSize: 14 }}>{row.label}</div>
            <div style={{ fontSize: 13, color: T.textSecondary }}>{row.val}</div>
          </div>
        ))}
      </div>

      <button className="obtn" onClick={logout} style={{ marginTop: 18, color: T.nope, borderColor: 'rgba(248,113,113,.3)' }}>Выйти</button>

      <BottomNav active="profile" onHome={goHome} onCreate={goCreate} onProfile={() => {}} />
    </div>
  );
}
