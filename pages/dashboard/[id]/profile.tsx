import { Title } from "@mantine/core";
import { Layout } from "@components/dashboard";
import { UpdateProfile } from "@components/dashboard/profile-page/updateProfile/UpdateProfile";
import { withPageAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@interfaces/supabase";

export default function Profile(props: User) {
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Edit your profile
        </Title>
        <UpdateProfile {...props} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { data } = await supabaseServerClient(context).from<User>("profiles").select("*").single();

    return {
      props: {
        ...data
      }
    };
  }
});
