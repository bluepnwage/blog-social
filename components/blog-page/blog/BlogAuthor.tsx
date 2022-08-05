import { ActionIcon, Avatar, Group, Stack, Text } from "@mantine/core";
import { BrandFacebook, BrandTwitter, HeartPlus, Share } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";
import { User } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  user: User;
  uploadDate: string;
}

export function BlogAuthor({ user: userData, uploadDate }: PropTypes) {
  const { user } = useUser(userData.id, { fallbackData: userData });
  const { classes } = useStyles();

  const date = new Date(uploadDate);
  return (
    <>
      <div className={classes.container}>
        <Group className={classes.authorContainer} mb={40} mt={"xl"}>
          <Suspense fallback={null}>
            <ProfileModal user={user}>
              <Group className={classes.authorWrapper}>
                <Avatar
                  imageProps={{ loading: "lazy" }}
                  alt={"User profile"}
                  src={user.avatar_url}
                  size={"lg"}
                  radius={"xl"}
                />
                <Stack spacing={0}>
                  <Text component="strong">
                    {user.first_name} {user.last_name}
                  </Text>
                  <Text component="span" className={classes.dimmedText}>
                    <Text component="time">{formatDate(date)}</Text> — 2 min read
                  </Text>
                </Stack>
              </Group>
            </ProfileModal>
          </Suspense>
          <Group>
            <ActionIcon title="Share on twitter">
              <BrandTwitter />
            </ActionIcon>
            <ActionIcon title="Share on facebook">
              <BrandFacebook />
            </ActionIcon>
            <ActionIcon title="Copy link">
              <Share />
            </ActionIcon>
            <ActionIcon title="Like this blog" color={"red"}>
              <HeartPlus />
            </ActionIcon>
          </Group>
        </Group>
      </div>
    </>
  );
}
