import Link from "next/link";
import { Anchor, Avatar, Card, Group, Image, Stack, Text, Title, Skeleton } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  blog: Blog;
}

export function LatestBlog({ blog }: PropTypes) {
  const { user, userLoading } = useUser(blog.author_id);
  const { classes, cx } = useStyles();

  const date = new Date(blog.created_at);
  return (
    <Suspense fallback={null}>
      <Card className={cx(classes.card, classes.flexColumn)}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image
            src={blog.thumbnail}
            width={"100%"}
            height={200}
            withPlaceholder
            imageProps={{ loading: "lazy" }}
            alt={"Philipsburg"}
          />
        </Card.Section>
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
            <ProfileModal user={!userLoading && user}>
              <Group mt={"md"}>
                <Skeleton visible={userLoading} width={"fit-content"} radius={"xl"}>
                  <Avatar
                    imageProps={{ loading: "lazy" }}
                    src={user?.avatar_url || ""}
                    radius={"xl"}
                    size={"md"}
                    alt={"Profile picture for author"}
                  />
                </Skeleton>
                <Stack spacing={0}>
                  {!userLoading && (
                    <>
                      <Text size="sm" component="strong">
                        {user?.first_name} {user?.last_name}
                      </Text>

                      <Text size="sm" component="span" className={classes.dimmedText}>
                        {user?.occupation}
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
      </Card>
    </Suspense>
  );
}
