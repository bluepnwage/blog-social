import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";
export const useStyles = createStyles((theme) => ({
  imageContainer: {
    aspectRatio: "16 / 9",
    flex: "1 1 45%",
    overflow: "hidden",
    borderRadius: theme.radius.md
  },
  blogContainer: {
    display: "flex",
    gap: theme.spacing.md,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column"
    }
  },
  descriptionContainer: {
    flex: "1 1 50%"
  },
  container: {
    marginBottom: theme.spacing.xl * 2.5
  },
  dimmedText: {
    color: checkTheme(theme, theme.colors.gray[7], theme.colors.dark[2])
  },
  carousel: {
    height: 300,
    width: "80%",
    [theme.fn.smallerThan("sm")]: {
      height: 500
    }
  }
}));
