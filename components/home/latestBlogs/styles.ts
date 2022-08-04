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
    boxShadow: checkTheme(theme, theme.shadows.md, ""),
    justifyContent: "stretch"
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
  }
}));
