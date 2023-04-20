import { BlogMetadata } from "@/types/blog";
import Link from "next/link";
import { BlogRoll } from "../molecules/blog-roll";
import { Matter } from "@/lib/md/utils";

interface BlogListProps {
  total: number;
  blogPosts: Matter<BlogMetadata>[];
}
export const BlogList = ({ blogPosts, total }: BlogListProps) => {
  return (
    <section className="flex flex-col gap-4 sm:row-span-2 md:items-end">
      <h2 className="text-5xl font-bold">Blog Posts</h2>
      <div className="grid w-full max-w-md grid-cols-1 gap-4">
        {blogPosts.map((blogPage) => (
          <BlogRoll key={blogPage.slug} {...blogPage} />
        ))}
      </div>
      {total > 3 && (
        <Link
          href="/blog"
          className="block w-full max-w-md rounded-lg border-2 border-zinc-700 p-1 text-center font-bold capitalize hover:bg-zinc-200 dark:border-zinc-300 dark:hover:bg-zinc-800"
        >
          see more
        </Link>
      )}
    </section>
  );
};
