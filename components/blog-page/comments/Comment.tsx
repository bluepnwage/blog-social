import { Comment as CommentProps, CommentsJoin, User } from "@interfaces/supabase";
import { Avatar, Group, Text, Divider, Stack, ActionIcon, Button } from "@mantine/core";
import { Trash, ChevronDown, ChevronUp } from "tabler-icons-react";
import { useStyles } from "./styles";
import { formatDate } from "@util/formatDate";
import { KeyedMutator } from "swr";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Suspense, lazy } from "react";

const Replies = lazy(() => import("./RepliesList"));

interface PropTypes {
  comment: CommentProps;
  user: User;
  deletePerms: boolean;
  mutate: KeyedMutator<CommentsJoin[]>;
  canReply: boolean | string;
  blogID: number;
}

export function Comment({ comment, user, deletePerms, mutate, canReply, blogID }: PropTypes) {
  const [showReplies, repliesHandler] = useDisclosure(false);
  const { classes } = useStyles();

  const date = new Date(comment.created_at);
  const chevron = showReplies ? <ChevronUp /> : <ChevronDown />;

  const handleClick = async () => {
    try {
      const res = await fetch("/api/comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: comment.id })
      });
      if (res.ok) {
        mutate();
      }
    } catch (error) {}
  };

  return (
    <>
      <Group align="flex-start">
        <Avatar src={user.avatar_url} imageProps={{ loading: "lazy" }} alt={"user profile picture"} radius={"xl"} />
        <Group className={classes.flexGrow} align="flex-start" position="apart">
          <Stack spacing={0} className={classes.flexGrow}>
            <Text component="strong">
              {user.first_name} {user.last_name} —{" "}
              <Text weight={400} className={classes.dimmedText} component="time">
                {formatDate(date)}
              </Text>
            </Text>
            <Text mb={"xs"} component="p">
              {comment.content}
            </Text>

            <Button
              style={{ width: "fit-content" }}
              mb={"xs"}
              onClick={repliesHandler.toggle}
              leftIcon={chevron}
              variant="subtle"
            >
              Show replies
            </Button>

            <Suspense fallback={<p>Loading...</p>}>
              {showReplies && (
                <Replies
                  mutateComment={mutate}
                  blogID={blogID}
                  canReply={canReply}
                  commentID={comment.id}
                  replyIDs={comment.replies.length === 0 ? [] : comment.replies}
                />
              )}
            </Suspense>
          </Stack>
          {deletePerms && (
            <ActionIcon aria-label="Delete comment" onClick={handleClick} color={"red"}>
              <Trash />
            </ActionIcon>
          )}
        </Group>
      </Group>
      <Divider />
    </>
  );
}
