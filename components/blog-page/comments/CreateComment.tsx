import { Textarea, Stack, Button } from "@mantine/core";
import { useStyles } from "./styles";
import { FormEvent, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { KeyedMutator } from "swr";
import { CommentsJoin } from "@interfaces/supabase";

interface PropTypes {
  blogID: number;
  mutate: KeyedMutator<CommentsJoin[]>;
}

export function CreateComment({ blogID, mutate }: PropTypes) {
  const { classes, cx } = useStyles();
  const [comment, setComment] = useState("");
  const [loading, loadHandler] = useDisclosure(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!comment) {
      setError("You cannot leave this field empty");
      return;
    }

    loadHandler.open();
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, id: blogID })
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      } else {
        mutate();
        setComment("");
      }
    } catch (error) {
      showNotification({ message: error.message, title: "An error ocurred", color: "red" });
    } finally {
      loadHandler.close();
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
          placeholder="Add comment"
          minRows={1}
          autosize
          maxRows={4}
          className={cx(classes.textArea)}
        />
        <Button onClick={handleClick}>Submit</Button>
      </Stack>
    </>
  );
}
