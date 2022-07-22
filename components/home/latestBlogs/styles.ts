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
    boxShadow: checkTheme(theme, theme.shadows.md, "")
  },
  grid: {
    rowGap: theme.spacing.xl * 2.5,
    columnGap: theme.spacing.xl
  }
}));
