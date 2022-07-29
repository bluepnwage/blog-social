import "../styles/globals.css";
import Layout from "components/_layout/Layout";
import Head from "next/head";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog Social</title>
        <meta name="description" content="Platform for sharing your blogs with the world." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider supabaseClient={supabaseClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}

export default MyApp;
