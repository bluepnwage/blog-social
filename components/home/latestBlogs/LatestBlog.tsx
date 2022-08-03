import Link from "next/link";
import { Anchor, Avatar, Card, Group, Image, Stack, Text, Title, Skeleton } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "hooks/useUser";
import { useThumbnail } from "hooks/useThumbnail";
import { useAvatar } from "hooks/useAvatar";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  blog: Blog;
}

export function LatestBlog({ blog }: PropTypes) {
  const { thumbnail, isLoading: loading } = useThumbnail(blog.thumbnail ? [blog.id, blog.thumbnail] : null);
  const { user, userLoading } = useUser(blog.author_id);
  const { avatar, avatarLoading } = useAvatar(!userLoading ? [user.avatar_url, user.avatar_url] : null);
  const { classes } = useStyles();

  const date = new Date(blog.created_at);
  return (
    <Suspense fallback={null}>
      <Card className={classes.card}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Skeleton visible={loading} width={"100%"} height={"100%"}>
            <Image
              src={thumbnail || ""}
              width={"100%"}
              height={"100%"}
              withPlaceholder
              imageProps={{ loading: "lazy" }}
              alt={"Philipsburg"}
            />
          </Skeleton>
        </Card.Section>
        <Text component="time" weight={400} className={classes.dimmedText}>
          {formatDate(date)}
        </Text>
        <Title mb={"md"} order={3}>
          {blog.heading}
        </Title>
        <Text mb={"md"} component="p">
          {blog.description}
        </Text>
        <Link passHref href={`/blogs/${blog.slug}`}>
          <Anchor>Read article</Anchor>
        </Link>
        <Suspense fallback={null}>
          <ProfileModal avatar={!avatarLoading && avatar} user={!userLoading && user}>
            <Group mt={"md"}>
              <Skeleton visible={avatarLoading} width={"fit-content"} radius={"xl"}>
                <Avatar
                  imageProps={{ loading: "lazy" }}
                  src={avatar || ""}
                  radius={"xl"}
                  size={"md"}
                  alt={"Profile picture for author"}
                />
              </Skeleton>
              <Stack spacing={0}>
                {!userLoading && (
                  <>
                    <Text size="sm" component="strong">
                      {user.first_name} {user.last_name}
                    </Text>

                    <Text size="sm" component="span" className={classes.dimmedText}>
                      {user.occupation}
                    </Text>
                  </>
                )}

                {userLoading && (
                  <>
                    <Skeleton height={8} mb={"md"} width={75} />
                    <Skeleton height={8} width={100} />
                  </>
                )}
              </Stack>
            </Group>
          </ProfileModal>
        </Suspense>
      </Card>
    </Suspense>
  );
}
