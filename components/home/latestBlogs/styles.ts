import { createStyles } from "@mantine/core";
import { checkTheme } from "util/theme";

export const useStyles = createStyles((theme) => ({
  imageContainer: {
    aspectRatio: "16 / 9",
    marginBottom: theme.spacing.xs
  },
  sectionContainer: {
    paddingBottom: theme.spacing.xl * 2.5
  },
  card: {
    transition: "all 250ms ease-out",
    justifyContent: "stretch",
    position: "relative",
    "&:hover": {
      boxShadow: `7px 7px 0px ${checkTheme(theme, theme.colors.primaryColor[7], theme.colors.primaryColor[3])}`,
      transform: `translate(-7px, -7px)`
    }
  },
  grid: {
    rowGap: theme.spacing.xl * 2.5,
    columnGap: theme.spacing.xl
  },
  dimmedText: {
    color: checkTheme(theme, theme.colors.gray[7], theme.colors.dark[2])
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  descriptionContainer: {
    justifyContent: "space-between",
    flexGrow: 1
  },
  badgeContainer: {
    marginBottom: theme.spacing.sm,
    justifyContent: "space-between",
    display: "flex"
  },
  title: {
    color: checkTheme(theme, theme.colors.dark[8], theme.colors.dark[1]),
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));
