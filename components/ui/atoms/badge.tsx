import { PropsWithChildren } from "react";

interface BadgeProps extends PropsWithChildren {}
export const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="rounded-xl bg-black/75 px-2 py-1 text-white">
      {children}
    </span>
  );
};
