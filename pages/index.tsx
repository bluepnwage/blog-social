import { Hero, FeaturedList, LatestBlogs } from "components/home";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetStaticProps } from "next";
import { Blog } from "@interfaces/supabase";

interface PropTypes {
  featuredBlogs: Blog[];
  latestBlogs: Blog[];
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
  const { data, error } = await supabaseClient
    .from<Blog>("blogs")
    .select("*")
    .eq("published", true)
    .order("likes", { ascending: false })
    .limit(1);
  const { data: latestBlogs, error: latestError } = await supabaseClient
    .from<Blog>("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return {
    props: {
      featuredBlogs: data,
      latestBlogs
    }
  };
};
