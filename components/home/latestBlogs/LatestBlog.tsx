import Link from "next/link";
import colors from "@util/hashmap";
import { Anchor, Avatar, Card, Group, Image, Stack, Text, Title, Skeleton, Badge } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog, User } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  blog: Blog;
  user: User;
}

export function LatestBlog({ blog, user: userData }: PropTypes) {
  const { user, userLoading } = useUser(blog.author_id, { fallbackData: userData });
  const { classes, cx } = useStyles();

  const topic = blog.topic.slice(0, 1).toUpperCase() + blog.topic.slice(1);
  const date = new Date(blog.created_at);
  return (
    <Suspense fallback={null}>
      <Card className={cx(classes.card, classes.flexColumn)}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Link href={`/blogs/${blog.id}`}>
            <a>
              <Image src={blog.thumbnail} width={"100%"} height={"100%"} imageProps={{ loading: "lazy" }} alt={""} />
            </a>
          </Link>
        </Card.Section>
        <div className={cx(classes.badgeContainer)}>
          <Badge color={colors.get(blog.topic) || "dark"}>{topic}</Badge>
          <Text component="time" weight={400} className={classes.dimmedText}>
            {formatDate(date)}
          </Text>
        </div>
        <div className={cx(classes.flexColumn, classes.descriptionContainer)}>
          <Link href={`/blogs/${blog.id}`}>
            <a style={{ width: "fit-content", height: "fit-content" }}>
              <Title className={classes.title} order={3}>
                {blog.heading}
              </Title>
            </a>
          </Link>

          <Suspense fallback={null}>
            <ProfileModal user={user}>
              <Group mt={"md"}>
                <Skeleton visible={userLoading} width={"fit-content"} radius={"xl"}>
                  <Avatar
                    imageProps={{ loading: "lazy" }}
                    src={user.avatar_url || ""}
                    radius={"xl"}
                    size={"md"}
                    alt={"Profile picture for author"}
                  />
                </Skeleton>
                <Stack spacing={0}>
                  <Text size="sm" component="strong">
                    {user.first_name} {user.last_name}
                  </Text>

                  <Text size="sm" component="span" className={classes.dimmedText}>
                    {user.occupation}
                  </Text>
                </Stack>
              </Group>
            </ProfileModal>
          </Suspense>
        </div>
      </Card>
    </Suspense>
  );
}
