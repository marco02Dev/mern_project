import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';
import { useEffect } from 'react';
import useLocationChange from './hooks/useLocationChange';
import { initializeSession } from './store/slices/nonce.slice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {

  const hasLocationChanged: boolean = useLocationChange();
  const dispatch = useAppDispatch();
  const nonce = useAppSelector(state => state.nonce.value);
  const loading = useAppSelector(state => state.nonce.loading);
  const error = useAppSelector(state => state.nonce.error);

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  useEffect(() => {
    if (hasLocationChanged) {
      window.scrollTo(0, 0);
    }
  }, [hasLocationChanged]);

  console.log('Nonce:', nonce, 'Loading:', loading, 'Error:', error);
  console.log(document.cookie);


  return <>
    <MobileMenu />
    <Header />
    <Router />
    <Footer />
    <PageTransitionElement />
    <PageTransitionTitle />
  </>
}

export default App;

