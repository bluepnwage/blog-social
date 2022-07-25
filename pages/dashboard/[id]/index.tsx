import { Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { Layout } from "components/dashboard";
import { StatList, AllBlogs } from "@components/dashboard/index-page";

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Title mb={"xl"} order={1}>
          Welcome Back Agis
        </Title>
        <StatList />
        <AllBlogs />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      test: ""
    }
  };
};
