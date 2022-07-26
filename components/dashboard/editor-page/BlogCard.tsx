import { Card, Text, ActionIcon, Group, Stack } from "@mantine/core";
import { Trash, FilePencil } from "tabler-icons-react";
import { useStyles } from "./styles";

export function BlogCard() {
  const { classes, cx } = useStyles();
  return (
    <>
      <Card className={cx(classes.blogCard, classes.flex)}>
        <Group position="apart">
          <Stack spacing={0}>
            <Text component="strong">My first Blog</Text>
            <Text component="span" color={"dimmed"}>
              blogid#4805u
            </Text>
          </Stack>
          <ActionIcon variant="light" size={"lg"} radius={"xl"} color={"red"}>
            <Trash />
          </ActionIcon>
        </Group>
        <Group position="apart">
          <ActionIcon color={"blue"} variant="light" size={"lg"} radius={"xl"}>
            <FilePencil />
          </ActionIcon>
          <Text component="time">Jul 21, 2022</Text>
        </Group>
      </Card>
    </>
  );
}
