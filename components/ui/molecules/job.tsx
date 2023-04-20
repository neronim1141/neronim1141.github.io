import clsx from "clsx";
import { Position } from "./position";
import dayjs from "dayjs";
import { WorkTime } from "./work-time";
export type Job = {
  company: string;

  positions: Position[];
};

interface JobProps extends Job {
  expanded: string;
  setExpanded: (value: string) => void;
}
export const Job = ({
  company,
  positions,
  expanded,
  setExpanded,
}: JobProps) => {
  const firstPositionStart = positions[positions.length - 1].from;
  const lastPositionEnd = positions[0].to;
  function handleExpanded(title: string) {
    setExpanded(`${company}.${title}`);
  }
  const [expandedCompany, expandedTitle] = expanded.split(".");
  return (
    <article className="space-y-2">
      <h3 className="text-2xl font-bold">
        {company}{" "}
        <WorkTime
          from={dayjs(firstPositionStart)}
          to={dayjs(lastPositionEnd)}
        />
      </h3>
      <ul className={clsx("space-y-2 px-7")}>
        {positions.map((position) => (
          <li
            key={position.title}
            className={clsx(
              "relative",
              "after:absolute after:-left-6 after:bottom-1 after:top-2.5 after:h-3 after:w-3 after:rounded-full after:bg-current ",
              "before:absolute before:-bottom-6 before:-left-[1.15rem] before:top-4 before:border-l before:border-current last:before:hidden "
            )}
          >
            <Position
              {...position}
              expanded={expandedCompany === company ? expandedTitle : ""}
              setExpanded={handleExpanded}
            />
          </li>
        ))}
      </ul>
    </article>
  );
};
