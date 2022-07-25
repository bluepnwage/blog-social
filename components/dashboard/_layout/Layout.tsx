import { ReactNode } from "react";
import { useStyles } from "./styles";
import { Navbar } from "@mantine/core";
import { NavLinks } from "./NavLinks";

interface PropTypes {
  children: ReactNode;
}

export function Layout({ children }: PropTypes) {
  const { classes, cx } = useStyles();

  return (
    <>
      <Navbar className={classes.navbar} fixed width={{ base: "15%" }}>
        <NavLinks />
      </Navbar>
      <section className={cx(classes.sectionContainer, classes.flex)}>
        <div className={classes.container}>{children}</div>
      </section>
      ;
    </>
  );
}
