import { ClientRouter } from '@client/ClientRouter';
import { AppLayout } from '@shared/components/layouts/AppLayout';

function ClientApp() {

  return <AppLayout>
    <ClientRouter />
  </AppLayout>
}

export default ClientApp;

