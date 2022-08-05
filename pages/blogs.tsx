import { Filters, BlogList } from "components/blogs";
import { GetStaticProps } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@interfaces/supabase";

interface PropTypes {
  blogs: Blog[];
}

export default function Blogs({ blogs }: PropTypes) {
  return (
    <>
      <section className={"section-container"}>
        <Filters />
        <BlogList blogs={blogs} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: blogs } = await supabaseClient.from<Blog>("blogs").select("*").limit(10);
  return {
    props: {
      blogs
    }
  };
};
