import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';
import useLocationChange from './hooks/useLocationChange';
import { PageTransitionElement } from './components/animated/pageTransitionElement';

function App() {

  const hasLocationChanged: boolean = useLocationChange();

  return <>
    <MobileMenu />
    <Header />
    <Router />
    <Footer />
    <PageTransitionElement hasLocationChanged={hasLocationChanged} />
  </>
}

export default App;

