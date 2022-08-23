import { Comment } from "./Comment";
import { CreateComment } from "./CreateComment";
import { useStyles } from "./styles";
import { Avatar, Group, Stack } from "@mantine/core";
import { useUser as useAuth } from "@supabase/auth-helpers-react";
import { CommentsJoin } from "@interfaces/supabase";
import { useUser } from "@hooks/useUser";
import { CommentsLoading } from "./CommentsLoading";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

interface PropTypes {
  comments: CommentsJoin[];
  blogID: number;
}

const fetcher = async (...args: string[]) => {
  const [, id] = args;
  const { data } = await supabaseClient.from<CommentsJoin>("comments").select("*, profiles(*)").eq("blog_id", id);
  return data;
};

export default function CommentsList({ comments: commentsData, blogID }: PropTypes) {
  const { classes } = useStyles();
  const { user: auth } = useAuth();
  const { user } = useUser(auth?.id || null);
  const { data: comments, mutate } = useSWR(["comments", `${blogID}`], fetcher, {
    fallbackData: commentsData,
    revalidateOnFocus: false
  });
  if (!comments) return <CommentsLoading />;
  return (
    <>
      <section className={"section-container"}>
        <div className={classes.container}>
          <p>{comments.length} Comments</p>
          {auth?.id && (
            <Group mt={"xl"} align={"flex-start"}>
              <Avatar imageProps={{ loading: "lazy" }} src={user?.avatar_url} alt={""} radius={"xl"} />
              <CreateComment mutate={mutate} blogID={blogID} />
            </Group>
          )}
          <Stack mt={"xl"} spacing={"lg"}>
            {comments.map((commentInfo) => {
              const { profiles, ...comment } = commentInfo;
              const deletePerms = user?.id === profiles.id;
              return (
                <Comment mutate={mutate} deletePerms={deletePerms} key={comment.id} comment={comment} user={profiles} />
              );
            })}
          </Stack>
        </div>
      </section>
    </>
  );
}
