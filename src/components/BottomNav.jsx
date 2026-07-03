import React from 'react';
import { T } from '../theme';

export default function BottomNav({ active, onHome, onCreate, onProfile }) {
  const item = (id, icon, label, onClick) => (
    <button className="navi" onClick={onClick} style={{ color: active === id ? T.acc2 : T.textSecondary }}>
      <span style={{ fontSize: 19 }}>{icon}</span><span>{label}</span>
    </button>
  );
  return (
    <div className="navb">
      {item('home', '🏠', 'Главная', onHome)}
      <button className="navi" onClick={onCreate} style={{ color: T.textSecondary }}>
        <span style={{
          width: 46, height: 46, borderRadius: 16, background: T.accGrad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, color: '#fff', marginTop: -16,
          boxShadow: '0 8px 20px rgba(124,58,237,.45)',
        }}>＋</span>
      </button>
      {item('profile', '👤', 'Профиль', onProfile)}
    </div>
  );
}
