import Link from "next/link";
import { Card, Text, ActionIcon, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash, FilePencil, X, Check } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Blog } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { DeleteBlogModal } from "./DeleteBlogModal";
import { showNotification } from "@mantine/notifications";

interface PropTypes {
  blog: Blog;
  onDelete: (id: number) => void;
}

export function BlogCard({ blog, onDelete }: PropTypes) {
  const { classes, cx } = useStyles();
  const [opened, handler] = useDisclosure(false);
  const [loading, load] = useDisclosure(false);

  const date = new Date(blog.created_at);

  const deleteBlog = async () => {
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
        showNotification({
          message: "Blog was successfully deleted",
          title: "Success",
          color: "green",
          icon: <Check />,
          autoClose: 3000
        });
      } else {
        throw new Error("An error ocurred");
      }
    } catch (error) {
      showNotification({ message: error.message, title: "Failed to delete blog", icon: <X />, color: "red" });
    } finally {
      load.close();
    }
  };

  return (
    <>
      <DeleteBlogModal loading={loading} onClose={handler.close} onDelete={deleteBlog} opened={opened} />
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
