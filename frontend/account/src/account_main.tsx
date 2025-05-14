import { createRoot } from 'react-dom/client';
import { MainLayout } from '@client/MainLayout';
import AccountApp from './AccountApp';

createRoot(document.getElementById('account')!).render(
  <MainLayout>
    <AccountApp />
  </MainLayout>
);