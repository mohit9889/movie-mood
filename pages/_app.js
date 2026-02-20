import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '~/layouts/MainLayout';
import FullPageLoader from '~/components/FullPageLoader';
import { ThemesProvider } from '~/context/themesContext';
import { LoadingProvider, useLoading } from '~/context/loadingContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import '~/styles/globals.scss';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [routeChangeLoading, setRouteChangeLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setRouteChangeLoading(true);
    const handleComplete = () => setRouteChangeLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ThemesProvider>
      <LoadingProvider>
        <AppContent
          Component={Component}
          pageProps={pageProps}
          routeChangeLoading={routeChangeLoading}
        />
        <SpeedInsights />
        <Analytics />
      </LoadingProvider>
    </ThemesProvider>
  );
}

function AppContent({ Component, pageProps, routeChangeLoading }) {
  const { isLoading } = useLoading();

  return (
    <MainLayout loading={isLoading || routeChangeLoading}>
      {(isLoading || routeChangeLoading) && <FullPageLoader />}
      <Component {...pageProps} />
    </MainLayout>
  );
}
