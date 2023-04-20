import { useState } from "react";
import { Job } from "../molecules/job";

interface JobListProps {
  jobs: Job[];
}
export const JobList = ({ jobs }: JobListProps) => {
  const [expanded, setExpanded] = useState<string>("");

  return (
    <section className="min-w-fit space-y-4">
      <h2 className="text-5xl font-bold">Experience</h2>
      <ul className="space-y-4 px-2">
        {jobs.map((job) => (
          <li key={job.company}>
            <Job {...job} expanded={expanded} setExpanded={setExpanded} />
          </li>
        ))}
      </ul>
    </section>
  );
};
