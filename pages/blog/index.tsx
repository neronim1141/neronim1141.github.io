// 404.js
import { getAllMeta } from "@/lib/md/utils";
import { BlogMetadata } from "@/types/blog";
import { Main } from "@/components/layout/main";
import { BlogRoll } from "@/components/ui/molecules/blog-roll";
import dayjs from "dayjs";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const metas = getAllMeta<BlogMetadata>("blog");

  return {
    props: {
      blogRolls: metas
        .sort((a, b) =>
          dayjs(a.publishDate).isBefore(dayjs(b.publishDate)) ? 1 : -1
        )
        .splice(0, 3),
    },
  };
}

export default function Blog({
  blogRolls,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Main>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogRolls.map((blogPage) => (
          <BlogRoll key={blogPage.slug} {...blogPage} />
        ))}
      </div>
    </Main>
  );
}
