import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    width: "25%"
  },
  flex: {
    display: "flex"
  },
  createBlog: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    minHeight: 250
  },
  grid: {
    width: "90%"
  },
  blogCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 250
  }
}));
