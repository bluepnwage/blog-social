import { ActionIcon, Avatar, Group, Stack, Text, CopyButton, Tooltip } from "@mantine/core";
import { BrandTwitter, HeartPlus, Share, Check, Heart } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Suspense, lazy, useState, useEffect } from "react";
import { Blog, User } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";
import { useUser } from "@hooks/useUser";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser as useAuth } from "@supabase/auth-helpers-react";
import { mutate } from "swr";

const ProfileModal = lazy(() => import("@components/modal/ProfileModal"));

interface PropTypes {
  user: User;
  uploadDate: string;
  blogID: number;
  slug: string;
  readTime: number;
}

export function BlogAuthor({ user: userData, uploadDate, blogID, slug, readTime }: PropTypes) {
  const { user: author } = useUser(userData.id, { fallbackData: userData });
  const { user: auth, isLoading } = useAuth();
  const { user, userLoading } = useUser(!isLoading && auth ? auth?.id : null);
  const { classes } = useStyles();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (userLoading || !auth) return;
    if (!Array.isArray(user.likes)) return;
    for (const id of user.likes) {
      if (id === blogID && !liked) {
        setLiked(true);
        break;
      }
    }
  }, [isLoading, blogID]);

  const date = new Date(uploadDate);

  const likeBlog = async () => {
    const [{ data: user }, { data: blog }] = await Promise.all([
      await supabaseClient.from<User>("profiles").select("likes").single(),
      await supabaseClient.from<Blog>("blogs").select("likes").eq("id", blogID).single()
    ]);

    const prevLikes = user.likes ? user.likes : [];

    await Promise.all([
      await supabaseClient
        .from<User>("profiles")
        .update({ likes: [...prevLikes, blogID] }, { returning: "minimal" })
        .eq("id", auth?.id),
      await supabaseClient
        .from<Blog>("blogs")
        .update({ likes: blog.likes + 1 })
        .eq("id", blogID)
    ]);
    setLiked(true);
    mutate(slug);
  };

  const unlikeBlog = async () => {
    const [{ data: user }, { data: blog }] = await Promise.all([
      await supabaseClient.from<User>("profiles").select("likes").single(),
      await supabaseClient.from<Blog>("blogs").select("likes").eq("id", blogID).single()
    ]);

    const filteredLikes = user.likes ? user.likes.filter((id) => id != blogID) : [];

    const [, { error }] = await Promise.all([
      await supabaseClient.from<User>("profiles").update({ likes: filteredLikes }).eq("id", auth?.id),
      await supabaseClient
        .from<Blog>("blogs")
        .update({ likes: blog.likes - 1 })
        .eq("id", blogID)
    ]);
    if (error) alert(error.message);
    setLiked(false);
    mutate(slug);
  };

  const toggleLike = async () => {
    if (!auth) return;
    liked ? await unlikeBlog() : await likeBlog();
  };

  return (
    <>
      <div className={classes.container}>
        <Group className={classes.authorContainer} mb={40} mt={"xl"}>
          <Suspense fallback={null}>
            <ProfileModal user={author}>
              <Group className={classes.authorWrapper}>
                <Avatar
                  imageProps={{ loading: "lazy" }}
                  alt={"User profile"}
                  src={author.avatar_url}
                  size={"lg"}
                  radius={"xl"}
                />
                <Stack spacing={0}>
                  <Text component="strong">
                    {author.first_name} {author.last_name}
                  </Text>
                  <Text component="span" className={classes.dimmedText}>
                    <Text component="time">{formatDate(date)}</Text> — {readTime} min read
                  </Text>
                </Stack>
              </Group>
            </ProfileModal>
          </Suspense>
          <Group>
            <Tooltip label="Share on Twitter" withArrow>
              <ActionIcon
                target={"_blank"}
                component="a"
                href={typeof window !== "undefined" ? `https://twitter.com/intent/tweet?url=${location.href}` : ""}
                aria-label="Share on twitter"
              >
                <BrandTwitter />
              </ActionIcon>
            </Tooltip>
            <CopyButton timeout={2000} value={typeof window !== "undefined" ? location.href : ""}>
              {({ copied, copy }) => {
                return (
                  <Tooltip label={copied ? "Copied" : "Copy link"} withArrow>
                    <ActionIcon aria-label="Copy link" color={copied ? "green" : "gray"} onClick={copy}>
                      {!copied ? <Share /> : <Check />}
                    </ActionIcon>
                  </Tooltip>
                );
              }}
            </CopyButton>
            <Tooltip withArrow label={liked ? "Unlike blog" : "Like blog"}>
              <ActionIcon onClick={toggleLike} aria-label={liked ? "Unlike blog" : "Like blog"} color={"red"}>
                {liked ? <Heart className={classes.likedHeart} /> : <HeartPlus />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </div>
    </>
  );
}
