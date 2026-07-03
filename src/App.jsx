import React from 'react';
import { T } from './theme';
import { usePairDecisions } from './hooks/usePairDecisions';

import Onboarding from './screens/Onboarding';
import Auth from './screens/Auth';
import Home from './screens/Home';
import Create from './screens/Create';
import Voting from './screens/Voting';
import MatchOverlay from './screens/MatchOverlay';
import Results from './screens/Results';
import Profile from './screens/Profile';
import Pricing from './screens/Pricing';

export default function App() {
  const p = usePairDecisions();

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 460,
      height: '100dvh',
      margin: '0 auto',
      background: T.bgGradient,
      color: T.text,
      overflow: 'hidden',
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      {p.screen === 'onboarding' && <Onboarding obStep={p.obStep} obNext={p.obNext} skip={p.skip} />}
      {p.screen === 'auth' && <Auth login={p.login} />}
      {p.screen === 'home' && (
        <Home
          goCreate={p.goCreate}
          goCode={p.startVote}
          goProfile={() => p.go('profile')}
          startVote={p.startVote}
          goResults={() => p.go('results')}
        />
      )}
      {p.screen === 'create' && <Create createStep={p.createStep} cNext={p.cNext} cBack={p.cBack} startVote={p.startVote} />}
      {p.screen === 'vote' && (
        <Voting
          idx={p.idx} cards={p.cards} drag={p.drag} flying={p.flying}
          onDown={p.onDown} onMove={p.onMove} onUp={p.onUp}
          voteLike={p.voteLike} voteNope={p.voteNope} voteDiscuss={p.voteDiscuss}
          undo={p.undo} goHome={() => p.go('home')}
        />
      )}
      {p.screen === 'results' && <Results goHome={() => p.go('home')} goCreate={p.goCreate} goProfile={() => p.go('profile')} />}
      {p.screen === 'profile' && <Profile goHome={() => p.go('home')} goCreate={p.goCreate} goPricing={() => p.go('pricing')} logout={p.logout} />}
      {p.screen === 'pricing' && <Pricing billing={p.billing} setBilling={p.setBilling} goProfile={() => p.go('profile')} />}

      <MatchOverlay match={p.match} matchToResults={p.matchToResults} matchContinue={p.matchContinue} />
    </div>
  );
}
