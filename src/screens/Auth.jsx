import React, { useState } from 'react';
import { T } from '../theme';

export default function Auth({ login }) {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="scrn" style={{ padding: '56px 26px 30px', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: T.accGrad, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: '0 16px 34px rgba(124,58,237,.4)' }}>🤝</div>
        <div style={{ fontSize: 24, fontWeight: 600, marginTop: 18 }}>Вход в Pair Decisions</div>
        <div style={{ fontSize: 14, color: T.textSecondary, marginTop: 6 }}>Продолжите через Telegram</div>
      </div>

      <button
        className="pbtn"
        onClick={login}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: T.tgBlue, boxShadow: '0 12px 28px rgba(30,150,200,.4)' }}
      >
        ✈️ Войти через Telegram
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.1)' }} />
        <span style={{ fontSize: 12, color: T.textMuted }}>или по телефону</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.1)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input className="fld" placeholder="+7 900 000-00-00" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="fld" placeholder="Пароль" type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <button className="obtn" onClick={login}>Войти</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: T.textSecondary }}>
        🔒 Быстрый вход по Face ID / отпечатку
      </div>
    </div>
  );
}
