import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  cardTitle: {
    backgroundColor: checkTheme(theme, theme.white, theme.colors.dark[4]),
    marginBottom: theme.spacing.xs,
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`
  },
  card: {
    backgroundColor: checkTheme(theme, theme.colors.gray[0], ""),
    boxShadow: checkTheme(theme, theme.shadows.md, ""),
    marginBottom: theme.spacing.lg,
    position: "relative"
  }
}));
