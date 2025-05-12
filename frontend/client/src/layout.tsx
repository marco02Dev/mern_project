import { Header } from './components/template-parts/Header';
import { Footer } from './components/template-parts/Footer';
import { MobileMenu } from './components/template-parts/MobileMenu';
import { PageTransitionElement } from './components/animated/PageTransitionElement';
import { PageTransitionTitle } from './components/animated/PageTransitionTitle';
import { useMediaQuery, UseMediaQuery } from './hooks/ui/useMediaQuery';
import useLocationChange from './hooks/navigation/useLocationChange';
import { ReactElement, useEffect } from 'react';
import { useRestoreSession } from './hooks/auth/useRestoreSession';
import { useDynamicTitle } from './hooks/navigation/useDynamicDocumentTitle';
import { useCookieYes } from "./hooks/theme/useCookieYes";
import { AppState } from './store/slices/app-state-slice';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoadingPage } from './pages/LoadingPage';
import { isProduction } from './config/app.config';
import { CookieYesStylesType } from './styles/cookie-yes.style';
import { ThemeColors, useThemeColors } from './hooks/theme/useThemeColors';

function Layout({children}: {children: ReactElement}) {
  const hasLocationChanged: boolean = useLocationChange();
  const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
  const {loading, error}: AppState = useSelector((state: RootState) => state.appState);
  const { backgroundColorButton, backgroundColor, textColor, borderColor }: ThemeColors = useThemeColors();
  let CookieYesStyles: null | CookieYesStylesType = null;

  if(isProduction) {
    const CookieYesStylesObject: CookieYesStylesType = useCookieYes();
    CookieYesStyles = CookieYesStylesObject;
  }
  
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
    
    {CookieYesStyles !== null && <CookieYesStyles 
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $buttonBackgorundColor={backgroundColorButton}
      $borderColor={borderColor}
    />}

    <Header />
    {children}
    <Footer />
    <PageTransitionElement />
    <PageTransitionTitle />
  </>
}

export default Layout;

