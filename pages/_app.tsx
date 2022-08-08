import "../styles/globals.css";
import Layout from "components/_layout/Layout";
import Head from "next/head";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { ColorScheme } from "@mantine/core";

function MyApp({ Component, pageProps, colorScheme }: AppProps & { colorScheme: ColorScheme }) {
  return (
    <>
      <Head>
        <title>Blog Social</title>
        <meta name="description" content="Platform for sharing your blogs with the world." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider supabaseClient={supabaseClient}>
        <Layout colorScheme={colorScheme}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light"
});

export default MyApp;
