import { Comment, User } from "@interfaces/supabase";
import { ActionIcon, Avatar, Group, Stack, Text } from "@mantine/core";
import { formatDate } from "@util/formatDate";
import { ReactNode } from "react";
import { Trash } from "tabler-icons-react";
import { useStyles } from "./styles";

interface PropTypes {
  children: ReactNode;
  comment: Comment;
  user: User;
  deletePerms: boolean;
  onDelete: (id: number) => Promise<void>;
}

export function Reply({ children, comment, user, deletePerms, onDelete }: PropTypes) {
  const { classes } = useStyles();
  const date = new Date(comment.created_at);

  const handleClick = async () => {
    await onDelete(comment.id);
  };

  return (
    <>
      <Group align="flex-start">
        <Avatar src={user.avatar_url} imageProps={{ loading: "lazy" }} alt={"user profile picture"} radius={"xl"} />
        <Group className={classes.flexGrow} align="flex-start" position="apart">
          <Stack spacing={0}>
            <Text component="strong">
              {user.first_name} {user.last_name} —{" "}
              <Text weight={400} className={classes.dimmedText} component="time">
                {formatDate(date)}
              </Text>
            </Text>
            <Text mb={"xs"} component="p">
              {comment.content}
            </Text>
          </Stack>
          {deletePerms && (
            <ActionIcon onClick={handleClick} aria-label="Delete comment" color={"red"}>
              <Trash />
            </ActionIcon>
          )}
        </Group>
      </Group>
      {children}
    </>
  );
}
