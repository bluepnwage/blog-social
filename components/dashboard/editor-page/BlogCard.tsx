import Link from "next/link";
import { Card, Text, ActionIcon, Group, Stack } from "@mantine/core";
import { Trash, FilePencil } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Blog } from "pages/dashboard/[id]/editor/[slug]";

interface PropTypes {
  blog: Blog;
  onDelete: (id: number) => Promise<void>;
}

export function BlogCard({ blog, onDelete }: PropTypes) {
  const { classes, cx } = useStyles();
  const date = new Date(blog.created_at).toLocaleDateString();

  return (
    <>
      <Card className={cx(classes.blogCard, classes.flex)}>
        <Group position="apart">
          <Stack spacing={0}>
            <Text component="strong">{blog.title}</Text>
            <Text component="span" color={"dimmed"}>
              Blog id: {blog.id}
            </Text>
          </Stack>
          <ActionIcon
            component="button"
            onClick={() => onDelete(blog.id)}
            variant="light"
            aria-label="Delete blog"
            size={"lg"}
            radius={"xl"}
            color={"red"}
          >
            <Trash />
          </ActionIcon>
        </Group>
        <Group position="apart">
          <Link href={`/dashboard/bluepnwage/editor/${blog.id}`} passHref>
            <ActionIcon component="a" color={"blue"} variant="light" size={"lg"} radius={"xl"}>
              <FilePencil />
            </ActionIcon>
          </Link>
          <Text component="time">{date}</Text>
        </Group>
      </Card>
    </>
  );
}
