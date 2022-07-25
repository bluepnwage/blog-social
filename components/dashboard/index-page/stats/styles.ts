import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  flex: {
    display: "flex"
  },
  iconContainer: {
    justifyContent: "flex-end"
  },
  statAmountContainer: {
    justifyContent: "center"
  },
  grid: {
    marginBottom: theme.spacing.xl * 2.5
  }
}));
