import { Avatar, Card, Text, ActionIcon, Group, Stack, Anchor, Divider } from "@mantine/core";
import { BrandTwitch, BrandTwitter, BrandLinkedin, X } from "tabler-icons-react";
import { useClickOutside } from "@mantine/hooks";
import { useStyles } from "./styles";

interface PropTypes {
  onClose: () => void;
  styles: any;
}

export function Modal({ onClose, styles }: PropTypes) {
  const ref = useClickOutside(onClose);
  const { classes, cx } = useStyles();
  return (
    <Card style={styles.modal} ref={ref} p={0} className={cx(classes.flex, classes.card)}>
      <div className={cx(classes.gradientContainer, classes.flex)}>
        <Avatar
          size={"xl"}
          radius={50}
          src={"/bluepnwage.jpg"}
          imageProps={{ loading: "lazy" }}
          alt={"User profile picture"}
        />
        <Text size={"xl"}>Agis Carty</Text>
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
            <ActionIcon onClick={onClose}>
              <X />
            </ActionIcon>
          </Group>
          <Divider mt={"xs"} mb={"md"} />
        </Stack>
        <Stack spacing={"xs"}>
          <Text component="strong">Personal website</Text>
          <Anchor
            title={"Link to portfolio website"}
            href={"https://portfolio-bluepnwage.vercel.app/"}
            target={"_blank"}
          >
            https://portfolio-bluepnwage.vercel.app/
          </Anchor>
        </Stack>
        <Stack>
          <Group position="apart">
            <Stack spacing={"xs"}>
              <Text component="strong">Country</Text>
              <Text>Saint Martin</Text>
            </Stack>
            <Stack spacing={"xs"}>
              <Text component="strong">City</Text>
              <Text>Marigot</Text>
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
