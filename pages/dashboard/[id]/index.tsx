import { Title } from "@mantine/core";
import { Layout } from "components/dashboard";
import { StatList, AllBlogs } from "@components/dashboard/index-page";
import { withPageAuth, getUser } from "@supabase/auth-helpers-nextjs";

export default function Dashboard({ user }) {
  console.log(user);
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Welcome Back {user.email}
        </Title>
        <StatList />
        <AllBlogs />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user } = await getUser(context);
    return {
      props: {
        user
      }
    };
  }
});
