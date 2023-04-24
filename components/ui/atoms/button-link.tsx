import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
interface ButtonLinkProps extends HTMLProps<HTMLAnchorElement> {}
export const ButtonLink = ({
  className,
  ...props
}: PropsWithChildren<ButtonLinkProps>) => (
  <a
    className={clsx(
      "py-1 px-2 rounded-md ring-2 font-bold",
      "bg-zinc-200 hover:bg-red-600 ring-black hover:text-white",
      "dark:bg-zinc-800 dark:hover:bg-red-700  dark:ring-white",
      className
    )}
    {...props}
  />
);
