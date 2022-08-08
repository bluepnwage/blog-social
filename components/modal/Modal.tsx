import { Avatar, Card, Text, ActionIcon, Group, Stack, Anchor, Divider } from "@mantine/core";
import { BrandTwitter, BrandGithub, X } from "tabler-icons-react";
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
          src={user.avatar_url}
          imageProps={{ loading: "lazy" }}
          alt={"User profile picture"}
        />
        <Text size={"xl"}>
          {user.first_name} {user.last_name}
        </Text>
        <Group>
          <ActionIcon
            target={"_blank"}
            component="a"
            href={`https://twitter.com/${user.twitter}`}
            aria-label="View profile on Twitter"
            className={classes.icon}
          >
            <BrandTwitter />
          </ActionIcon>
          <ActionIcon
            target={"_blank"}
            component="a"
            href={`https://github.com/${user.github}`}
            aria-label="View profile on Github"
            className={classes.icon}
          >
            <BrandGithub />
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
          <Text component="strong">Personal website:</Text>
          <Anchor title={"Link to personal website"} href={user.website} target={"_blank"}>
            {user.website}
          </Anchor>
        </Stack>
        <Stack>
          <Group position="apart">
            <Stack spacing={"xs"}>
              <Text component="strong">Country:</Text>
              <Text>{user.country}</Text>
            </Stack>
            <Stack spacing={"xs"}>
              <Text component="strong">City:</Text>
              <Text>{user.city}</Text>
            </Stack>
          </Group>
        </Stack>
        <Stack>
          <Text component="strong">Occupation:</Text>
          <Text>{user.occupation}</Text>
        </Stack>
      </div>
    </Card>
  );
}
