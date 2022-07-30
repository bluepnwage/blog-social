import { Title } from "@mantine/core";
import { Layout } from "components/dashboard";
import { StatList, AllBlogs } from "@components/dashboard/index-page";
import { withPageAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";

interface PropTypes {
  count: number;
  blogs: any[];
  name: string;
}
export default function Dashboard({ count, blogs, name }: PropTypes) {
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Welcome Back {name}
        </Title>
        <StatList count={count} />
        <AllBlogs blogs={blogs} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const [{ body: blogs, count: blogCount }, { body: user }] = await Promise.all([
      await supabaseServerClient(context).from("blogs").select("*"),
      await supabaseServerClient(context).from<{ first_name: string }>("profiles").select("first_name").single()
    ]);
    const count = blogCount || 0;
    return {
      props: {
        count,
        blogs,
        name: user.first_name
      }
    };
  }
});
