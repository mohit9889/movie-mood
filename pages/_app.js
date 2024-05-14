import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MainLayout from "~/layouts/MainLayout";
import FullPageLoader from "~/components/FullPageLoader";
import { ThemesProvider } from "~/context/themesContext";
import "~/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <ThemesProvider>
      <MainLayout loading={loading}>
        {loading && <FullPageLoader />}
        <Component {...pageProps} />
      </MainLayout>
    </ThemesProvider>
  );
}
