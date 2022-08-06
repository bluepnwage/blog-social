import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  gradientContainer: {
    flex: "1 1 40%",
    background: theme.fn.gradient(),
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: theme.white,
    gap: theme.spacing.md
  },
  flex: {
    display: "flex"
  },
  informationContainer: {
    flex: "1 1 60%",
    padding: theme.spacing.md,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: theme.spacing.md
  },

  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`
  },

  icon: {
    color: theme.white
  },
  btn: {
    display: "block",
    "&:disabled": {
      cursor: "not-allowed"
    }
  }
}));
