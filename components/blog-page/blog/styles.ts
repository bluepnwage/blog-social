import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  container: {
    width: "60%",
    [theme.fn.smallerThan("sm")]: {
      width: "90%"
    }
  },
  imageContainer: {
    aspectRatio: "16 / 9",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
    overflow: "hidden"
  },
  article: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl
  },
  authorContainer: {
    justifyContent: "space-between",
    [theme.fn.smallerThan("sm")]: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column"
    }
  },
  authorWrapper: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  },
  dimmedText: {
    color: checkTheme(theme, theme.colors.gray[7], theme.colors.dark[2])
  },
  likedHeart: {
    fill: theme.colors.red[7]
  }
}));
