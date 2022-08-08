import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  container: {
    width: "80%",
    marginBottom: theme.spacing.xl * 1.5
  },
  imageContainer: {
    aspectRatio: "16 / 9",
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    flex: "1 1 45%",
    borderRadius: theme.radius.md
  },
  blogContainer: {
    display: "flex",
    gap: theme.spacing.md
  },
  articleContainer: {
    flex: "1 1 45%"
  },
  dimmedText: {
    color: checkTheme(theme, theme.colors.gray[7], theme.colors.dark[2])
  },
  selectInput: {
    width: "25%"
  }
}));
