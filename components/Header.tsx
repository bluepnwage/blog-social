import Link from "next/link";
import { createStyles, Image, Anchor, Group, Text, Button } from "@mantine/core";
import { checkTheme } from "util/theme";

const useStyles = createStyles((theme) => ({
  navContainer: {
    justifyContent: "space-between"
  },
  flex: {
    display: "flex"
  },
  navbar: {
    backgroundColor: checkTheme(theme, theme.white, theme.colors.dark[7]),
    borderBottom: checkTheme(theme, theme.colors.gray[4], theme.colors.dark[4]),
    height: 70,
    justifyContent: "center",
    position: "sticky",
    top: 0,
    left: 0,
    transition: "all 250ms ease-out",
    zIndex: 200
  },
  logo: {
    fontSize: theme.fontSizes.xl,
    weight: 900,
    fontFamily: "Segoe UI, sans-serif"
  },
  mobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  }
}));

interface PropTypes {
  onToggle: () => void;
}

export default function Header({ onToggle }: PropTypes) {
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
              <Anchor weight={600}>Home</Anchor>
            </Link>
            <Link passHref href={"/"}>
              <Anchor weight={600}>Blogs</Anchor>
            </Link>
          </Group>
          <Group className={classes.mobile}>
            <Text>Menu</Text>
            <Button onClick={onToggle} compact>
              Toggle Theme
            </Button>
          </Group>
        </nav>
      </header>
    </>
  );
}
