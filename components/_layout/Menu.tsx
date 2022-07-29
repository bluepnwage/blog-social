import { Menu as MantineMenu, Avatar, useMantineColorScheme } from "@mantine/core";
import { useStyles } from "./styles";
import { User, Logout, Sun, Moon } from "tabler-icons-react";
import { checkTheme } from "util/theme";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { memo } from "react";

function Menu() {
  const { classes, theme } = useStyles();
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, handler] = useDisclosure(false);
  const ref = useClickOutside(handler.close);

  const icon = checkTheme(
    theme,
    <Moon size={16} color={theme.colors.blue[4]} />,
    <Sun size={16} color={theme.colors.yellow[4]} />
  );

  const logOut = async () => {
    await fetch("/api/auth/logout");
    location.reload();
  };

  return (
    <>
      <MantineMenu opened={opened} onOpen={handler.open} onClose={handler.close}>
        <MantineMenu.Target>
          <Avatar
            className={classes.menuControl}
            src={"/bluepnwage.jpg"}
            radius={"xl"}
            imageProps={{ loading: "lazy" }}
          />
        </MantineMenu.Target>
        <MantineMenu.Dropdown>
          <div ref={ref}>
            <MantineMenu.Label>Profile</MantineMenu.Label>
            <MantineMenu.Item component={NextLink} href={"/dashboard/bluepnwage"} icon={<User size={16} />}>
              Dashboard
            </MantineMenu.Item>
            <MantineMenu.Item closeMenuOnClick={false} onClick={() => toggleColorScheme()} icon={icon}>
              Change theme
            </MantineMenu.Item>
            <MantineMenu.Item
              onClick={() => logOut()}
              icon={<Logout color={checkTheme(theme, theme.colors.red[7], theme.colors.red[4])} size={16} />}
            >
              Sign out
            </MantineMenu.Item>
          </div>
        </MantineMenu.Dropdown>
      </MantineMenu>
    </>
  );
}

export default memo(Menu);
