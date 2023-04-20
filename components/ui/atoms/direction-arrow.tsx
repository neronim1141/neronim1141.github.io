import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";
interface DirectionArrow {
  direction?: "up" | "down";
  className?: string;
}
export const DirectionArrow = ({
  direction = "down",
  className,
}: DirectionArrow) => {
  return (
    <FaChevronDown
      className={clsx(
        "h-3 w-3 transition-transform",
        {
          "rotate-180": direction === "up",
        },
        className
      )}
    />
  );
};
