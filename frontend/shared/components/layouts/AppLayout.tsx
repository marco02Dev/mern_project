import { Header } from '@shared/components/template-parts/Header';
import { Footer } from '@shared/components/template-parts/Footer';
import { MobileMenu } from '@shared/components/template-parts/MobileMenu';
import { PageTransitionElement } from '@shared/components/animated/PageTransitionElement';
import { PageTransitionTitle } from '@shared/components/animated/PageTransitionTitle';
import { useMediaQuery, UseMediaQuery } from '@shared/hooks/ui/useMediaQuery';
import useLocationChange, { UseLocationChange } from '@shared/hooks/navigation/useLocationChange';
import { ReactElement, useEffect } from 'react';
import { useRestoreSession } from '@shared/hooks/auth/useRestoreSession';
import { useDynamicTitle } from '@shared/hooks/navigation/useDynamicDocumentTitle';
import { AppState } from '@shared/store/slices/app-state-slice';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/store';
import { LoadingPage } from '@client/pages/LoadingPage';

export const AppLayout = ({children}: {children: ReactElement}) => {
  const hasLocationChanged: UseLocationChange = useLocationChange();
  const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
  const {loading, error}: AppState = useSelector((state: RootState) => state.appState);

  useRestoreSession();
  useDynamicTitle();

  useEffect(() => {
    if (hasLocationChanged) {
      window.scrollTo(0, 0);
    }
  }, [hasLocationChanged]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return <>
    {(isMobile || isTablet) && <MobileMenu /> }
    <Header />
    {children}
    <Footer />
    <PageTransitionElement />
    <PageTransitionTitle />
  </>
}

