import { Reply } from "./Reply";
import { Divider, Stack, Group, Avatar } from "@mantine/core";
import { CreateReply } from "./CreateReply";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { CommentsJoin } from "@interfaces/supabase";
import { useUser } from "@hooks/useUser";
import { showNotification } from "@mantine/notifications";
import useSWR, { KeyedMutator } from "swr";

interface PropTypes {
  replyIDs: number[];
  commentID: number;
  canReply: boolean | string;
  blogID: number;
  mutateComment: KeyedMutator<CommentsJoin[]>;
}

const fetcher = async (...args: string[]) => {
  const [, ids] = args;
  const idArray = ids.split(",");
  if (idArray.length === 0 || idArray[0] === "") return [];
  const replies = idArray.map(async (id) => {
    const { data } = await supabaseClient.from<CommentsJoin>("comments").select("*, profiles(*)").eq("id", id).single();
    return data;
  });
  return await Promise.all(replies);
};

export default function RepliesList({ replyIDs, commentID, canReply, blogID, mutateComment }: PropTypes) {
  const { data: replies, mutate } = useSWR(["replies", `${replyIDs.join()}`], fetcher, {
    suspense: true,
    revalidateOnFocus: false
  });
  const { user } = useUser(typeof canReply === "string" ? canReply : null, { suspense: true });

  const deleteReply = async (replyID: number) => {
    try {
      const res = await fetch("/api/reply", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyID, commentID })
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      } else {
        mutateComment();
      }
    } catch (error) {
      showNotification({ message: error.message, title: "An error ocurred", color: "red" });
    }
  };

  return (
    <Stack spacing={"xl"}>
      {canReply && (
        <Group align="flex-start">
          <Avatar src={user.avatar_url} imageProps={{ loading: "lazy" }} alt={"User profile picture"} radius={"xl"} />
          <CreateReply mutateComment={mutateComment} blogID={blogID} commentID={commentID} mutate={mutate} />
        </Group>
      )}

      {replies.map((reply, key) => {
        const { profiles, ...comment } = reply;
        const notLast = key !== replies.length - 1;
        return (
          <Reply
            onDelete={deleteReply}
            deletePerms={user ? user.id === profiles.id : false}
            key={comment.id}
            comment={comment}
            user={profiles}
          >
            {notLast && <Divider />}
          </Reply>
        );
      })}
    </Stack>
  );
}
