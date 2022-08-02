import Link from "next/link";
import { Card, Text, ActionIcon, Group, Stack, Button, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash, X, Check } from "tabler-icons-react";
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
  const [published, publish] = useDisclosure(blog.published);

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

  const toggleBlog = async () => {
    try {
      const res = await fetch("/api/publish-blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, published: published ? false : true })
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        publish.toggle();
        showNotification({ message: json.message, color: "green", title: "Success" });
        load.close();
      } else {
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
      showNotification({ message: error.message, color: "red", title: "Error" });
    }
  };

  const status = published ? "Published" : "Unpublished";
  const color = published ? "green" : "orange";

  return (
    <>
      <DeleteBlogModal loading={loading} onClose={handler.close} onDelete={deleteBlog} opened={opened} />
      <Card className={cx(classes.blogCard, classes.flex)}>
        <Stack spacing={0}>
          <Group position="apart">
            <Text component="strong">{blog.title}</Text>
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
          <Badge mt={"xs"} style={{ width: "fit-content" }} color={color}>
            {status}
          </Badge>
        </Stack>
        <Group position="center">
          <Link href={`/dashboard/bluepnwage/editor/${blog.id}`} passHref>
            <Button size="lg" radius={"xl"} variant={"light"} component="a">
              Edit blog
            </Button>
          </Link>
        </Group>
        <Group position="apart">
          <Button onClick={toggleBlog} size="sm" variant="light" color={published ? "orange" : "green"}>
            {published ? "Unpublish" : "Publish"}
          </Button>
          <Text component="time">{formatDate(date)}</Text>
        </Group>
      </Card>
    </>
  );
}
