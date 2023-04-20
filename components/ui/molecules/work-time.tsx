import dayjs from "dayjs";
import { DisplayDate } from "../atoms/display-date";
import { Timediff } from "../atoms/time-diff";
interface WorkTimeProps {
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
}
export const WorkTime = ({ from, to }: WorkTimeProps) => {
  return (
    <div className="mb-2 flex flex-col items-start text-sm font-semibold sm:mb-0 sm:flex-row sm:items-end sm:gap-2">
      <span>
        <DisplayDate date={from} /> - <DisplayDate date={to} />
      </span>{" "}
      <span className="text-xs font-normal text-zinc-900 dark:text-zinc-400">
        <Timediff from={from} to={to} />
      </span>
    </div>
  );
};
