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
  inner: {
    padding: 0
  },
  card: {
    width: "40%"
  },
  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`
  },
  overlay: {
    height: "100vh",
    top: 0,
    left: 0,
    width: "100vw",
    position: "fixed",
    backgroundColor: theme.fn.rgba(theme.black, 0.7),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 250
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
