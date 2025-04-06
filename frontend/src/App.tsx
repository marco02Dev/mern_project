import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';

function App() {

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

