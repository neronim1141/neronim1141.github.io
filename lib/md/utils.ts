import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { parse, stringify } from "yaml";

const dataDirectory = join(process.cwd(), "data");

export function getBySlug<T extends { [key: string]: any }>(
  slug: string,
  folder: string
): { slug: string; meta: T; content: string } {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(dataDirectory, folder, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: {
        parse,
        stringify,
      },
    },
  });
  console.log();
  return {
    slug: realSlug,
    meta: data as T,
    content,
  };
}

export type Matter<T> = T & { slug: string };

export const getSlugs = (folder: string) => {
  return fs
    .readdirSync(join(dataDirectory, folder))
    .map((file) => file.replace(/\.md$/, ""));
};
export const getAllMeta = <T extends { [key: string]: any }>(
  folder: string
): Matter<T>[] => {
  const slugs = getSlugs(folder);
  return slugs.map((slug) => ({
    ...getBySlug<T>(slug, folder).meta,
    slug,
  }));
};
