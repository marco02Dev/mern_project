import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { Router } from './Router';
import { MobileMenu } from './components/template-parts/MobileMenu';

function App() {
  return <>
    <MobileMenu />
    <Header />
    <Router />
    <Footer />
  </>
}

export default App;

