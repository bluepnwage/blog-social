import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import { useStyles } from "./styles";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  return (
    <ActionIcon
      variant="outline"
      aria-label={colorScheme === "light" ? "Dark mode" : "Light mode"}
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === "dark" ? <Sun className={classes.sunIcon} /> : <MoonStars className={classes.moonIcon} />}
    </ActionIcon>
  );
}
