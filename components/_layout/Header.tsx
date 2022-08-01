import Link from "next/link";
import Menu from "./Menu";
import { Image, Anchor, Group, Text, Button } from "@mantine/core";
import { useStyles } from "./styles";
import { useUser } from "@supabase/auth-helpers-react";
import { Suspense } from "react";

export default function Header() {
  const { user } = useUser();
  const { classes, cx } = useStyles();
  return (
    <>
      <header className={cx("section-container", classes.navbar)}>
        <nav className={cx("container", classes.flex, classes.navContainer)}>
          <Group spacing={5} mr={-100}>
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
            {!user && (
              <Link href={"/signin"} passHref>
                <Button component="a" variant="outline">
                  Sign in
                </Button>
              </Link>
            )}
            <Suspense fallback={<p>Loading...</p>}>{user && <Menu />}</Suspense>
          </Group>
        </nav>
      </header>
    </>
  );
}
