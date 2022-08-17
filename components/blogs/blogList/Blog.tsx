import Link from "next/link";
import { Anchor, Avatar, Badge, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog as BlogProps, User } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";
import colors from "@util/hashmap";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));
interface PropTypes {
  blog: BlogProps;
  user: User;
}

export function Blog({ blog, user: userData }: PropTypes) {
  const { user } = useUser(blog.author_id, { fallbackData: userData });
  const { classes, cx } = useStyles();

  const topic = blog.topic.slice(0, 1).toUpperCase() + blog.topic.slice(1);
  const date = new Date(blog.created_at);
  return (
    <Suspense fallback={null}>
      <Card className={cx(classes.card, classes.flexColumn)}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image src={blog.thumbnail} width={"100%"} height={"100%"} imageProps={{ loading: "lazy" }} alt={""} />
        </Card.Section>
        <div className={classes.badgeContainer}>
          <Badge color={colors.retrieve(blog.topic)}>{topic}</Badge>
        </div>
        <div className={cx(classes.flexColumn, classes.descriptionContainer)}>
          <div>
            <Text component="time" weight={400} className={classes.dimmedText}>
              {formatDate(date)}
            </Text>
            <Title mb={"md"} order={3}>
              {blog.heading}
            </Title>
          </div>
          <Text mb={"md"} component="p">
            {blog.description}
          </Text>
          <Link passHref href={`/blogs/${blog.id}`}>
            <Anchor>Read article</Anchor>
          </Link>
          <Suspense fallback={null}>
            <ProfileModal user={user}>
              <Group mt={"md"}>
                <Avatar
                  imageProps={{ loading: "lazy" }}
                  src={user.avatar_url}
                  radius={"xl"}
                  size={"md"}
                  alt={"Profile picture for author"}
                />
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
