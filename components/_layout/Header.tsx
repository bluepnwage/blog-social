import Link from "next/link";
import { Image, Anchor, Group, Text, Avatar } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";

const Menu = lazy(() => import("./Menu"));

export default function Header() {
  const { classes, cx } = useStyles();
  return (
    <>
      <header className={cx("section-container", classes.navbar)}>
        <nav className={cx("container", classes.flex, classes.navContainer)}>
          <Group>
            <Image src={"/logo-icon.svg"} imageProps={{ loading: "lazy" }} height={48} width={48} alt={"Logo"} />
            <Text className={classes.logo}>Blog Social</Text>
          </Group>
          <Group className={classes.mobile}>
            <Link passHref href={"/"}>
              <Anchor className={classes.navLinks} weight={600}>
                Home
              </Anchor>
            </Link>
            <Link passHref href={"/blogs"}>
              <Anchor className={classes.navLinks} weight={600}>
                Blogs
              </Anchor>
            </Link>
          </Group>
          <Group className={classes.mobile} spacing={"lg"}>
            <Suspense fallback={<Avatar src={"bluepnwage.jpg"} radius={"xl"} size={"xs"} />}>
              <Menu />
            </Suspense>
          </Group>
        </nav>
      </header>
    </>
  );
}
