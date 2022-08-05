import Link from "next/link";
import { Anchor, Avatar, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { Blog as BlogProps } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));
interface PropTypes {
  blog: BlogProps;
}

export function Blog({ blog }: PropTypes) {
  const { classes } = useStyles();
  const { user, userLoading } = useUser(blog.author_id);
  const date = new Date(blog.created_at);
  return (
    <Suspense fallback={null}>
      <Card className={classes.card}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image
            src={"/phili.webp"}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy" }}
            alt={"Philipsburg"}
          />
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
          <ProfileModal user={user}>
            <Group mt={"md"}>
              <Avatar
                imageProps={{ loading: "lazy" }}
                src={"bluepnwage.jpg"}
                radius={"xl"}
                size={"md"}
                alt={"Profile picture for author"}
              />
              <Stack spacing={0}>
                <Text size="sm" component="strong">
                  {user?.first_name}
                </Text>
                <Text size="sm" component="span" className={classes.dimmedText}>
                  {user?.occupation}
                </Text>
              </Stack>
            </Group>
          </ProfileModal>
        </Suspense>
      </Card>
    </Suspense>
  );
}
