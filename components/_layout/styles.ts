import { createStyles } from "@mantine/core";
import { checkTheme } from "util/theme";

export const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    transition: "all 250ms ease-out"
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column"
    }
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md
    }
  },
  navContainer: {
    justifyContent: "space-between"
  },
  flex: {
    display: "flex"
  },
  navbar: {
    backgroundColor: checkTheme(theme, theme.white, theme.colors.dark[7]),
    borderBottom: ` 1px solid ${checkTheme(theme, theme.colors.gray[3], theme.colors.dark[4])}`,
    height: 70,
    justifyContent: "center",
    position: "sticky",
    top: 0,
    left: 0,
    transition: "all 250ms ease-out",
    zIndex: 300
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
  },
  menuControl: {
    cursor: "pointer"
  },
  navLinks: {
    color: checkTheme(theme, theme.colors.dark[7], theme.colors.dark[1]),
    "&:hover": {
      color: checkTheme(theme, theme.colors.blue[6], theme.colors.blue[4])
    }
  },
  sunIcon: {
    color: theme.colors.yellow[4]
  },
  moonIcon: {
    color: theme.colors.cyan[7]
  }
}));
