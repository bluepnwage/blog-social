import { ReactNode } from "react";
import { useStyles } from "./styles";
import { Navbar } from "@mantine/core";
import { NavLinks } from "./NavLinks";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head"
interface PropTypes {
  children: ReactNode;
}

export function Layout({ children }: PropTypes) {
  const { classes, cx } = useStyles();

  return (
    <>
    <Head>
      <title>Blog Social | Dashboard</title>
    </Head>
      <NotificationsProvider position="top-right" zIndex={5000}>
        <Navbar className={classes.navbar} fixed width={{ base: "15%" }}>
          <NavLinks />
        </Navbar>
        <section className={cx(classes.sectionContainer, classes.flex)}>
          <div className={classes.container}>{children}</div>
        </section>
      </NotificationsProvider>
    </>
  );
}
