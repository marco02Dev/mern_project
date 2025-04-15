import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';
import { useEffect, useState } from 'react';
import useLocationChange from './hooks/useLocationChange';
import { endpoints } from './config/endpoints.config';

function App() {

  const hasLocationChanged: boolean = useLocationChange();
  const [nonce, setNonce] = useState();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(endpoints.initSessionEndpoint, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Errore nell\'inizializzazione della sessione');
        }

        const data = await response.json();
        setNonce(data.nonce)
        console.log('Nonce ricevuto:', data.nonce);
      } catch (error) {
        console.error('Errore:', error);
      }
    };

    initializeSession();
  }, []);

  useEffect(() => {
    if (hasLocationChanged) {
      window.scrollTo(0, 0);
    }
  }, [hasLocationChanged]);

  console.log(nonce)

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

