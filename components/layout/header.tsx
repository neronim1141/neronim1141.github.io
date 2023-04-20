import clsx from "clsx";
import {
  motion,
  useScroll,
  useVelocity,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { ThemeSwitcher } from "./theme-switcher";
import { useRouter } from "next/router";
const threshold = 750;
const slideDistance = 200;

export const Header = () => {
  const [isScrollingBack, setIsScrollingBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // true if the page is not scrolled or fully scrolled back
  const [isInView, setIsInView] = useState(true);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const { pathname } = useRouter();
  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (latest > 0) {
      setIsScrollingBack(false);
      return;
    }
    if (latest < -threshold) {
      setIsScrollingBack(true);
      return;
    }
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest <= 0);
  });

  useEffect(
    () => setIsInView(isScrollingBack || isAtTop),
    [isScrollingBack, isAtTop]
  );
  return (
    <motion.header
      className="sticky top-0 z-10 flex justify-between py-2"
      animate={{ y: isInView ? 0 : -slideDistance }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {pathname !== "/" ? (
        <Link
          href="/"
          className={clsx(
            "grid h-9 w-9 place-content-center rounded-full shadow",
            "bg-zinc-300 hover:bg-red-500 hover:text-white",
            "dark:bg-zinc-800 dark:hover:bg-red-600"
          )}
        >
          <FaHome />
        </Link>
      ) : (
        <div></div>
      )}
      <ThemeSwitcher />
    </motion.header>
  );
};
