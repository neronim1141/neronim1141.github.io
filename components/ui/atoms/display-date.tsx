import dayjs from "dayjs";

interface DisplaydateProps {
  date: dayjs.Dayjs;
}
export const DisplayDate = ({ date }: DisplaydateProps) => {
  return <>{date.format("MMM YYYY")}</>;
};
