import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
interface ExternalIconLinkProps extends HTMLProps<HTMLAnchorElement> {}
export const ExternalIconLink = ({
  className,
  ...props
}: PropsWithChildren<ExternalIconLinkProps>) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    className={clsx("transition-transform hover:scale-110", className)}
    {...props}
  />
);
