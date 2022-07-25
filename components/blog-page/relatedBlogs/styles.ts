import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    width: "60%",
    [theme.fn.smallerThan("sm")]: {
      width: "90%"
    }
  },
  sectionContainer: {
    paddingBottom: theme.spacing.xl * 2.5
  },
  imageContainer: {
    aspectRatio: "16/ 9",
    flex: "1 1 100%",
    overflow: "hidden",
    borderRadius: theme.radius.md
  },
  articleContainer: {
    display: "flex",
    gap: theme.spacing.md,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse"
    }
  }
}));
