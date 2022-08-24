import { Textarea, Stack, Button } from "@mantine/core";
import { useStyles } from "./styles";
import { FormEvent, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { KeyedMutator } from "swr";
import { CommentsJoin } from "@interfaces/supabase";

interface PropTypes {
  commentID?: number;
  mutate?: KeyedMutator<CommentsJoin[]>;
  blogID: number;
  mutateComment: KeyedMutator<CommentsJoin[]>;
}

export function CreateReply({ commentID, mutate, blogID, mutateComment }: PropTypes) {
  const { classes, cx } = useStyles();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!comment) {
      setError("You cannot leave this field empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, commentID, blogID })
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      } else {
        mutate();
        mutateComment();
        setComment("");
      }
    } catch (error) {
      showNotification({ message: error.message, title: "An error ocurred", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
    if (error) setError("");
    setComment(currentTarget.value);
  };

  return (
    <>
      <Stack className={cx(classes.textAreaContainer, classes.flexGrow)}>
        <Textarea
          error={error}
          value={comment}
          onChange={handleChange}
          placeholder="Add Reply"
          minRows={1}
          autosize
          maxRows={4}
          className={cx(classes.textArea)}
        />
        <Button loading={loading} onClick={handleClick}>
          Submit
        </Button>
      </Stack>
    </>
  );
}
