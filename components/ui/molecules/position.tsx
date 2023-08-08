import { AnimatePresence, motion } from "framer-motion";
import { DirectionArrow } from "../atoms/direction-arrow";
import dayjs from "dayjs";
import { Timediff } from "../atoms/time-diff";
import { DisplayDate } from "../atoms/display-date";
import { WorkTime } from "./work-time";

export type Position = {
  title: string;
  description?: string;
  from: string;
  to?: string;
};
interface PositionProps extends Position {
  expanded: string;
  setExpanded: (value: string) => void;
}

export const Position = ({
  title,
  description,
  from,
  to,
  expanded,
  setExpanded,
}: PositionProps) => {
  const isOpen = title === expanded;
  return (
    <article className="overflow-hidden">
      <motion.h4
        initial={false}
        className="group flex items-start gap-1 text-lg font-bold"
      >
        <button
          onClick={() => setExpanded(isOpen ? "" : title)}
          disabled={!description}
          className="flex flex-col  max-w-xs w-full"
        >
          <span className="flex gap-2">
            {title}
            {description && (
              <DirectionArrow
                direction={isOpen ? "up" : "down"}
                className="mt-2 group-hover:scale-150"
              />
            )}
          </span>
          <WorkTime from={dayjs(from)} to={dayjs(to)} />
        </button>
      </motion.h4>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.p
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="whitespace-pre-wrap"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </article>
  );
};
