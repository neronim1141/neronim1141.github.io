import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="main-background w-screen overflow-x-hidden bg-neutral-50 text-zinc-950  dark:bg-neutral-950 dark:text-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
