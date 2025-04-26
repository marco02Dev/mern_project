import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';
import { useMediaQuery, UseMediaQuery } from './hooks/useMediaQuery';
import useLocationChange from './hooks/useLocationChange';
import { useEffect } from 'react';
import { useRestoreSession } from './hooks/useRestoreSession';

function App() {
  const hasLocationChanged: boolean = useLocationChange();
  const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
  useRestoreSession();

  useEffect(() => {
    if (hasLocationChanged) {
      window.scrollTo(0, 0);
    }
  }, [hasLocationChanged]);

  return <>
    {(isMobile || isTablet) && <MobileMenu /> }
    <Header />
    <Router />
    <Footer />
    <PageTransitionElement />
    <PageTransitionTitle />
  </>
}

export default App;

