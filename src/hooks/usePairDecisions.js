import { useState, useRef, useCallback, useEffect } from 'react';
import { DEMO_CARDS } from '../theme';

const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

export function usePairDecisions() {
  const [screen, setScreen] = useState('onboarding');
  const [obStep, setObStep] = useState(0);
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, on: false });
  const [flying, setFlying] = useState(null); // { dir, x, y }
  const [match, setMatch] = useState(null);
  const [createStep, setCreateStep] = useState(0);
  const [billing, setBilling] = useState('month');
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (tg) {
      try {
        tg.ready();
        tg.expand();
        tg.setHeaderColor?.('#0d0d1c');
        tg.setBackgroundColor?.('#0d0d1c');
      } catch {}
    }
  }, []);

  const haptic = useCallback((kind = 'light') => {
    try { tg?.HapticFeedback?.impactOccurred(kind); } catch {}
  }, []);
  const notif = useCallback((kind = 'success') => {
    try { tg?.HapticFeedback?.notificationOccurred(kind); } catch {}
  }, []);

  const go = useCallback((s) => { haptic('light'); setScreen(s); }, [haptic]);

  const obNext = useCallback(() => {
    if (obStep >= 2) { haptic('light'); setScreen('auth'); }
    else { haptic('light'); setObStep(v => v + 1); }
  }, [obStep, haptic]);
  const skip = useCallback(() => { haptic('light'); setScreen('auth'); }, [haptic]);
  const login = useCallback(() => { haptic('medium'); setScreen('home'); }, [haptic]);
  const logout = useCallback(() => { haptic('medium'); setScreen('auth'); }, [haptic]);

  const startVote = useCallback(() => {
    haptic('light');
    setScreen('vote'); setIdx(0); setDrag({ x: 0, y: 0, on: false }); setFlying(null); setMatch(null);
  }, [haptic]);

  const cNext = useCallback(() => { haptic('light'); setCreateStep(v => Math.min(2, v + 1)); }, [haptic]);
  const cBack = useCallback(() => {
    if (createStep > 0) { haptic('light'); setCreateStep(v => v - 1); }
    else setScreen('home');
  }, [createStep, haptic]);
  const goCreate = useCallback(() => { setCreateStep(0); go('create'); }, [go]);

  // --- Drag physics (pointer events) ---
  const onDown = useCallback((e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setDrag({ x: 0, y: 0, on: true });
  }, []);
  const onMove = useCallback((e) => {
    setDrag(d => d.on ? { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y, on: true } : d);
  }, []);

  const commit = useCallback((dir) => {
    setFlying(f => {
      if (f) return f;
      const card = DEMO_CARDS[idx];
      if (!card) return f;
      haptic('light');
      const flyX = dir === 'like' ? 520 : dir === 'nope' ? -520 : 0;
      const flyY = dir === 'discuss' ? -680 : 60;
      setDrag({ x: 0, y: 0, on: false });
      setTimeout(() => {
        if (dir === 'like' && card.match) { notif('success'); setMatch(card); setFlying(null); return; }
        setIdx(prevIdx => {
          const nextIdx = prevIdx + 1;
          if (nextIdx >= DEMO_CARDS.length) { setScreen('results'); return prevIdx; }
          return nextIdx;
        });
        setFlying(null);
      }, 270);
      return { dir, x: flyX, y: flyY };
    });
  }, [idx, haptic, notif]);

  const onUp = useCallback(() => {
    setDrag(d => {
      if (!d.on) return d;
      const TH = 88;
      if (d.y < -TH && Math.abs(d.y) > Math.abs(d.x)) commit('discuss');
      else if (d.x > TH) commit('like');
      else if (d.x < -TH) commit('nope');
      else return { x: 0, y: 0, on: false };
      return d;
    });
  }, [commit]);

  const voteLike = useCallback(() => commit('like'), [commit]);
  const voteNope = useCallback(() => commit('nope'), [commit]);
  const voteDiscuss = useCallback(() => commit('discuss'), [commit]);

  const undo = useCallback(() => {
    if (idx > 0 && !flying) { haptic('light'); setIdx(v => v - 1); setDrag({ x: 0, y: 0, on: false }); }
  }, [idx, flying, haptic]);

  const matchToResults = useCallback(() => { haptic('light'); setMatch(null); setScreen('results'); }, [haptic]);
  const matchContinue = useCallback(() => {
    haptic('light');
    const nextIdx = idx + 1;
    setMatch(null);
    if (nextIdx >= DEMO_CARDS.length) setScreen('results'); else setIdx(nextIdx);
  }, [idx, haptic]);

  const shareInvite = useCallback((code, title) => {
    const url = `https://t.me/PairDecisionsBot/app?startapp=${code}`;
    const text = `Присоединяйся к опросу «${title}» в Pair Decisions!`;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    } else if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard?.writeText(url);
    }
  }, []);

  return {
    tg, isInTelegram: !!tg,
    screen, setScreen, go,
    obStep, obNext, skip,
    login, logout,
    idx, drag, flying, match, cards: DEMO_CARDS,
    startVote, onDown, onMove, onUp,
    voteLike, voteNope, voteDiscuss, undo,
    matchToResults, matchContinue,
    createStep, cNext, cBack, goCreate,
    billing, setBilling,
    haptic, shareInvite,
  };
}
