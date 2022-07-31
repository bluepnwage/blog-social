import Link from "next/link";
import { Card, Text, ActionIcon, Group, Stack, Modal, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash, FilePencil } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Blog } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";

interface PropTypes {
  blog: Blog;
  onDelete: (id: number) => void;
}

export function BlogCard({ blog, onDelete }: PropTypes) {
  const { classes, cx } = useStyles();
  const [opened, handler] = useDisclosure(false);
  const [loading, load] = useDisclosure(false);

  const date = new Date(blog.created_at);

  const handleClick = async () => {
    load.open();
    try {
      const res = await fetch("/api/create-blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id })
      });
      if (res.ok) {
        onDelete(blog.id);
        handler.close();
      } else {
        throw new Error("An error ocurred");
      }
    } catch (error) {
      alert("An error ocurred");
    } finally {
      load.close();
    }
  };

  return (
    <>
      <Modal title="Caution" opened={opened} onClose={handler.close}>
        <Card style={{ position: "relative" }}>
          <LoadingOverlay visible={loading} />
          <Text mb={"md"}>Are you sure you want to delete? This action is irreversible</Text>
          <Group>
            <Button onClick={handler.close}>Keep project</Button>
            <Button variant="light" onClick={handleClick} color={"red"}>
              Delete project
            </Button>
          </Group>
        </Card>
      </Modal>

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
            onClick={handler.open}
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
          <Text component="time">{formatDate(date)}</Text>
        </Group>
      </Card>
    </>
  );
}
