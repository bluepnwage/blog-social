import { Title } from "@mantine/core";
import { Layout } from "@components/dashboard";
import { UpdateProfile } from "@components/dashboard/profile-page/updateProfile/UpdateProfile";
import { getUser, withPageAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";

interface User {
  email: string;
  website: string;
}

export default function Profile({ email, website }: User) {
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Edit your profile
        </Title>
        <UpdateProfile email={email} website={website} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(context) {
    const { user } = await getUser(context);
    const { data } = await supabaseServerClient(context).from("profiles").select("website").single();
    console.log("This is the data", data.website);
    return {
      props: {
        email: user.email,
        website: data.website
      }
    };
  }
});
