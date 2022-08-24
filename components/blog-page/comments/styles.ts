import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  container: {
    width: "60%",
    marginBottom: theme.spacing.xl * 1.5,
    [theme.fn.smallerThan("sm")]: {
      width: "90%"
    }
  },
  textAreaContainer: {
    alignItems: "flex-end"
  },
  flexGrow: {
    flexGrow: 1
  },
  textArea: {
    width: "100%"
  },
  dimmedText: {
    color: checkTheme(theme, theme.colors.gray[7], theme.colors.dark[2])
  },
  commentContainer: {
    alignItems: "flex-start"
  }
}));
