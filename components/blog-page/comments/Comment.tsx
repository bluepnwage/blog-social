import { Comment as CommentProps, CommentsJoin, User } from "@interfaces/supabase";
import { Avatar, Group, Text, Divider, Stack, ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useStyles } from "./styles";
import { formatDate } from "@util/formatDate";
import { KeyedMutator } from "swr";

interface PropTypes {
  comment: CommentProps;
  user: User;
  deletePerms: boolean;
  mutate: KeyedMutator<CommentsJoin[]>;
}

export function Comment({ comment, user, deletePerms, mutate }: PropTypes) {
  const { classes } = useStyles();
  const date = new Date(comment.created_at);

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
      <Group>
        <Avatar src={user.avatar_url} imageProps={{ loading: "lazy" }} alt={"user profile picture"} radius={"xl"} />
        <Group className={classes.flexGrow} position="apart">
          <Stack spacing={0}>
            <Text component="strong">
              {user.first_name} {user.last_name} —{" "}
              <Text weight={400} className={classes.dimmedText} component="time">
                {formatDate(date)}
              </Text>
            </Text>
            <Text component="p">{comment.content}</Text>
          </Stack>
          {deletePerms && (
            <ActionIcon onClick={handleClick} color={"red"}>
              <Trash />
            </ActionIcon>
          )}
        </Group>
      </Group>
      <Divider />
    </>
  );
}
