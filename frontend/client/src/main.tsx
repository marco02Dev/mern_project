import { createRoot } from 'react-dom/client';
import { MainLayout } from '@shared/components/layouts/MainLayout.tsx';
import ClientApp from './ClientApp.tsx';

createRoot(document.getElementById('root')!).render(
  <MainLayout>
    <ClientApp />
  </MainLayout>
);
