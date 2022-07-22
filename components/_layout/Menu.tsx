import { Menu as MantineMenu, Avatar, useMantineColorScheme } from "@mantine/core";
import { useStyles } from "./styles";
import { User, Logout, Sun, Moon } from "tabler-icons-react";
import { useState } from "react";
import { checkTheme } from "util/theme";

export default function Menu() {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();

  const handler = {
    off() {
      setOpened(false);
    },
    on() {
      setOpened(true);
    },
    toggle() {
      setOpened((prev) => !prev);
    }
  };

  const icon = checkTheme(
    theme,
    <Moon size={16} color={theme.colors.blue[4]} />,
    <Sun size={16} color={theme.colors.yellow[4]} />
  );

  return (
    <>
      <MantineMenu
        opened={opened}
        onOpen={handler.on}
        onClose={handler.off}
        closeOnItemClick={false}
        control={
          <Avatar
            className={classes.menuControl}
            src={"/bluepnwage.jpg"}
            radius={"xl"}
            imageProps={{ loading: "lazy" }}
          />
        }
      >
        <MantineMenu.Label>Profile</MantineMenu.Label>
        <MantineMenu.Item icon={<User size={16} />}>Dashboard</MantineMenu.Item>
        <MantineMenu.Item onClick={() => toggleColorScheme()} icon={icon}>
          Change theme
        </MantineMenu.Item>
        <MantineMenu.Item
          icon={<Logout color={checkTheme(theme, theme.colors.red[7], theme.colors.red[4])} size={16} />}
        >
          Sign out
        </MantineMenu.Item>
      </MantineMenu>
    </>
  );
}
