import { Title } from "@mantine/core";
import { Layout } from "components/dashboard";
import { StatList, AllBlogs } from "@components/dashboard/index-page";
import { withPageAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { Blog, User } from "@interfaces/supabase";

interface PropTypes {
  count: number;
  blogs: Blog[];
  name: string;
}
export default function Dashboard({ count, blogs, name }: PropTypes) {
  const totalLikes = blogs.reduce((a, c) => {
    return a + c.likes;
  }, 0);
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          {name ? `Welcome back ${name}` : "Welcome to your dashboard"}
        </Title>
        <StatList count={count} likes={totalLikes} />
        <AllBlogs blogs={blogs} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user: userID } = await getUser(context);
    const [blogData, { body: user, error }] = await Promise.all([
      supabaseServerClient(context).from<Blog>("blogs").select("*").eq("author_id", userID.id),
      supabaseServerClient(context).from<User>("profiles").select("first_name").eq("id", userID.id).single()
    ]);
    if (error) {
      const { data } = await supabaseServerClient(context)
        .from<User>("profiles")
        .insert([{ id: userID.id }]);
      const [user] = data;
      return {
        props: {
          count: 0,
          blogs: [],
          name: user.first_name
        }
      };
    }

    return {
      props: {
        count: blogData.body.length,
        blogs: blogData.body,
        name: user.first_name
      }
    };
  }
});
