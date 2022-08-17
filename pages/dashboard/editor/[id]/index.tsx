import dynamic from "next/dynamic";
import { Layout } from "@components/dashboard";
import { EditorLoading } from "@components/dashboard/blogEditor-page/EditorLoading";
import { withPageAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { Blog, BlogJoin, User } from "@interfaces/supabase";

const EditorContainer = dynamic(() => import("@components/dashboard/blogEditor-page/EditorContainer"), {
  ssr: false,
  loading: () => <EditorLoading />
});

interface PropTypes {
  blog: Blog;
  profiles: User;
}

export default function BlogProject({ blog, profiles }: PropTypes) {
  return (
    <>
      <Layout>
        <EditorContainer blog={blog} user={profiles} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user: userData } = await getUser(context);
    const { body, error } = await supabaseServerClient(context)
      .from<BlogJoin>("blogs")
      .select("*, profiles(*)")
      .eq("author_id", userData.id)
      .eq("id", parseInt(context.params.id as string))
      .single();

    if (error) {
      return {
        notFound: true
      };
    }

    const { profiles, ...blog } = body;
    console.log(blog);
    return {
      props: {
        blog: blog,
        profiles
      }
    };
  }
});
