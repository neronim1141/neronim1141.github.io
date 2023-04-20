import dayjs from "dayjs";
import { useMemo } from "react";

interface TimediffProps {
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
}
export const Timediff = ({ from, to }: TimediffProps) => {
  const { years, months } = useMemo(() => {
    const years = to.add(1, "M").startOf("M").diff(from.startOf("M"), "y");
    const months = to
      .add(1, "M")
      .startOf("M")
      .diff(from.startOf("M").add(years, "y"), "M");
    return { years, months };
  }, [from, to]);

  return (
    <>
      {years > 0 && <span>{years} years</span>}
      {months > 0 && (
        <span>
          {years > 0 && ","} {months} months
        </span>
      )}
    </>
  );
};
