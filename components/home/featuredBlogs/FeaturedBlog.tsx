import Link from "next/link";
import { Anchor, Avatar, Group, Image, Stack, Text, Title, Skeleton } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useThumbnail } from "hooks/useThumbnail";
import { useUser } from "hooks/useUser";
import { useAvatar } from "hooks/useAvatar";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  blog: Blog;
}

export function FeaturedBlog({ blog }: PropTypes) {
  const { thumbnail, isLoading } = useThumbnail(blog.thumbnail ? [blog.id, blog.thumbnail] : null);
  const { user, userLoading } = useUser(blog.author_id);
  const { avatar, avatarLoading } = useAvatar(!userLoading ? [user.avatar_url, user.avatar_url] : null);
  const { classes, cx } = useStyles();

  const date = new Date(blog.created_at);
  return (
    <>
      <div className={cx("container", classes.blogContainer)}>
        <figure className={classes.imageContainer}>
          <Skeleton visible={isLoading} width={"100%"} height={"100%"}>
            <Image
              src={thumbnail ? thumbnail : ""}
              height={"100%"}
              width={"100%"}
              imageProps={{ loading: "lazy" }}
              alt={"Philipsburg"}
            />
          </Skeleton>
        </figure>
        <div className={classes.descriptionContainer}>
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
          <Link passHref href={`/blogs/${blog.slug}`}>
            <Anchor>Read article</Anchor>
          </Link>
          <Suspense fallback={null}>
            <ProfileModal avatar={!avatarLoading && avatar} user={!userLoading && user}>
              <Group mt={"md"}>
                <Skeleton radius={"xl"} width={"fit-content"} visible={avatarLoading}>
                  <Avatar
                    imageProps={{ loading: "lazy" }}
                    src={avatar || ""}
                    radius={"xl"}
                    size={"lg"}
                    alt={"Profile picture for author"}
                  />
                </Skeleton>
                <Stack spacing={5}>
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
        </div>
      </div>
    </>
  );
}
