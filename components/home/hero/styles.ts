import { createStyles } from "@mantine/core";
import { checkTheme } from "util/theme";

export const useStyles = createStyles((theme) => ({
  heroContainer: {
    height: "calc(80vh )",
    position: "relative",
    justifyContent: "center",
    backgroundColor: theme.other.mainBG,
    color: theme.colors.dark[7],
    marginBottom: theme.spacing.xl
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    alignItems: "center"
  },
  imageContainer: {
    flex: "1 1 45%",
    [theme.fn.smallerThan("md")]: {
      display: "none"
    }
  },
  descriptionContainer: {
    flex: "1 1 45%"
  },
  shapeFill: {
    fill: checkTheme(theme, theme.colors.gray[0], theme.colors.dark[8]),
    transition: "all 250ms ease-out"
  },
  btn: {
    backgroundColor: theme.other.primaryColor,
    color: theme.white
  }
}));
