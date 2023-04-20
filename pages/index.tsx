import { ExternalIconLink } from "@/components/ui/atoms/external-icon-link";
import { Main } from "@/components/layout/main";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { GiRollingDices } from "react-icons/gi";
import { jobs } from "@/data/jobs";
import { JobList } from "@/components/ui/organisms/job-list";
import { SkillList } from "@/components/ui/organisms/skill-list";
import { Language } from "@/components/ui/molecules/language";
import { getAllMeta } from "@/lib/md/utils";
import { BlogMetadata } from "@/types/blog";
import { InferGetStaticPropsType } from "next";
import { BlogList } from "@/components/ui/organisms/blog-list";
import { Suspense } from "react";
import { DisplayDice } from "@/components/ui/molecules/display-dice";
import { ExternalLink } from "@/components/ui/atoms/external-link";

export async function getStaticProps() {
  const metas = getAllMeta<BlogMetadata>("blog");

  return {
    props: {
      totalBlogPosts: metas.length,
      blogRolls: metas
        .sort((a, b) => {
          if (a.featured && b.featured) return 0;
          if (a.featured && !b.featured) return -1;
          return 1;
        })
        .splice(0, 3),
    },
  };
}

export default function Home({
  totalBlogPosts,
  blogRolls,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Main>
      <section className="flex">
        <div className="flex max-w-2xl flex-col gap-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              I&apos;m Kacper Kruczek
            </h1>
            <h2 className="text-1xl font-semibold tracking-tight text-red-700">
              Frontend Developer
            </h2>
          </div>
          <p>
            I specialize in creating visually stunning and user-friendly
            experiences, bridging the gap between design and functionality. With
            a keen eye for detail and a commitment to continuous learning,
            I&apos;m dedicated to delivering high-quality results that exceed
            expectations.
          </p>
        </div>
        <div className="hidden  flex-grow justify-end  lg:flex">
          <Suspense fallback={<GiRollingDices className="h-full w-max" />}>
            <DisplayDice />
          </Suspense>
        </div>
      </section>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <JobList jobs={jobs} />
        <SkillList />
        <section>
          <h2 className="text-5xl font-bold">Languages</h2>
          <ul className="space-y-2 p-2">
            <li>
              <Language language="Polish" level="native" />
            </li>
            <li>
              <Language language="English" level="B2" />
            </li>
          </ul>
        </section>
        <BlogList blogPosts={blogRolls} total={totalBlogPosts} />
        <section>
          <h2 className="text-5xl font-bold">Contact</h2>
          <div className="flex gap-4 p-4 text-3xl">
            <ExternalIconLink
              href="https://www.github.com/neronim1141"
              className="rounded-full"
            >
              <FaGithub className=" " />
            </ExternalIconLink>
            <ExternalIconLink
              href="https://www.linkedin.com/in/kacperkruczek/"
              className="text-blue-700 "
            >
              <FaLinkedinIn className=" bg-blue-700 p-0.5 text-white" />
            </ExternalIconLink>
            <ExternalLink
              href="mailto:kacper.m.kruczek@gmail.com"
              className="text-base flex gap-1"
            >
              <MdAlternateEmail className="text-3xl" />
              kacper.m.kruczek@gmail.com
            </ExternalLink>
          </div>
        </section>
      </div>
    </Main>
  );
}
