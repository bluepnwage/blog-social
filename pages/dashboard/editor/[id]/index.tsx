import dynamic from "next/dynamic";
import { Layout } from "@components/dashboard";
import { EditorLoading } from "@components/dashboard/blogEditor-page/EditorLoading";
import { withPageAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@interfaces/supabase";

const EditorContainer = dynamic(() => import("@components/dashboard/blogEditor-page/EditorContainer"), {
  ssr: false,
  loading: () => <EditorLoading />
});

interface PropTypes {
  blog: Blog;
  userID: string;
}

export default function BlogProject({ blog, userID }: PropTypes) {
  return (
    <>
      <Layout>
        <EditorContainer blog={blog} userID={userID} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user } = await getUser(context);
    const { body, error } = await supabaseServerClient(context)
      .from<Blog>("blogs")
      .select("*")
      .eq("author_id", user.id)
      .eq("id", parseInt(context.params.id as string))
      .single();

    if (error) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        blog: body,
        userID: user.id
      }
    };
  }
});
