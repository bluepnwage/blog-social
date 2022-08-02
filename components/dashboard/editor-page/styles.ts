import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
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
    marginBottom: theme.spacing.xl * 2
  },
  blogCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 275
  },
  deleteBlogHeader: {
    margin: 0
  }
}));
