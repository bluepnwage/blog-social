import { Title } from "@mantine/core";
import { Layout } from "@components/dashboard";
import { UpdateProfile } from "@components/dashboard/profile-page/updateProfile/UpdateProfile";

export default function Profile() {
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Edit your profile
        </Title>
        <UpdateProfile />
      </Layout>
    </>
  );
}
