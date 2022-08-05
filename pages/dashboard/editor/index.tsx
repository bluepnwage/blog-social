import { Layout } from "@components/dashboard";
import { BlogList } from "@components/dashboard/editor-page/BlogList";
import { Blog } from "@interfaces/supabase";
import { supabaseServerClient, withPageAuth } from "@supabase/auth-helpers-nextjs";

interface PropTypes {
  blogs: Blog[];
}

export default function Editor({ blogs }: PropTypes) {
  return (
    <>
      <Layout>
        <BlogList blogs={blogs} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { data: blogs } = await supabaseServerClient(context).from<Blog>("blogs").select("*");
    return {
      props: {
        blogs
      }
    };
  }
});