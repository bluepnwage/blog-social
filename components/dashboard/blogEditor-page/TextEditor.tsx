import RichTextEditor from "@mantine/rte";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Check } from "tabler-icons-react";
import { Group, Text, Loader, Button } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
  id: number;
  published: boolean;
  isEdited: boolean;
}

export function TextEditor({ content, onChange, id, published, isEdited }: PropTypes) {
  const [autosave, setSaving] = useState({ loading: false, success: false });
  const [loading, setLoading] = useState(false);
  const [firstMount, setFirstMount] = useState(true);
  const [debounced] = useDebouncedValue(content, 2000);
  const { classes, cx } = useStyles();

  useEffect(() => {
    setFirstMount(false);
  }, []);

  useEffect(() => {
    if (!firstMount) {
      handleAutosave();
    }
  }, [debounced]);

  const handleAutosave = async () => {
    setSaving((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/autosave", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content })
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      } else {
        setSaving((prev) => ({ ...prev, success: true }));
        setTimeout(() => {
          setSaving((prev) => ({ ...prev, success: false }));
        }, 3000);
      }
    } catch (error) {
      showNotification({ title: "Autosave failed", color: "red", message: error.message });
    } finally {
      setSaving((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        const json = await res.json();
        showNotification({ message: json.message, title: "Success", color: "green" });
      } else {
        throw new Error("Failed to save blog, please try again");
      }
    } catch (error) {
      showNotification({ color: "red", message: error.message, title: "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RichTextEditor stickyOffset={70} value={content} onChange={onChange} />
      <div className={cx(classes.loader, classes.flex)}>
        {autosave.loading && <Loader />}
        {autosave.success && (
          <Group spacing={5}>
            <Text>Blog saved</Text>
            <Check className={classes.successIcon} />
          </Group>
        )}
      </div>
      {published && isEdited && (
        <Button loading={loading} color={"green"} onClick={handleClick} mt={"md"}>
          Publish changes
        </Button>
      )}
    </>
  );
}