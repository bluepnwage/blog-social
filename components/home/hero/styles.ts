import { createStyles } from "@mantine/core";
import { checkTheme } from "util/theme";

export const useStyles = createStyles((theme) => ({
  heroContainer: {
    height: "85vh",
    color: theme.white,
    position: "relative",
    justifyContent: "center",
    backgroundColor: theme.colors.blue[9],
    marginBottom: theme.spacing.xl
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing.sm
  },
  imageContainer: {
    aspectRatio: "16 / 9",
    flex: "2 1 45%",
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },
  descriptionContainer: {
    flex: "1 1 45%"
  },
  shapeFill: {
    fill: checkTheme(theme, theme.colors.gray[0], theme.colors.dark[7]),
    transition: "all 250ms ease-out"
  }
}));
