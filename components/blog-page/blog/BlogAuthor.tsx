import { ActionIcon, Avatar, Group, Stack, Text } from "@mantine/core";
import { BrandFacebook, BrandTwitter, HeartPlus, Share } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Suspense, lazy } from "react";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

export function BlogAuthor() {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Group className={classes.authorContainer} mb={40} mt={"xl"}>
          <Suspense fallback={null}>
            <ProfileModal>
              <Group className={classes.authorWrapper}>
                <Avatar
                  imageProps={{ loading: "lazy" }}
                  alt={"User profile"}
                  src={"/bluepnwage.jpg"}
                  size={"lg"}
                  radius={"xl"}
                />
                <Stack spacing={0}>
                  <Text component="strong">Agis Carty</Text>
                  <Text component="span" className={classes.dimmedText}>
                    <Text component="time">Jul 21, 2022</Text> — 2 min read
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
