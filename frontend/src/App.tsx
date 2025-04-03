import { StyledMainWrapper } from './styles/styled-main-wrapper';
import { Header } from './components/template-parts/header';
import { Footer } from './components/template-parts/footer';
import { Router } from './config/router';
import { MobileMenu } from './components/template-parts/mobile-menu';

function App() {
  return <StyledMainWrapper>
    <MobileMenu />
    <Header />
    <Router />
    <Footer />
  </StyledMainWrapper>
}

export default App;

