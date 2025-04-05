import { Header } from './components/template-parts/header';
import { Footer } from './components/template-parts/footer';
import { Router } from './config/router';
import { MobileMenu } from './components/template-parts/mobile-menu';

function App() {
  return <>
    <MobileMenu />
    <Header />
    <Router />
    <Footer />
  </>
}

export default App;

