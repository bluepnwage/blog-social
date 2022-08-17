import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    marginBottom: theme.spacing.xl * 2,
    position: "relative"
  },

  flex: {
    display: "flex"
  },
  icon: {
    color: checkTheme(theme, theme.colors.blue[6], theme.colors.blue[4])
  },
  card: {
    boxShadow: checkTheme(theme, theme.shadows.md, ""),
    width: "50%"
  },
  imageContainer: {
    aspectRatio: " 16 / 9",
    marginBottom: theme.spacing.sm,
    overflow: "hidden"
  },
  previewTab: {
    justifyContent: "center"
  },
  imagePreviewContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: theme.radius.md
  },
  loader: {
    position: "fixed",
    bottom: 30,
    right: 50
  },
  successIcon: {
    color: checkTheme(theme, theme.colors.green[7], theme.colors.green[4])
  },
  badgeContainer: {
    marginBottom: theme.spacing.sm
  }
}));
