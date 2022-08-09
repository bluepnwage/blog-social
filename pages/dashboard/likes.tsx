import { Blog, User } from "@interfaces/supabase";
import { supabaseServerClient, withPageAuth, getUser } from "@supabase/auth-helpers-nextjs";
import { Layout } from "@components/dashboard";
import { LikedList } from "@components/dashboard/likes-page/LikedList";

interface PropTypes {
  blogs: Blog[];
}

export default function Likes({ blogs }: PropTypes) {
  return (
    <Layout>
      <LikedList blogs={blogs} />
    </Layout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user } = await getUser(context);
    const { data } = await supabaseServerClient(context)
      .from<User>("profiles")
      .select("likes")
      .eq("id", user.id)
      .single();

    if (!data.likes) {
      return {
        props: {
          blogs: []
        }
      };
    }
    const blogs = data.likes.map(async (id) => {
      return await supabaseServerClient(context).from<Blog>("blogs").select("*").eq("id", id).single();
    });
    const likedBlogs = await Promise.all(blogs);
    return {
      props: {
        blogs: likedBlogs.map((blog) => blog.data)
      }
    };
  }
});
