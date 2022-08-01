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
          Welcome Back {name}
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
    const [blogData, { body: user }] = await Promise.all([
      await supabaseServerClient(context).from<Blog>("blogs").select("*").eq("author_id", userID.id),
      await supabaseServerClient(context).from<User>("profiles").select("first_name").single()
    ]);

    return {
      props: {
        count: blogData.body.length,
        blogs: blogData.body,
        name: user.first_name
      }
    };
  }
});
