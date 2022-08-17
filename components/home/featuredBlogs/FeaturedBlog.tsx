import Link from "next/link";
import colors from "@util/hashmap";
import { Anchor, Avatar, Group, Image, Stack, Text, Title, Skeleton, Badge } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog, User } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";
import ProfileModal from "@components/modal/ProfileModal";

interface PropTypes {
  blog: Blog;
  user: User;
  onClose: () => void;
}

export function FeaturedBlog({ blog, user: userData, onClose }: PropTypes) {
  const { user, userLoading } = useUser(blog.author_id, { fallbackData: userData });
  const { classes, cx } = useStyles();

  const topic = blog.topic.slice(0, 1).toUpperCase() + blog.topic.slice(1);
  const date = new Date(blog.created_at);
  return (
    <div className={cx("container", classes.blogContainer)}>
      <figure className={classes.imageContainer}>
        <Image
          src={blog.thumbnail}
          height={"100%"}
          width={"100%"}
          imageProps={{ loading: "lazy" }}
          alt={"Philipsburg"}
        />
      </figure>
      <div className={classes.descriptionContainer}>
        <div>
          <Badge color={colors.retrieve(blog.topic)}>{topic}</Badge>
        </div>
        <Text weight={400} className={classes.dimmedText} component={"time"}>
          {formatDate(date)}
        </Text>
        <Title mb={"md"} order={3}>
          {blog.heading}
        </Title>
        <article>
          <Text mb={"md"} component="p">
            {blog.description}
          </Text>
        </article>
        <Link passHref href={`/blogs/${blog.id}`}>
          <Anchor>Read article</Anchor>
        </Link>
        <ProfileModal user={user} onClose={onClose}>
          <Group mt={"md"}>
            <Skeleton radius={"xl"} width={"fit-content"} visible={userLoading}>
              <Avatar
                imageProps={{ loading: "lazy" }}
                src={user.avatar_url}
                radius={"xl"}
                size={"lg"}
                alt={"Profile picture for author"}
              />
            </Skeleton>
            <Stack spacing={5}>
              <Text size="sm" component="strong">
                {user.first_name} {user.last_name}
              </Text>
              <Text size="sm" component="span" className={classes.dimmedText}>
                {user.occupation}
              </Text>
            </Stack>
          </Group>
        </ProfileModal>
      </div>
    </div>
  );
}
