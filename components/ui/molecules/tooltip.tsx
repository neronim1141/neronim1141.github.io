import React, { PropsWithChildren } from "react";
import clsx from "clsx";

interface TooltipProps extends PropsWithChildren {
  text: string;
}
export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group flex flex-col items-center">
      <div className="absolute invisible group-hover:visible p-1 text-center bg-zinc-500 text-zinc-200  font-semibold text-sm z-1 bottom-[125%] rounded-md shadow-lg w-max">
        {text}
      </div>
      {children}
    </div>
  );
};
