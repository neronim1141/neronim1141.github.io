// pages/index.js

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { InferGetStaticPropsType } from "next";
import { getBySlug, getSlugs } from "@/lib/md/utils";
import SyntaxHighlighter from "@/components/ui/molecules/SyntaxHighlighter";
import { Main } from "@/components/layout/main";
import { BlogMetadata } from "@/types/blog";
import { ExternalLink } from "@/components/ui/atoms/external-link";
import { InferGetStaticPaths } from "@/types/infer-get-static-paths";
import { NextSeo } from "next-seo";

export default function Post({
  meta,
  source,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!meta) {
    return <>Something went wrong</>;
  }
  return (
    <Main>
      <NextSeo
        title={meta.title}
        canonical={"https://neronim1141.github.io/blog" + slug}
        openGraph={{
          title: meta.title,
          type: "article",
          url: "https://neronim1141.github.io/blog" + slug,
        }}
      />
      <h1 className="text-center text-6xl font-bold">{meta.title}</h1>
      <div className="container">
        <div className="prose mx-auto dark:prose-invert lg:prose-lg">
          <MDXRemote
            {...source}
            components={{
              pre: SyntaxHighlighter,
              a: ExternalLink,
            }}
          />
        </div>
      </div>
    </Main>
  );
}

export async function getStaticProps({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) {
  if (!params?.slug)
    return {
      props: {},
      notFound: true,
    };
  // MDX text - can be from a local file, database, anywhere
  const {
    meta,
    content: source,
    slug,
  } = getBySlug<BlogMetadata>(params.slug, "blog");
  const mdxSource = await serialize(source);
  return {
    props: {
      source: mdxSource,
      meta,
      slug,
    },
  };
}
export async function getStaticPaths() {
  const slugs = getSlugs("blog");
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false, // can also be true or 'blocking'
  };
}
