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
  image: string;
}

export default function BlogProject({ blog, image }: PropTypes) {
  const thumbnail = image ? URL.createObjectURL(JSON.parse(image)) : "";
  return (
    <>
      <Layout>
        <EditorContainer blog={blog} image={thumbnail} />
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
      .eq("id", parseInt(context.params.slug as string))
      .single();
    console.log("hello", body.heading);
    const thumbnailKey = body.thumbnail.slice(4);
    const { data, error: imgError } = await supabaseServerClient(context).storage.from("img").download(thumbnailKey);

    if (error) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        blog: body,
        thumbnail: imgError ? "" : JSON.stringify(data)
      }
    };
  }
});
