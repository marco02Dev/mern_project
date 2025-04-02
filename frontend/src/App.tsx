import { StyledMainWrapper } from './styles/styled-main-wrapper';
import { Header } from './components/template-parts/header';
import { Footer } from './components/template-parts/footer';
import { Router } from './config/router';

function App() {
  return <StyledMainWrapper>
    <Header />
    <Router />
    <Footer />
  </StyledMainWrapper>
}

export default App;

