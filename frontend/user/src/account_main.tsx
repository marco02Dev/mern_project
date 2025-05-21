import { createRoot } from 'react-dom/client';
import { MainLayout } from '@shared/components/layouts/MainLayout';
import UserApp from './UserApp';

createRoot(document.getElementById('account')!).render(
  <MainLayout>
    <UserApp />
  </MainLayout>
);