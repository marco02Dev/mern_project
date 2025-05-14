import { MainLayout } from '@shared/components/layouts/MainLayout';
import { createRoot } from 'react-dom/client';
import AdminApp from './admin_app';

createRoot(document.getElementById('admin')!).render(
  <MainLayout>
    <AdminApp />
  </MainLayout>
);