import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

import { ExternalLink } from "../atoms/external-link";
import { skills } from "@/data/skills";
import { Tooltip } from "../molecules/tooltip";

export const SkillList = () => {
  const [percentage, setPercentage] = useState(skills[0].percentage);
  const [active, setActive] = useState(skills[0].name);
  const activeLink = skills.find((skill) => skill.name === active);
  function handleSelection(percentage: number, name: string) {
    return () => {
      setPercentage(percentage);
      setActive(name);
    };
  }
  return (
    <section className="min-w-fit">
      <h2 className="mb-4 text-5xl font-bold">Skill Set</h2>

      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className="flex flex-wrap justify-around gap-6 rounded-t-xl bg-zinc-100 p-3 text-5xl text-black"
      >
        {skills.map((skill) => (
          <Tooltip key={skill.name} text={skill.name}>
            <motion.div
              variants={{
                animate: {
                  scale: [1, 1.25, 1],
                  transition: {
                    ease: [0.17, 0.67, 0.83, 0.67],
                  },
                },
              }}
            >
              <button
                onClick={handleSelection(skill.percentage, skill.name)}
                className={clsx("transition-all hover:scale-110", {
                  "scale-125 drop-shadow ": skill.name === active,
                })}
              >
                {skill.icon}
              </button>
            </motion.div>
          </Tooltip>
        ))}
      </motion.div>
      {active && (
        <div>
          <div className="relative h-4 overflow-hidden rounded-b-full">
            <div className="absolute h-4 w-full rounded-b-full bg-zinc-100"></div>
            <div
              className="absolute h-4 rounded-r-full bg-red-600 transition-all dark:bg-red-800"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between sm:px-4 font-semibold">
            <span className="text-center">Sparse Use</span>
            <span className="text-md font-bold sm:text-xl text-center">
              {activeLink?.link ? (
                <ExternalLink href={activeLink.link}>{active}</ExternalLink>
              ) : (
                active
              )}
            </span>
            <span className="text-center">Frequent Use</span>
          </div>
        </div>
      )}
    </section>
  );
};
