import { StyledMainWrapper } from './styled/styled-main-wrapper';
import { NavBar } from './components/nav-bar';
import { Routes, Route } from 'react-router-dom'; // Importazione di React Router
import { HomePage } from './pages/home-page';
import { Courses } from './pages/courses';
import { LogIn } from './pages/log-in';
import { Contact } from './pages/contact';
import { About } from './pages/about';
import { Footer } from './components/footer';

function App() {
  return <StyledMainWrapper>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<LogIn />} />
    </Routes>
    <Footer />
  </StyledMainWrapper>
}

export default App;

