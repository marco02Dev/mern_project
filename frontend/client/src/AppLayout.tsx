import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';
import { useMediaQuery, UseMediaQuery } from './hooks/ui/useMediaQuery';
import useLocationChange, { UseLocationChange } from './hooks/navigation/useLocationChange';
import { ReactElement, useEffect } from 'react';
import { useRestoreSession } from './hooks/auth/useRestoreSession';
import { useDynamicTitle } from './hooks/navigation/useDynamicDocumentTitle';
import { AppState } from './store/slices/app-state-slice';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoadingPage } from './pages/LoadingPage';
import { isProduction, isRender } from './config/app.config';
import { StyledCookieYesBanner } from './components/themed/StyledCookieYesBanner';

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

    {isProduction && isRender && <StyledCookieYesBanner />}

    <Header />
    {children}
    <Footer />
    <PageTransitionElement />
    <PageTransitionTitle />
  </>
}

