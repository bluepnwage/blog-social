import { createStyles } from "@mantine/core";

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
  }
}));
