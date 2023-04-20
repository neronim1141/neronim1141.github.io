import { useMounted } from "@/lib/hooks/useMounted";
import clsx from "clsx";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const variants: Variants = {
  start: {
    opacity: 0.25,
    x: -10,
    y: 10,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  end: {
    opacity: 0.25,
    x: 10,
    y: 10,
  },
};

export const ThemeSwitcher = () => {
  const mounted = useMounted();
  const { resolvedTheme: theme, setTheme } = useTheme();
  if (!mounted) return <div className="h-9 w-9"></div>;

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeChange}
      className={clsx(
        "group grid h-9 w-9 place-content-center overflow-hidden rounded-full text-xl shadow transition-colors",
        {
          "bg-sky-600 hover:bg-sky-500": theme === "dark",
          "bg-amber-600  hover:bg-amber-500": theme === "light",
        }
      )}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" && (
          <motion.div
            key="dark"
            initial="start"
            animate="show"
            exit="end"
            transition={{
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            variants={variants}
          >
            <FaMoon className="text-sky-100 group-hover:text-sky-50" />
          </motion.div>
        )}
        {theme === "light" && (
          <motion.div
            key="light"
            initial="start"
            animate="show"
            exit="end"
            transition={{
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            variants={variants}
          >
            <FaSun className="text-amber-300 group-hover:text-amber-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
