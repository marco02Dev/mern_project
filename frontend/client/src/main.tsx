import { createRoot } from 'react-dom/client';
import { MainLayout } from './MainLayout.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <MainLayout>
    <App />
  </MainLayout>
);
