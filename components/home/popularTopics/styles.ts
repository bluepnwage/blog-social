import { createStyles } from "@mantine/core";
import { checkTheme } from "@util/theme";

export const useStyles = createStyles((theme) => ({
  tech: {
    backgroundColor: theme.colors.techBlue[1],
    color: theme.colors.techBlue[9],
    "&:hover": {
      boxShadow: `7px 7px 0px ${checkTheme(theme, theme.colors.techBlue[9], theme.colors.techBlue[3])}`,
      transform: "translate(-7px, -7px)"
    }
  },
  finance: {
    backgroundColor: theme.colors.businessGreen[1],
    color: theme.colors.businessGreen[9],
    "&:hover": {
      boxShadow: `7px 7px 0px ${checkTheme(theme, theme.colors.businessGreen[9], theme.colors.businessGreen[3])}`,
      transform: "translate(-7px, -7px)"
    }
  },
  education: {
    backgroundColor: theme.colors.educationPurple[1],
    color: theme.colors.educationPurple[9],
    "&:hover": {
      boxShadow: `7px 7px 0px ${checkTheme(theme, theme.colors.educationPurple[9], theme.colors.educationPurple[3])}`,
      transform: "translate(-7px, -7px)"
    }
  },
  image: {
    transform: "scale(0.7)"
  },
  card: {
    transition: "all 250ms ease-out",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer"
  }
}));
