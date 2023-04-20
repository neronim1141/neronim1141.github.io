// 404.js
import { Main } from "@/components/layout/main";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FourOhFour() {
  const router = useRouter();
  return (
    <Main>
      <div className="grid flex-grow place-content-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">404 - Page Not Found</h1>
          <button
            className={clsx(
              "rounded-lg border p-1 text-center font-bold",
              "border-zinc-800 hover:bg-zinc-200",
              "dark:border-zinc-200 dark:hover:bg-zinc-800"
            )}
            onClick={router.back}
          >
            Return
          </button>
        </div>
      </div>
    </Main>
  );
}
