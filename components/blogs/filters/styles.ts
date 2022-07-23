import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  flex: {
    display: "flex"
  },
  filterContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl * 1.5
  }
}));
