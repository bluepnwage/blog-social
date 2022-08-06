import { Avatar, Card, Text, ActionIcon, Group, Stack, Anchor, Divider } from "@mantine/core";
import { BrandTwitch, BrandTwitter, BrandLinkedin, X } from "tabler-icons-react";
import { useStyles } from "./styles";
import { User } from "@interfaces/supabase";

interface PropTypes {
  onClose: () => void;
  user: User;
}

export function Modal({ onClose, user }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <Card p={0} className={cx(classes.flex)}>
      <div className={cx(classes.gradientContainer, classes.flex)}>
        <Avatar
          size={"xl"}
          radius={50}
          src={user?.avatar_url}
          imageProps={{ loading: "lazy" }}
          alt={"User profile picture"}
        />
        <Text size={"xl"}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Group>
          <ActionIcon className={classes.icon}>
            <BrandTwitter />
          </ActionIcon>
          <ActionIcon className={classes.icon}>
            <BrandTwitch />
          </ActionIcon>
          <ActionIcon className={classes.icon}>
            <BrandLinkedin />
          </ActionIcon>
        </Group>
      </div>
      <div className={cx(classes.informationContainer, classes.flex)}>
        <Stack spacing={0}>
          <Group position="apart">
            <Text>User profile</Text>
            <ActionIcon title="Close modal" onClick={onClose}>
              <X />
            </ActionIcon>
          </Group>
          <Divider mt={"xs"} mb={"md"} />
        </Stack>
        <Stack spacing={"xs"}>
          <Text component="strong">Personal website</Text>
          <Anchor title={"Link to portfolio website"} href={user?.website} target={"_blank"}>
            {user?.website}
          </Anchor>
        </Stack>
        <Stack>
          <Group position="apart">
            <Stack spacing={"xs"}>
              <Text component="strong">Country</Text>
              <Text>{user?.country}</Text>
            </Stack>
            <Stack spacing={"xs"}>
              <Text component="strong">City</Text>
              <Text>{user?.city}</Text>
            </Stack>
          </Group>
        </Stack>
        <Stack spacing={0}>
          <Text>Blog stats</Text>
          <Divider mt={"xs"} mb={"md"} />
        </Stack>
        <Text component="strong">
          Blogs: <Text component="span">23</Text>
        </Text>
        <Text>#2 most popular blogger</Text>
      </div>
    </Card>
  );
}
