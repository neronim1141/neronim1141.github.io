import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
interface ExternalLinkProps extends HTMLProps<HTMLAnchorElement> {}
export const ExternalLink = ({
  className,
  ...props
}: PropsWithChildren<ExternalLinkProps>) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    className={clsx(
      "underline hover:text-red-600 dark:hover:text-red-700",
      className
    )}
    {...props}
  />
);
