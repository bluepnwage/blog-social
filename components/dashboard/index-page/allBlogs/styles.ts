import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  table: {
    backgroundColor: checkTheme(theme, theme.white, theme.colors.dark[7]),
    border: `1px solid ${checkTheme(theme, theme.colors.gray[3], theme.colors.dark[4])}`,
    marginBottom: theme.spacing.xl * 1.5
  },
  btn: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    "&:hover": {
      backgroundColor: checkTheme(theme, theme.colors.gray[2], theme.colors.dark[4])
    }
  },
  th: {
    padding: "0 !important"
  },
  input: {
    width: "50%"
  }
}));
