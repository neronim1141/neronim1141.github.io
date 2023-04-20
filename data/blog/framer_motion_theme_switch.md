---
title: How to make ThemeSwitch
image: https://picsum.photos/400/200
tags: [Framer Motion,next-themes]
publishDate: 2023-04-12

---

In this tutorial you will learn how to recreate this portfolio theme switch button using Typescript, Next.js, next-themes, react-icons, tailwindcss and clsx.

# Preparation
To make things work you need to install and prepare mentioned packages first.
Then we need to change tailwind.config.js to use:
```js
  darkMode: "class"
```
and in our _app.tsx we import and wrap our **Component** in **ThemeProvider** like so:
```tsx
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
     <Component {...pageProps} />
    </ThemeProvider>
  );
}
```
With this setup we tell our application that it should change **html** class based on current theme which by default we set to system, that means that whatever theme our user prefers we will be also automatically using on our app unless changed.

# Start

After doing all of the above we can start making our actual component,
we start with simple button:
```tsx
export const ThemeSwitch = () => {
  return <button></button>
}
```
Then we add some **useTheme** from next-themes hook:
```tsx
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
   const { theme } = useTheme();
  return <button>{theme}</button>
}
```
But wait a moment, now our 'theme' is **system** it's neither **dark** or **light**, so how do we know what theme is the user using?

Actually the object that useTheme is returing us has one more property which is neat when we want to use 'system' and its called **resolvedTheme**:
```tsx
   const { resolvedTheme:theme } = useTheme();
```
Im using deconstruction alias here to make it a bit easier for me later.
Basically the **resolvedTheme** is, like the name suggest, resolving itself to the actual theme the user is using.

With that we can take our next step and make our clicking change our theme:
```tsx
export const ThemeSwitch = () => {
   const { resolvedTheme:theme,setTheme } = useTheme();
    const handleThemeChange = () => {
      setTheme(theme === "dark" ? "light" : "dark");
  };
  return <button   onClick={handleThemeChange}>{theme}</button>
}
```
Now when you change your theme you will see that the correct class is applied to your html, but there is a catch!
If you refresh the page you will probably get **react-hydration-error**,
It is happening because server-side render is different from  your client-side, for example on server-side button text is 'light', but because of the theme retrived from your localstorage on client-side it is 'dark' and that results in the mentioned hydration error.

To fix that we simply dont consume our theme variable in the first render, we can do that by checking if the component is mounted or not:
```tsx
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
   const [mounted, setMounted] = useState(false);
   const { resolvedTheme:theme, setTheme } = useTheme();
    const handleThemeChange = () => {
      setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => setMounted(true),[]);
  if(!mounted) return <div></div> // placeholder for our Switch

  return <button   onClick={handleThemeChange}>{theme}</button>
}
```
Lets change our text for the icons, to do that we will be using short-circuit evaluation:

```tsx
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme: theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div></div>; // placeholder for our Switch

  return (
    <button onClick={handleThemeChange}>
      {theme === "dark" && <FaMoon />}
      {theme === "light" && <FaSun />}
    </button>
  );
};
```
# Animation

Lets add some animations to our icons, for that we want them to appear from bottom left,move to initial position and exit to bottom right all of that with a bit of fade-in-out, we can use Framer-Motion variants for that:
```tsx
import { motion,Variants } from "framer-motion";

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

```
Lets hook it up to our icons:
```tsx
{theme === "dark" && (
    <motion.div
      initial="start"
      animate="show"
      exit="end"
      variants={variants}
    >
      <FaMoon />
    </motion.div>
  )}
  {theme === "light" && (
    <motion.div
      initial="start"
      animate="show"
      exit="end"
      variants={variants}
    >
      <FaSun />
    </motion.div>
  )}
```
You will notice one thing right away, that our exit animation is not working.
Thats because we are unmounting the other icon right away and dont give them time to play that part.
Comming to us with help is **AnimatePresence** that manages inner components until exit animation is not finished. for that we simply wrap our icons in that component and to let it know which one is with we set keys on the icon wrappers:

```tsx
import { AnimatePresence, motion, Variants } from "framer-motion";

{...}

<AnimatePresence>
  {theme === "dark" && (
    <motion.div
      key="dark"
      {...}
    >
      <FaMoon />
    </motion.div>
  )}
  {theme === "light" && (
    <motion.div
      key="light"
      {...}
    >
      <FaSun />
    </motion.div>
  )}
</AnimatePresence>
```
There is one last problem though, now we see two icons for a while it is happening because we mount new icon, before we unmount the old one, to fix that we can simply told **AnimatePresence** to wait:
```tsx
 <AnimatePresence mode="wait">
```
# Finish
With that we finished all the code needed to make it work, what's left it's just to add some styling.

My finished code looks like that:
```tsx
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
```

Thanks for reading until the end.