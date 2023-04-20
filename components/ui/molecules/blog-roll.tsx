import { BlogMetadata } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { DisplayDate } from "../atoms/display-date";
import dayjs from "dayjs";

import { Badge } from "../atoms/badge";
import { Matter } from "@/lib/md/utils";
interface BlogRollProps extends Matter<BlogMetadata> {}
export const BlogRoll = ({ slug, title, tags, publishDate }: BlogRollProps) => {
  return (
    <Link
      key={slug}
      href={`/blog/${slug}`}
      className="group relative rounded-lg border shadow transition-all hover:-translate-y-[1px] hover:shadow-lg"
    >
      <article className="flex flex-col gap-4">
        <header className="pl-4 pt-4 text-3xl font-bold">{title}</header>
        <footer className=" flex justify-between p-1">
          <span className="flex gap-1">
            {tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
          <span className="stroke-black  p-1 ">
            <DisplayDate date={dayjs(publishDate)} />
          </span>
        </footer>
      </article>
    </Link>
  );
};
