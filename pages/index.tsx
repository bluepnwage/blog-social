import { Hero, LatestBlogs } from "@components/home";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetStaticProps } from "next";
import { BlogJoin } from "@interfaces/supabase";
import FeaturedList from "@components/home/featuredBlogs/FeaturedList";

interface PropTypes {
  featuredBlogs: BlogJoin[];
  latestBlogs: BlogJoin[];
}

export default function Home({ featuredBlogs, latestBlogs }: PropTypes) {
  return (
    <>
      <Hero />
      <FeaturedList blogs={featuredBlogs} />
      <LatestBlogs blogs={latestBlogs} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: featuredBlogs }, { data: latestBlogs }] = await Promise.all([
    await supabaseClient
      .from<BlogJoin>("blogs")
      .select("*, profiles(*)")
      .eq("published", true)
      .order("likes", { ascending: false })
      .limit(3),
    await supabaseClient
      .from<BlogJoin>("blogs")
      .select("*, profiles(*)")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(10)
  ]);
  return {
    props: {
      featuredBlogs,
      latestBlogs
    }
  };
};
