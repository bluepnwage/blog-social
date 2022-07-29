import { Title } from "@mantine/core";
import { Layout } from "@components/dashboard";
import { UpdateProfile } from "@components/dashboard/profile-page/updateProfile/UpdateProfile";
import { getUser, withPageAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";

interface User {
  email: string;
  website: string;
  id: string;
  bio: string;
  twitter: string;
  github: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  access_token: string;
  user: any;
}

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
    const { user: currentUser } = await getUser(context);
    const { data } = await supabaseServerClient(context)
      .from("profiles")
      .select("first_name, last_name, twitter, github, bio, website, city, country")
      .single();
    const { access_token, user, ...userData } = data;
    return {
      props: {
        ...userData,
        email: currentUser.email,
        id: currentUser.id
      }
    };
  }
});
