import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  sectionContainer: {
    justifyContent: "flex-end",
    paddingTop: theme.spacing.xl
  },
  flex: {
    display: "flex"
  },
  container: {
    width: "80%"
  },
  navbar: {
    height: "100vh"
  }
}));
