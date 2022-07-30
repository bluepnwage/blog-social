import dynamic from "next/dynamic";
import { Layout } from "@components/dashboard";
import { EditorLoading } from "@components/dashboard/blogEditor-page/EditorLoading";
import { withPageAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";

const EditorContainer = dynamic(() => import("@components/dashboard/blogEditor-page/EditorContainer"), {
  ssr: false,
  loading: () => <EditorLoading />
});

interface PropTypes {
  blog: Blog;
}

export default function BlogProject({ blog }: PropTypes) {
  return (
    <>
      <Layout>
        <EditorContainer {...blog} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    console.log(context.params);
    const { user } = await getUser(context);
    const { body, error } = await supabaseServerClient(context)
      .from<Blog>("blogs")
      .select("*")
      .eq("author_id", user.id)
      .eq("id", parseInt(context.params.slug as string))
      .single();
    if (error) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        blog: body
      }
    };
  }
});

export interface Blog {
  id: number;
  created_at: string;
  title: string;
  heading: string;
  content: string;
  description: string;
  thumbnail: string;
  updated_at: string;
  author_id: string;
  published: string;
}
