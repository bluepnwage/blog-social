import { BlogList } from "components/blogs";
import { GetStaticProps } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { BlogJoin } from "@interfaces/supabase";
import Head from "next/head"
interface PropTypes {
  blogs: BlogJoin[];
}

export default function Blogs({ blogs }: PropTypes) {
  return (
    <>
    <Head>
      <title>Blog Social | Blogs</title>
    </Head>
      <section className={"section-container"}>
        <BlogList blogs={blogs} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: blogs } = await supabaseClient
    .from<BlogJoin>("blogs")
    .select("*, profiles(*)")
    .eq("published", true)
    .limit(10);
  return {
    props: {
      blogs
    }
  };
};
