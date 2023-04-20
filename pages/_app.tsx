import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { DefaultSeo } from "next-seo";
import { ToastProvider } from "@/lib/providers/toast-provider";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <DefaultSeo
        title="Kacper Kruczek Portfolio"
        description="Kacper Kruczek Portfolio"
        canonical="https://neronim1141.github.io"
        openGraph={{
          type: "website",
          locale: "en_EN",
          url: "https://neronim1141.github.io",
          siteName: "Kacper Kruczek Portfolio",
        }}
      />
      <div className="container flex min-h-screen flex-col bg-zinc-100 pb-18 ring-red-500 dark:bg-zinc-900 dark:ring-red-900 sm:ring-2">
        <Header />

        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </div>
      <ToastProvider />
    </ThemeProvider>
  );
}
