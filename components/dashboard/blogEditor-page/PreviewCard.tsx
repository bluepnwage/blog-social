import Link from "next/link";
import { Card, Text, Title, Anchor, Image, Group, Avatar, Stack } from "@mantine/core";
import { useStyles } from "./styles";
import { formatDate } from "@util/formatDate";
import { User } from "@interfaces/supabase";

interface PropTypes {
  heading: string;
  description: string;
  image: string;
  created_at: string;
  user: User;
}

export function PreviewCard({ description, heading, image, created_at, user }: PropTypes) {
  const { classes } = useStyles();
  const date = new Date(created_at);
  const infoFilled = user.first_name && user.last_name ? true : false;
  return (
    <>
      <Card className={classes.card}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image
            src={image}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy", onLoad: () => URL.revokeObjectURL(image) }}
            alt={""}
          />
        </Card.Section>
        <Text component="time" weight={400} color={"dimmed"}>
          {formatDate(date)}
        </Text>
        <Title mb={"md"} order={3}>
          {heading}
        </Title>
        <Text mb={"md"} component="p">
          {description}
        </Text>
        <Anchor>Read article</Anchor>
        <Group mt={"md"}>
          <Avatar
            imageProps={{ loading: "lazy" }}
            src={user.avatar_url}
            radius={"xl"}
            size={"md"}
            alt={"Profile picture for author"}
          />
          {infoFilled && (
            <Stack spacing={0}>
              <Text size="sm" component="strong">
                {user.first_name} {user.last_name}
              </Text>
              <Text size="sm" component="span" color={"dimmed"}>
                {user.occupation}
              </Text>
            </Stack>
          )}
          {!infoFilled && (
            <>
              <Text component="p">
                Fill out your{" "}
                <Link href={"/dashboard/profile"} passHref>
                  <Anchor>profile</Anchor>
                </Link>{" "}
                so your name can be displayed here
              </Text>
            </>
          )}
        </Group>
      </Card>
    </>
  );
}
