import { createStyles } from "@mantine/core";
import { checkTheme } from "util/theme";

export const useStyles = createStyles((theme) => ({
  imageContainer: {
    aspectRatio: " 16 / 9",
    marginBottom: theme.spacing.sm
  },
  sectionContainer: {
    paddingBottom: theme.spacing.xl * 2.5
  },
  card: {
    boxShadow: checkTheme(theme, theme.shadows.md, ""),
    justifyContent: "stretch"
  },
  grid: {
    rowGap: theme.spacing.xl * 2.5,
    columnGap: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 2.5,
    flex: "1 1 75%"
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
  flex: {
    display: "flex"
  },
  filterContainer: {
    flex: "1 1 25%",
    width: "80%"
  },
  badgeContainer: {
    marginBottom: theme.spacing.sm
  },
  container: {
    width: "90%",
    marginTop: theme.spacing.xl * 1.5
  },
  pointer: {
    cursor: "pointer"
  }
}));
